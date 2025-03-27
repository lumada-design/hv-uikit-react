export { default as HvAppShellVitePlugin } from "./vite-plugin.js";
export * from "./vite-plugin.js";

// reexport types from shared package
export type {
  HvAppShellConfig,
  HvAppShellIcon,
  HvAppShellLogo,
  HvAppShellMenuConfig,
  HvAppShellMainPanelConfig,
  HvAppShellViewsConfig,
} from "@hitachivantara/app-shell-shared";
