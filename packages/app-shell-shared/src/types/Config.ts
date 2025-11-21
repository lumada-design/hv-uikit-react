import type {
  ServiceConfig,
  ServiceId,
} from "@hitachivantara/app-shell-services";
import type { HvContainerProps } from "@hitachivantara/uikit-react-core";

import type { HvAppShellConditionConfig } from "./condition";

type ViewHvContainerProps = Omit<HvContainerProps, "children">;

// Extend ServiceConfig to add conditions at the app-shell level
export type HvAppShellServiceConfig = ServiceConfig & {
  conditions?: HvAppShellConditionConfig[];
  $key?: string | number;
};

// App-shell's version of ServicesConfig with condition support
export type HvAppShellServicesConfig = Record<
  ServiceId,
  HvAppShellServiceConfig[]
>;

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
  conditions?: HvAppShellConditionConfig[];
  $key?: string | number;
};

type RouteString = `/${string}`;

export type HvAppShellViewsConfig = {
  bundle: string;
  route: RouteString;
  config?: Record<string, unknown>;
  conditions?: HvAppShellConditionConfig[];
  views?: HvAppShellViewsConfig[];
  $key?: string | number;
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
  conditions?: HvAppShellConditionConfig[];
  $key?: string | number;
};

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
  conditions?: HvAppShellConditionConfig[];
  $key?: string | number;
};
