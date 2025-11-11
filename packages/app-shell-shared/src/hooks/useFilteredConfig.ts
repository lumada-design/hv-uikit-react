import { useEffect, useState } from "react";

import type { ConditionMetadata, UseConditionResult } from "../types/condition";
import type {
  HvAppShellConfig,
  HvAppShellHeaderAction,
  HvAppShellMenuConfig,
  HvAppShellProvidersConfig,
  HvAppShellViewsConfig,
} from "../types/Config";
import { processElementConditions } from "../utils/conditionUtils";

/**
 * Apply view conditions to menus (inheritance logic)
 * Merges both explicit menu conditions and inherited view conditions using AND logic
 */
const applyViewConditionsToMenus = (
  menus: HvAppShellMenuConfig[],
  routeConditionsMap: Map<string, HvAppShellViewsConfig["conditions"]>,
): HvAppShellMenuConfig[] => {
  return menus.map((menu) => {
    let hasChanges = false;
    let updatedMenu: HvAppShellMenuConfig = menu;

    // If menu has a target, inherit conditions from matching view
    if (menu.target) {
      const normalizedTarget = menu.target.replace(/^\//, "");
      const viewConditions = routeConditionsMap.get(normalizedTarget);

      if (viewConditions) {
        // Merge explicit menu conditions with inherited view conditions
        // Both must be satisfied (AND logic)
        const mergedConditions = [
          ...(menu.conditions || []),
          ...viewConditions,
        ];

        if (mergedConditions.length > 0) {
          updatedMenu = { ...menu, conditions: mergedConditions };
          hasChanges = true;
        }
      }
    }

    // Recursively apply to submenus
    if (menu.submenus) {
      const updatedSubmenus = applyViewConditionsToMenus(
        menu.submenus,
        routeConditionsMap,
      );

      // Only create new object if submenus changed
      if (updatedSubmenus !== menu.submenus) {
        updatedMenu = hasChanges
          ? { ...updatedMenu, submenus: updatedSubmenus }
          : { ...menu, submenus: updatedSubmenus };
        hasChanges = true;
      }
    }

    return hasChanges ? updatedMenu : menu;
  });
};

/**
 * Create a map of route -> conditions from views for menu inheritance
 */
const createRouteConditionsMap = (
  views: HvAppShellViewsConfig[],
): Map<string, HvAppShellViewsConfig["conditions"]> => {
  const map = new Map<string, HvAppShellViewsConfig["conditions"]>();

  const processView = (view: HvAppShellViewsConfig) => {
    if (view.route && view.conditions) {
      const normalizedRoute = view.route.replace(/^\//, "");
      map.set(normalizedRoute, view.conditions);
    }
    if (view.views) {
      for (const nestedView of view.views) {
        processView(nestedView);
      }
    }
  };

  for (const view of views) {
    processView(view);
  }
  return map;
};

export const extractConditionsMetadata = (
  config: HvAppShellConfig | undefined,
): ConditionMetadata[] => {
  if (!config) {
    return [];
  }

  // Apply menu inheritance first
  let menusToProcess = config.menu;

  if (config.menu && config.mainPanel?.views) {
    const routeConditionsMap = createRouteConditionsMap(config.mainPanel.views);
    menusToProcess = applyViewConditionsToMenus(
      config.menu,
      routeConditionsMap,
    );
  }

  const metadata: ConditionMetadata[] = [];
  const hookIndexRef = { current: 0 };

  const processViews = (
    views: HvAppShellViewsConfig[],
    parentPath = "mainPanel.views",
  ) => {
    for (let viewIdx = 0; viewIdx < views.length; viewIdx++) {
      const view = views[viewIdx];
      const viewPath = `${parentPath}[${viewIdx}]`;

      if (view.$key !== undefined) {
        processElementConditions(
          view.conditions,
          viewPath,
          "view",
          view.$key,
          hookIndexRef,
          metadata,
        );
      }

      if (view.views) {
        processViews(view.views, `${viewPath}.views`);
      }
    }
  };

  const processMenus = (menus: HvAppShellMenuConfig[], parentPath = "menu") => {
    for (let menuIdx = 0; menuIdx < menus.length; menuIdx++) {
      const menu = menus[menuIdx];
      const menuPath = `${parentPath}[${menuIdx}]`;

      if (menu.$key !== undefined) {
        processElementConditions(
          menu.conditions,
          menuPath,
          "menu",
          menu.$key,
          hookIndexRef,
          metadata,
        );
      }

      if (menu.submenus) {
        processMenus(menu.submenus, `${menuPath}.submenus`);
      }
    }
  };

  const processHeaderActions = (actions: HvAppShellHeaderAction[]) => {
    for (let actionIdx = 0; actionIdx < actions.length; actionIdx++) {
      const action = actions[actionIdx];
      const actionPath = `header.actions[${actionIdx}]`;

      if (action.$key !== undefined) {
        processElementConditions(
          action.conditions,
          actionPath,
          "headerAction",
          action.$key,
          hookIndexRef,
          metadata,
        );
      }
    }
  };

  const processProviders = (providers: HvAppShellProvidersConfig[]) => {
    for (let providerIdx = 0; providerIdx < providers.length; providerIdx++) {
      const provider = providers[providerIdx];
      const providerPath = `providers[${providerIdx}]`;

      if (provider.$key !== undefined) {
        processElementConditions(
          provider.conditions,
          providerPath,
          "provider",
          provider.$key,
          hookIndexRef,
          metadata,
        );
      }
    }
  };

  const processServices = (services: HvAppShellConfig["services"]) => {
    if (!services) return;

    for (const [serviceId, serviceConfigs] of Object.entries(services)) {
      for (
        let serviceIdx = 0;
        serviceIdx < serviceConfigs.length;
        serviceIdx++
      ) {
        const serviceConfig = serviceConfigs[serviceIdx];
        const servicePath = `services.${serviceId}[${serviceIdx}]`;

        if (serviceConfig.$key !== undefined) {
          processElementConditions(
            serviceConfig.conditions,
            servicePath,
            "service",
            serviceConfig.$key,
            hookIndexRef,
            metadata,
          );
        }
      }
    }
  };

  // Process all config elements
  if (config.mainPanel?.views) {
    processViews(config.mainPanel.views);
  }

  if (menusToProcess) {
    processMenus(menusToProcess);
  }

  if (config.header?.actions) {
    processHeaderActions(config.header.actions);
  }

  if (config.providers) {
    processProviders(config.providers);
  }

  if (config.services) {
    processServices(config.services);
  }

  return metadata;
};

export const useLoadAllConditionHooks = (
  bundleList: string[],
): { hooks: ((() => UseConditionResult) | null)[]; isLoading: boolean } => {
  const [hooks, setHooks] = useState<((() => UseConditionResult) | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load all condition modules
  useEffect(() => {
    if (bundleList.length === 0) {
      setHooks([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    // Load all bundles in parallel
    Promise.all(
      bundleList.map((bundle) =>
        import(/* @vite-ignore */ bundle)
          .then((module) => module.default as () => UseConditionResult)
          .catch((error) => {
            console.error(`Failed to load condition hook ${bundle}:`, error);
            return null;
          }),
      ),
    ).then((loadedHooks) => {
      if (!cancelled) {
        setHooks(loadedHooks);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [bundleList]);

  return { hooks, isLoading };
};

/**
 * Filter config based on condition results using element keys
 */
export const filterConfigWithResults = (
  config: HvAppShellConfig,
  metadata: ConditionMetadata[],
  results: Map<number, boolean>,
): HvAppShellConfig => {
  // Group metadata by element key for efficient AND logic
  const metadataByElement = new Map<string | number, ConditionMetadata[]>();

  for (const meta of metadata) {
    const group = metadataByElement.get(meta.elementKey) ?? [];
    group.push(meta);
    metadataByElement.set(meta.elementKey, group);
  }

  // Build element results map with AND logic: all conditions must be true
  const elementResults = new Map<string | number, boolean>();

  for (const [elementKey, metas] of metadataByElement) {
    const allTrue = metas.every((meta) => results.get(meta.hookIndex) ?? false);
    elementResults.set(elementKey, allTrue);
  }

  const filterViews = (
    views: HvAppShellViewsConfig[],
  ): HvAppShellViewsConfig[] => {
    const result: HvAppShellViewsConfig[] = [];

    for (const view of views) {
      if (view.$key === undefined) {
        result.push(view);
        continue;
      }

      const shouldInclude = elementResults.get(view.$key) ?? true;

      if (!shouldInclude) {
        continue;
      }

      if (view.views) {
        result.push({
          ...view,
          views: filterViews(view.views),
        });
      } else {
        result.push(view);
      }
    }

    return result;
  };

  const filterMenus = (
    menus: HvAppShellMenuConfig[],
  ): HvAppShellMenuConfig[] => {
    const result: HvAppShellMenuConfig[] = [];

    for (const menu of menus) {
      if (menu.$key === undefined) {
        result.push(menu);
        continue;
      }

      const shouldInclude = elementResults.get(menu.$key) ?? true;

      if (!shouldInclude) {
        continue;
      }

      if (menu.submenus) {
        const filteredSubmenus = filterMenus(menu.submenus);
        // Keep parent only if it has visible children OR has its own target
        if (filteredSubmenus.length > 0 || menu.target) {
          result.push({
            ...menu,
            submenus:
              filteredSubmenus.length > 0 ? filteredSubmenus : undefined,
          });
        }
      } else {
        result.push(menu);
      }
    }

    return result;
  };

  const filterActions = (
    actions: HvAppShellHeaderAction[],
  ): HvAppShellHeaderAction[] => {
    return actions.filter((action) => {
      if (action.$key === undefined) return true;
      return elementResults.get(action.$key) ?? true;
    });
  };

  const filterProviders = (
    providers: HvAppShellProvidersConfig[],
  ): HvAppShellProvidersConfig[] => {
    return providers.filter((provider) => {
      if (provider.$key === undefined) return true;
      return elementResults.get(provider.$key) ?? true;
    });
  };

  const filterServices = (
    services: HvAppShellConfig["services"],
  ): HvAppShellConfig["services"] => {
    if (!services) return services;

    const filtered: HvAppShellConfig["services"] = {};

    for (const [serviceId, serviceConfigs] of Object.entries(services)) {
      const filteredConfigs = serviceConfigs.filter((config) => {
        if (config.$key === undefined) return true;
        return elementResults.get(config.$key) ?? true;
      });

      if (filteredConfigs.length > 0) {
        filtered[serviceId] = filteredConfigs;
      }
    }

    return filtered;
  };

  const filtered: HvAppShellConfig = { ...config };

  if (config.mainPanel?.views) {
    filtered.mainPanel = {
      ...config.mainPanel,
      views: filterViews(config.mainPanel.views),
    };
  }

  if (config.menu) {
    filtered.menu = filterMenus(config.menu);
  }

  if (config.header?.actions) {
    filtered.header = {
      ...config.header,
      actions: filterActions(config.header.actions),
    };
  }

  if (config.providers) {
    filtered.providers = filterProviders(config.providers);
  }

  if (config.services) {
    filtered.services = filterServices(config.services);
  }

  return filtered;
};
