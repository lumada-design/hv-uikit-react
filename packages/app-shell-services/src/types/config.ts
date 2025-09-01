export type ServicesConfig = Record<ServiceId, ServiceConfig[]>;

export type ServiceId = string; //NOSONAR

/**
 * A service configuration can be one of several kinds (instance, factory, component),
 * each of which supports two declaration modes:
 *  - Value: directly provide the instance, factory or component
 *  - Bundle: module to be lazy loaded with optional config object
 */
export type ServiceConfig =
  | InstanceServiceConfig
  | FactoryServiceConfig
  | ComponentServiceConfig;

export type ServiceConfigBase = {
  ranking?: number;
};

/** Directly provided value */
export type Value = {
  value: unknown;
};

/** Bundle for lazy loading */
export type Bundle = {
  bundle: string;
};

export type BundleConfig = Record<string, unknown>;

export type InstanceValueOrBundle = Value | Bundle;

export type FactoryOrComponentValueOrBundle<TBundleConfig = BundleConfig> =
  | Value
  | (Bundle & { config?: TBundleConfig });

export type InstanceServiceConfig = ServiceConfigBase & {
  instance: InstanceValueOrBundle;
};

// Factory function type used when a factory bundle exports a creator
export type FactoryServiceFunction<
  TService = unknown,
  TConfig = BundleConfig,
> = (config?: TConfig) => TService;

// What a factory direct value or lazy loaded bundle may provide: always a factory function
export type FactoryExport<
  TService = unknown,
  TConfig = BundleConfig,
> = FactoryServiceFunction<TService, TConfig>;

// Factory value or bundle: value must be a function
export type FactoryValueOrBundle<TBundleConfig = BundleConfig> =
  | { value: FactoryServiceFunction }
  | (Bundle & { config?: TBundleConfig });

export type FactoryServiceConfig = ServiceConfigBase & {
  factory: FactoryValueOrBundle;
};

export type ComponentServiceConfig = ServiceConfigBase & {
  component: FactoryOrComponentValueOrBundle;
};
