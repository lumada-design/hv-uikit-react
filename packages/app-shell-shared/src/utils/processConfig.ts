/**
 * Process raw config to add $key properties
 * This enables React key-based reconciliation
 */

import type {
  HvAppShellConfig,
  HvAppShellMenuConfig,
  HvAppShellViewsConfig,
} from "../types/Config";

/**
 * Process config to add $key properties
 * Returns processed config for React key-based reconciliation
 */
export const processConfig = (
  rawConfig: HvAppShellConfig,
): HvAppShellConfig => {
  let keyCounter = 0;

  // Helper to add key (if not present)
  const registerElement = <T extends { $key?: string | number }>(
    element: T,
  ): T => {
    return element.$key == null ? { ...element, $key: keyCounter++ } : element;
  };

  // Process views recursively
  const processViews = (
    views: HvAppShellViewsConfig[],
  ): HvAppShellViewsConfig[] => {
    return views.map((view) => {
      const processed = registerElement(view);
      if (view.views) {
        return {
          ...processed,
          views: processViews(view.views),
        };
      }
      return processed;
    });
  };

  // Process menus recursively
  const processMenus = (
    menus: HvAppShellMenuConfig[],
  ): HvAppShellMenuConfig[] => {
    return menus.map((menu) => {
      const processed = registerElement(menu);
      if (menu.submenus) {
        return {
          ...processed,
          submenus: processMenus(menu.submenus),
        };
      }
      return processed;
    });
  };

  // Build processed config
  const processedConfig: HvAppShellConfig = { ...rawConfig };

  if (rawConfig.mainPanel?.views) {
    processedConfig.mainPanel = {
      ...rawConfig.mainPanel,
      views: processViews(rawConfig.mainPanel.views),
    };
  }

  if (rawConfig.menu) {
    processedConfig.menu = processMenus(rawConfig.menu);
  }

  if (rawConfig.header?.actions) {
    processedConfig.header = {
      ...rawConfig.header,
      actions: rawConfig.header.actions.map((action) =>
        registerElement(action),
      ),
    };
  }

  if (rawConfig.providers) {
    processedConfig.providers = rawConfig.providers.map((provider) =>
      registerElement(provider),
    );
  }

  if (rawConfig.services) {
    const processedServices: HvAppShellConfig["services"] = {};
    for (const [serviceId, configs] of Object.entries(rawConfig.services)) {
      processedServices[serviceId] = configs.map((config) =>
        registerElement(config),
      );
    }
    processedConfig.services = processedServices;
  }

  return processedConfig;
};
