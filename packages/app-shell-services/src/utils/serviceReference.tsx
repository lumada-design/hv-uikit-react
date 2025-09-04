import { FC, PropsWithChildren } from "react";

import {
  ComponentBundleServiceProviderConfig,
  FactoryBundleServiceProviderConfig,
  InstanceBundleServiceProviderConfig,
  InstanceServiceProviderConfig,
  ServiceId,
  ServiceProviderConfig,
  ServiceProviderConfigBase,
} from "../types/config";
import {
  ServiceFactory,
  ServiceLoader,
  ServiceReference,
} from "../types/service";

/**
 * Utility type to extract the base service type from a provider config type.
 * Used for type inference in service management logic.
 */
type GetServiceBaseTypeFromConfigType<TConfig extends ServiceProviderConfig> =
  TConfig extends ComponentBundleServiceProviderConfig ? FC : never;

function createServiceReferenceBase<TService>(
  serviceId: ServiceId,
  serviceConfig: ServiceProviderConfigBase,
  getService: ServiceLoader<TService>,
): ServiceReference<TService> {
  return {
    serviceId,
    ranking: serviceConfig.ranking ?? 0,
    attributes: serviceConfig.attributes ?? {},
    getService,
  };
}

// Helper function to validate imported modules and extract the correct export
function validateImportedModule<TService>(
  imported: unknown,
  serviceId: ServiceId,
  bundlePath: string,
): TService {
  if (!imported) {
    throw new Error(
      `Bundle import failed for ${bundlePath} and service ${serviceId}`,
    );
  }

  if (typeof imported === "object" && "default" in imported) {
    const defaultExport = (imported as { default: unknown }).default;
    if (defaultExport) {
      return defaultExport as TService;
    }
  }

  // For direct function exports (React components, hooks)
  if (typeof imported === "function") {
    return imported as TService;
  }

  // Return the imported value as-is if we can't determine the structure
  return imported as TService;
}

function createInstanceReference<TService>(
  serviceId: ServiceId,
  config: InstanceServiceProviderConfig,
): ServiceReference<TService> {
  const serviceInstance: TService = config.instance as TService;

  const serviceLoader: ServiceLoader<TService> = () => {
    return Promise.resolve(serviceInstance);
  };

  return createServiceReferenceBase<TService>(serviceId, config, serviceLoader);
}

function createInstanceBundleReference<TService>(
  serviceId: ServiceId,
  config: InstanceBundleServiceProviderConfig,
): ServiceReference<TService> {
  const serviceLoader: ServiceLoader<TService> = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const imported = await import(/* @vite-ignore */ config.bundle);
    return validateImportedModule<TService>(imported, serviceId, config.bundle);
  };

  return createServiceReferenceBase<TService>(serviceId, config, serviceLoader);
}

function createFactoryBundleReference<TService>(
  serviceId: ServiceId,
  config: FactoryBundleServiceProviderConfig,
): ServiceReference<TService> {
  let loaded = false;
  let serviceInstance: TService | undefined;

  const serviceLoader: ServiceLoader<TService> = async () => {
    if (!loaded) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const imported = await import(/* @vite-ignore */ config.factory.bundle);
      const factory = validateImportedModule<ServiceFactory<TService>>(
        imported,
        serviceId,
        config.factory.bundle,
      );

      if (typeof factory !== "function") {
        throw new Error(
          `Factory bundle ${config.factory.bundle} did not export a function for service ${serviceId}`,
        );
      }

      serviceInstance = factory(config.factory.config);
      loaded = true;
    }

    return serviceInstance!;
  };

  return createServiceReferenceBase<TService>(serviceId, config, serviceLoader);
}

function createComponentBundleReference<TService extends FC>(
  serviceId: ServiceId,
  config: ComponentBundleServiceProviderConfig,
): ServiceReference<TService> {
  let loaded = false;
  let serviceInstance: TService | undefined;

  const serviceLoader: ServiceLoader<TService> = async () => {
    if (!loaded) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const imported = await import(/* @vite-ignore */ config.component.bundle);
      const Component = validateImportedModule<TService>(
        imported,
        serviceId,
        config.component.bundle,
      );

      if (typeof Component !== "function") {
        throw new Error(
          `Component bundle ${config.component.bundle} did not export a React component for service ${serviceId}`,
        );
      }

      // Bind the component with the provided props.
      serviceInstance = bindComponent(Component, config.component.props ?? {});
      loaded = true;
    }

    return serviceInstance!;
  };

  return createServiceReferenceBase<TService>(serviceId, config, serviceLoader);
}

/**
 * Create a ServiceReference for the given service identifier and provider configuration.
 *
 * Supported provider configuration shapes:
 * - instance: wraps and returns the provided instance (resolved Promise).
 * - bundle: dynamically imports the specified bundle and returns its default export
 *   (or the module itself) as the service instance.
 * - factory: dynamically imports a bundle that exports a factory function, calls it
 *   with the provided factory config, and returns the produced service instance.
 * - component: dynamically imports a React component bundle, binds the configured
 *   props and returns the bound component as the service.
 *
 * @template TService The concrete service type returned by the created reference.
 * @template TConfig  The ServiceProviderConfig subtype used to create the reference.
 *
 * @param {ServiceId} serviceId Identifier for the service being referenced.
 * @param {TConfig} serviceConfig Configuration that determines how the service is provided.
 *
 * @returns {ServiceReference<TService>} A service reference exposing metadata and a
 *                                      getService loader that resolves the service.
 *
 * @throws {Error} If the provided configuration shape is unsupported. Errors from
 *                 dynamic imports, missing exports, or invalid factory/component
 *                 shapes are propagated by the underlying provider implementations.
 */
export function createServiceReference<
  TService extends GetServiceBaseTypeFromConfigType<TConfig>,
  TConfig extends ServiceProviderConfig,
>(serviceId: ServiceId, serviceConfig: TConfig): ServiceReference<TService> {
  if ("instance" in serviceConfig) {
    return createInstanceReference<TService>(serviceId, serviceConfig);
  }

  if ("bundle" in serviceConfig) {
    return createInstanceBundleReference<TService>(serviceId, serviceConfig);
  }

  if ("factory" in serviceConfig) {
    return createFactoryBundleReference<TService>(serviceId, serviceConfig);
  }

  if ("component" in serviceConfig) {
    return createComponentBundleReference<
      TService extends FC ? TService : never
    >(serviceId, serviceConfig);
  }

  throw new Error(
    `Unsupported service provider configuration for service ${serviceId}`,
  );
}

function bindComponent<
  TComponent extends FC<PropsWithChildren>,
  P extends Record<string, unknown>,
>(Component: TComponent, configProps: P): TComponent {
  const BoundComponent = (props: PropsWithChildren) => {
    // @ts-expect-error TODO fix the types!
    return <Component {...props} {...configProps} />;
  };

  return BoundComponent as TComponent;
}
