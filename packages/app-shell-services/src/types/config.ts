// Re-export the services related App Shell configuration types
// This removes the need to install app-shell-shared and avoids circular dependencies
export type {
  HvAppShellServicesConfig as ServicesConfig,
  HvAppShellServiceId as ServiceId,
  HvAppShellServiceConfig as ServiceConfig,
  HvAppShellInstanceServiceConfig as InstanceServiceConfig,
  HvAppShellBundleServiceConfig as BundleServiceConfig,
  HvAppShellFactoryServiceConfig as FactoryServiceConfig,
  HvAppShellComponentServiceConfig as ComponentServiceConfig,
  HvAppShellServiceConfigBase as ServiceConfigBase,
  HvAppShellFactoryConfig as FactoryConfig,
  HvAppShellFactoryService as FactoryService,
} from "@hitachivantara/app-shell-shared";
