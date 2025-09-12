export type ServicesConfig = Record<ServiceId, ServiceConfig[]>;

export type ServiceId = string; //NOSONAR

export type ServiceConfig =
  | InstanceServiceConfig
  | BundleServiceConfig
  | FactoryServiceConfig
  | ComponentServiceConfig;

export type ServiceConfigBase = {
  ranking?: number;
};

export type InstanceServiceConfig = ServiceConfigBase & {
  instance: unknown;
};

export type BundleServiceConfig = ServiceConfigBase & {
  bundle: string;
};

export type FactoryConfig = Record<string, unknown>;

export type FactoryService<TService> = (config?: FactoryConfig) => TService;

export type FactoryServiceConfig = ServiceConfigBase & {
  factory: {
    // bundle whose default export is a service factory {@link FactoryService}
    bundle: string;

    config?: FactoryConfig;
  };
};

export type ComponentServiceConfig = ServiceConfigBase & {
  component: {
    bundle: string;

    props?: Record<string, unknown>;
  };
};
