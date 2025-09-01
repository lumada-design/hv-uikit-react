// Re-export the services related App Shell configuration types
// This removes the need to install app-shell-shared and avoids circular dependencies
export type {
  HvAppShellServicesConfig as ServicesConfig,
  HvAppShellServiceId as ServiceId,
  HvAppShellServiceProviderConfig as ServiceProviderConfig,
  HvAppShellInstanceServiceProviderConfig as InstanceServiceProviderConfig,
  HvAppShellInstanceBundleServiceProviderConfig as InstanceBundleServiceProviderConfig,
  HvAppShellFactoryBundleServiceProviderConfig as FactoryBundleServiceProviderConfig,
  HvAppShellComponentBundleServiceProviderConfig as ComponentBundleServiceProviderConfig,
  HvAppShellServiceProviderConfigBase as ServiceProviderConfigBase,
  HvAppShellServiceManagerAttributes as ServiceManagerAttributes,
  HvAppShellServiceProviderAttributeName as ServiceProviderAttributeName,
  HvAppShellStandardServiceProviderAttributeName as StandardServiceProviderAttributeName,
  HvAppShellServiceFactoryConfig as ServiceFactoryConfig,
} from "@hitachivantara/app-shell-shared";
