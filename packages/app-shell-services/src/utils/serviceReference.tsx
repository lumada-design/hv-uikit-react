import { FC, PropsWithChildren } from "react";

import {
  BundleConfig,
  ComponentServiceConfig,
  FactoryServiceConfig,
  FactoryServiceFunction,
  InstanceServiceConfig,
  ServiceConfig,
  ServiceConfigBase,
  ServiceId,
} from "../types/config";
import { ServiceLoader, ServiceReference } from "../types/service";

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
  const instanceConfig = config.instance;

  if ("value" in instanceConfig) {
    const serviceInstance = instanceConfig.value as TService;
    const serviceLoader: ServiceLoader<TService> = () =>
      Promise.resolve(serviceInstance);
    return createServiceReferenceBase<TService>(
      serviceId,
      config,
      serviceLoader,
    );
  }

  if ("bundle" in instanceConfig) {
    const serviceLoader: ServiceLoader<TService> = async () => {
      const imported = await import(/* @vite-ignore */ instanceConfig.bundle);
      return validateImportedModule<TService>(
        imported,
        serviceId,
        instanceConfig.bundle,
      );
    };
    return createServiceReferenceBase<TService>(
      serviceId,
      config,
      serviceLoader,
    );
  }

  throw new Error(`Invalid instance service config for ${serviceId}`);
}

function createFactoryReference<TService>(
  serviceId: ServiceId,
  config: FactoryServiceConfig,
): ServiceReference<TService> {
  let loaded = false;
  let serviceInstance: TService | undefined;

  const factoryConfig = config.factory;

  const serviceLoader: ServiceLoader<TService> = async () => {
    if (!loaded) {
      let factoryExport: unknown;

      if ("value" in factoryConfig) {
        factoryExport = factoryConfig.value;
      } else if ("bundle" in factoryConfig) {
        const imported = await import(/* @vite-ignore */ factoryConfig.bundle);
        factoryExport = validateImportedModule<unknown>(
          imported,
          serviceId,
          factoryConfig.bundle,
        );
      } else {
        throw new Error(`Invalid factory service config for ${serviceId}`);
      }

      if (typeof factoryExport !== "function") {
        throw new Error(
          `Factory service for ${serviceId} did not resolve to a function. Value: ${factoryExport}`,
        );
      }

      const factoryFn = factoryExport as FactoryServiceFunction<TService>;
      const providedConfig =
        "bundle" in factoryConfig ? factoryConfig.config : undefined;
      serviceInstance = factoryFn(providedConfig);

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

  const componentServiceConfig = config.component;

  const serviceLoader: ServiceLoader<TService> = async () => {
    if (!loaded) {
      let componentExport: unknown;
      let providedConfig: BundleConfig | undefined;

      if ("value" in componentServiceConfig) {
        componentExport = componentServiceConfig.value;
      } else if ("bundle" in componentServiceConfig) {
        const imported = await import(
          /* @vite-ignore */ componentServiceConfig.bundle
        );
        componentExport = validateImportedModule<unknown>(
          imported,
          serviceId,
          componentServiceConfig.bundle,
        );
        providedConfig = componentServiceConfig.config;
      } else {
        throw new Error(`Invalid component service config for ${serviceId}`);
      }

      if (typeof componentExport !== "function") {
        throw new Error(
          `Component definition for service ${serviceId} is not a React component function`,
        );
      }

      serviceInstance = bindComponent(
        componentExport as TService,
        providedConfig ?? {},
      );
      loaded = true;
    }

    return serviceInstance!;
  };

  return createServiceReferenceBase<TService>(serviceId, config, serviceLoader);
}

/**
 * Create a ServiceReference for the given service identifier and provided configuration.
 * A service can be provided in one of three shapes:
 * - instance: Provides a service instance either directly (using `value`) or by lazy-loading a module (using `bundle`).
 *   The instance is used as-is and no further construction occurs.
 * - factory: Provides a factory function either directly (using `value`) or by lazy-loading a module (using `bundle`).
 *   The factory function is called with a config object if provided to produce the service instance. The value must always be a function.
 * - component: Provides a React component either directly (using `value`) or by lazy-loading a module (using `bundle`).
 *   The component is used as-is or bound with a config object if provided. The value must always be a React component function.
 *
 * This function abstracts the details of how services are provided, allowing consumers to reference services uniformly regardless of whether they are direct values or loaded from bundles.
 *
 * @template TService The concrete service type returned by the created reference.
 * @param serviceId Identifier for the service being referenced.
 * @param serviceConfig Configuration that determines how the service is provided.
 * @returns A {@link ServiceReference} object exposing metadata and a getService() loader that resolves the service.
 * @throws {Error} If the provided configuration shape is unsupported, or if a factory service does not resolve to a function. Errors from dynamic imports, missing exports, or invalid factory/component shapes are propagated by the underlying provider implementations.
 */
export function createServiceReference<TService = unknown>(
  serviceId: ServiceId,
  serviceConfig: ServiceConfig,
): ServiceReference<TService> {
  if ("instance" in serviceConfig) {
    return createInstanceReference<TService>(serviceId, serviceConfig);
  }

  if ("factory" in serviceConfig) {
    return createFactoryReference<TService>(serviceId, serviceConfig);
  }

  if ("component" in serviceConfig) {
    return createComponentReference<TService extends FC ? TService : FC>(
      serviceId,
      serviceConfig,
    ) as ServiceReference<TService>;
  }

  throw new Error(
    `Unsupported service provider configuration for service ${serviceId}`,
  );
}

function bindComponent<
  TComponent extends FC<PropsWithChildren<P>>,
  P extends BundleConfig,
>(Component: TComponent, configProps: P): TComponent {
  const BoundComponent = (props: PropsWithChildren<P>) => {
    // Explicitly passed props override the ones from coming from the config
    const mergedProps = { ...configProps, ...props };
    // @ts-expect-error TODO fix the types!
    return <Component {...mergedProps} />;
  };

  return BoundComponent as TComponent;
}
