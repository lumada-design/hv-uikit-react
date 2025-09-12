import { FC, PropsWithChildren } from "react";

import {
  BundleServiceConfig,
  ComponentServiceConfig,
  FactoryServiceConfig,
  InstanceServiceConfig,
  ServiceConfig,
  ServiceConfigBase,
  ServiceId,
} from "../types/config";
import { ServiceLoader, ServiceReference } from "../types/service";

/**
 * Utility type to extract the base service type from a provider config type.
 * Used for type inference in service management logic.
 */
type GetServiceBaseTypeFromConfigType<TConfig extends ServiceConfig> =
  TConfig extends ComponentServiceConfig ? FC : never;

function createServiceReferenceBase<TService>(
  serviceId: ServiceId,
  serviceConfig: ServiceConfigBase,
  getService: ServiceLoader<TService>,
): ServiceReference<TService> {
  return {
    serviceId,
    ranking: serviceConfig.ranking ?? 0,
    getService,
  };
}

// Helper function to validate imported ESM modules and extract the default export.
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

  if (
    typeof imported === "object" &&
    "default" in imported &&
    (imported as { default: unknown }).default != null
  ) {
    return (imported as { default: unknown }).default as TService;
  }

  // Enforce policy: no CommonJS or direct function root exports allowed.
  throw new Error(
    `ESM default export missing for ${bundlePath} (service ${serviceId}). Ensure the module uses a default export.`,
  );
}

function createInstanceReference<TService>(
  serviceId: ServiceId,
  config: InstanceServiceConfig,
): ServiceReference<TService> {
  const serviceInstance: TService = config.instance as TService;

  const serviceLoader: ServiceLoader<TService> = () => {
    return Promise.resolve(serviceInstance);
  };

  return createServiceReferenceBase<TService>(serviceId, config, serviceLoader);
}

function createBundleReference<TService>(
  serviceId: ServiceId,
  config: BundleServiceConfig,
): ServiceReference<TService> {
  const serviceLoader: ServiceLoader<TService> = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const imported = await import(/* @vite-ignore */ config.bundle);
    return validateImportedModule<TService>(imported, serviceId, config.bundle);
  };

  return createServiceReferenceBase<TService>(serviceId, config, serviceLoader);
}

function createFactoryReference<TService>(
  serviceId: ServiceId,
  config: FactoryServiceConfig,
): ServiceReference<TService> {
  let loaded = false;
  let serviceInstance: TService | undefined;

  const serviceLoader: ServiceLoader<TService> = async () => {
    if (!loaded) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const imported = await import(/* @vite-ignore */ config.factory.bundle);
      const factory = validateImportedModule<TService>(
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

function createComponentReference<TService extends FC>(
  serviceId: ServiceId,
  config: ComponentServiceConfig,
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
 * - bundle: dynamically imports the specified bundle and returns its default export as the service instance.
 * - factory: dynamically imports a bundle that exports a factory function, calls it
 *   with the provided factory config, and returns the produced service instance.
 * - component: dynamically imports a React component bundle, binds the configured
 *   props and returns the bound component as the service.
 *
 * @template TService The concrete service type returned by the created reference.
 * @template TConfig  The ServiceProviderConfig subtype used to create the reference.
 *
 * @param serviceId Identifier for the service being referenced.
 * @param serviceConfig Configuration that determines how the service is provided.
 *
 * @returns A {@link ServiceReference} object exposing metadata and a getService() loader that resolves the service.
 *
 * @throws {Error} If the provided configuration shape is unsupported. Errors from
 *                 dynamic imports, missing exports, or invalid factory/component
 *                 shapes are propagated by the underlying provider implementations.
 */
export function createServiceReference<
  TService extends GetServiceBaseTypeFromConfigType<TConfig>,
  TConfig extends ServiceConfig,
>(serviceId: ServiceId, serviceConfig: TConfig): ServiceReference<TService> {
  if ("instance" in serviceConfig) {
    return createInstanceReference<TService>(serviceId, serviceConfig);
  }

  if ("bundle" in serviceConfig) {
    return createBundleReference<TService>(serviceId, serviceConfig);
  }

  if ("factory" in serviceConfig) {
    return createFactoryReference<TService>(serviceId, serviceConfig);
  }

  if ("component" in serviceConfig) {
    return createComponentReference<TService extends FC ? TService : never>(
      serviceId,
      serviceConfig,
    );
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
    // Explicitly passed props override the ones from coming from the config
    const mergedProps = { ...configProps, ...props };
    // @ts-expect-error TODO fix the types!
    return <Component {...mergedProps} />;
  };

  return BoundComponent as TComponent;
}
