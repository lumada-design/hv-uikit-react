import type { HvContainerProps } from "@hitachivantara/uikit-react-core";

type ViewHvContainerProps = Omit<HvContainerProps, "children">;

export type HvAppShellLogo = {
  name?: "LUMADA" | "HITACHI" | "PENTAHO+" | "PENTAHO";
  description?: string;
};

export type HvAppShellIcon = {
  iconType: "uikit";
  name: string;
};

export type HvAppShellMenuConfig = {
  label: string;
  icon?: HvAppShellIcon;
  target?: string;
  submenus?: HvAppShellMenuConfig[];
};

type RouteString = `/${string}`;

export type HvAppShellViewsConfig = {
  bundle: string;
  route: RouteString;
  config?: Record<string, unknown>;
  views?: HvAppShellViewsConfig[];
};

export interface HvAppShellTopViewConfig
  extends HvAppShellViewsConfig,
    ViewHvContainerProps {}

export type HvAppShellHelp = {
  url: string;
  description?: string;
};

export interface HvAppShellMainPanelConfig extends ViewHvContainerProps {
  views?: HvAppShellTopViewConfig[];
}

export type HvAppShellProvidersConfig = {
  bundle: string;
  config?: Record<string, unknown>;
};

// region Services types
export type HvAppShellServicesConfig = Record<
  HvAppShellServiceId,
  HvAppShellServiceProviderConfig[]
>;

export type HvAppShellServiceId = string; //NOSONAR

export type HvAppShellServiceProviderConfig =
  | HvAppShellInstanceServiceProviderConfig
  | HvAppShellInstanceBundleServiceProviderConfig
  | HvAppShellFactoryBundleServiceProviderConfig
  | HvAppShellComponentBundleServiceProviderConfig;

export type HvAppShellServiceProviderConfigBase = {
  ranking?: number;

  attributes?: HvAppShellServiceManagerAttributes;
};

export type HvAppShellServiceManagerAttributes = Record<
  HvAppShellServiceProviderAttributeName,
  unknown
>;

export type HvAppShellStandardServiceProviderAttributeName = "ranking";
export type HvAppShellServiceProviderAttributeName =
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  HvAppShellStandardServiceProviderAttributeName | string;

export type HvAppShellInstanceServiceProviderConfig =
  HvAppShellServiceProviderConfigBase & {
    instance: unknown;
  };

export type HvAppShellInstanceBundleServiceProviderConfig =
  HvAppShellServiceProviderConfigBase & {
    bundle: string;
  };

export type HvAppShellFactoryBundleServiceProviderConfig =
  HvAppShellServiceProviderConfigBase & {
    factory: {
      bundle: string;

      config?: HvAppShellServiceFactoryConfig;
    };
  };

export type HvAppShellServiceFactoryConfig = Record<string, unknown>;

export type HvAppShellComponentBundleServiceProviderConfig =
  HvAppShellServiceProviderConfigBase & {
    component: {
      bundle: string;

      props?: Record<string, unknown>;
    };
  };
// endregion

export type HvAppShellConfig = {
  baseUrl?: string;
  name?: string;
  logo?: HvAppShellLogo | null;
  apps?: Record<string, string>;
  menu?: HvAppShellMenuConfig[];
  translations?: Record<string, object>;
  navigationMode?: "TOP_AND_LEFT" | "ONLY_TOP" | "ONLY_LEFT";
  mainPanel?: HvAppShellMainPanelConfig;
  theming?: HvAppShellThemingConfig;
  header?: HvAppShellHeader;
  providers?: HvAppShellProvidersConfig[];
  services?: HvAppShellServicesConfig;
};

export type HvAppShellThemingConfig = {
  themes?: string[];
  theme?: string;
  colorMode?: string;
};

export type HvAppShellAppSwitcherConfig = {
  title?: string;
  showLogo?: boolean;
  apps: HvAppShellAppSwitcherItemConfig[];
};

export type HvAppShellAppSwitcherItemConfig = {
  label: string;
  description?: string;
  url: string;
  target: "NEW" | "SELF";
  icon?: HvAppShellIcon;
};

export type HvAppShellHeader = {
  actions: HvAppShellHeaderAction[];
};

export type HvAppShellHeaderAction = {
  bundle: string;
  config?:
    | HvAppShellHelp
    | HvAppShellAppSwitcherConfig
    | Record<string, unknown>;
};
