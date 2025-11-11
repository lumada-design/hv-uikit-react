import {
  ComponentType,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { I18nContext } from "react-i18next";
import {
  CONFIG_TRANSLATIONS_NAMESPACE,
  filterConfigWithResults,
  HvAppShellCombinedProvidersContext,
  HvAppShellConfig,
  HvAppShellContext,
  HvAppShellRuntimeContext,
  reconcileFilteredConfig,
  type ConditionMetadata,
  type UseConditionResult,
} from "@hitachivantara/app-shell-shared";
import {
  themes as baseThemes,
  HvProvider,
  HvProviderProps,
} from "@hitachivantara/uikit-react-core";

import useLocalStorage from "../../hooks/useLocalStorage";
import { addResourceBundles } from "../../i18n";

interface AppShellProviderInnerProps extends PropsWithChildren {
  rawConfig: HvAppShellConfig;
  conditionHooks: ((() => UseConditionResult) | null)[];
  metadata: ConditionMetadata[];
}

const AppShellProviderInner = ({
  children,
  rawConfig,
  conditionHooks,
  metadata,
}: AppShellProviderInnerProps) => {
  const { i18n } = useContext(I18nContext);
  const { value: storedColorModeValue } = useLocalStorage("COLOR_MODE");

  const conditionResults: UseConditionResult[] = conditionHooks.map((hook) => {
    if (!hook) {
      return {
        isPending: false,
        error: new Error("Failed to load hook"),
        result: false,
      };
    }

    try {
      return hook();
    } catch (error) {
      return {
        isPending: false,
        error: error as Error,
        result: false,
      };
    }
  });

  const metadataByHookIndex = useMemo(
    () => new Map(metadata.map((m) => [m.hookIndex, m])),
    [metadata],
  );

  const resultsMap = useMemo(() => {
    const map = new Map<number, boolean>();

    for (let idx = 0; idx < conditionResults.length; idx++) {
      const result = conditionResults[idx];
      const meta = metadataByHookIndex.get(idx);

      if (meta) {
        const boolResult =
          !result.isPending && !result.error ? (result.result ?? false) : false;
        map.set(meta.hookIndex, boolResult);
      }
    }

    return map;
  }, [conditionResults, metadataByHookIndex]);

  // Store previous filtered config for reconciliation
  const prevFilteredConfigRef = useRef<HvAppShellConfig>();

  const resolvedConfig = useMemo(() => {
    if (metadata.length === 0) {
      return rawConfig;
    }

    const newFiltered = filterConfigWithResults(
      rawConfig,
      metadata,
      resultsMap,
    );

    // Reconcile with previous filtered config to preserve references
    const reconciled = reconcileFilteredConfig(
      newFiltered,
      prevFilteredConfigRef.current,
    );

    // Store for next reconciliation
    prevFilteredConfigRef.current = reconciled;

    return reconciled;
  }, [rawConfig, metadata, resultsMap]);

  if (resolvedConfig?.translations) {
    addResourceBundles(
      i18n,
      resolvedConfig.translations,
      CONFIG_TRANSLATIONS_NAMESPACE,
    );
  }

  const [themes, setThemes] = useState<HvProviderProps["themes"]>(undefined);

  const [providers, setProviders] = useState<
    | Array<{
        component: ComponentType<{ children: ReactNode }>;
        config?: Record<string, unknown>;
      }>
    | undefined
  >(undefined);

  useEffect(() => {
    if (resolvedConfig?.theming?.themes) {
      Promise.all(
        resolvedConfig.theming.themes.map((bundle) => {
          return (
            baseThemes[bundle as keyof typeof baseThemes] ??
            import(/* @vite-ignore */ bundle)
              .then((module) => module.default)
              .catch((e) => {
                console.error(`Import of theme bundle ${bundle} failed! ${e}`);
              })
          );
        }),
      )
        .then((loadedThemes) => {
          setThemes(loadedThemes.filter((theme) => !!theme));
        })
        .catch((e) => {
          console.error(`Import of themes failed! ${e}`);
        });
    }
  }, [resolvedConfig?.theming?.themes]);

  useEffect(() => {
    if (resolvedConfig?.providers) {
      Promise.all(
        resolvedConfig.providers.map(async (provider) => {
          try {
            const module = await import(/* @vite-ignore */ provider.bundle);
            return {
              component: module.default,
              config: provider.config,
            };
          } catch (e) {
            console.error(
              `Import of provider '${provider.bundle}' failed! ${e}`,
            );
            return null;
          }
        }),
      )
        .then((loadedProviders) => {
          const filtered = loadedProviders.filter((provider) => !!provider);
          setProviders(filtered);
        })
        .catch((e) => {
          console.error(`Import of providers failed!`, e);
        });
    } else {
      setProviders(undefined);
    }
  }, [resolvedConfig?.providers]);

  const runtimeContext = useMemo(
    () => ({
      i18n,
    }),
    [i18n],
  );

  const providersContext = useMemo(
    () => ({
      providers,
    }),
    [providers],
  );

  if (
    !resolvedConfig ||
    (resolvedConfig.theming?.themes && !themes) ||
    (resolvedConfig.providers != null && providers === undefined)
  ) {
    return null;
  }

  return (
    <HvAppShellContext.Provider value={resolvedConfig}>
      <HvAppShellRuntimeContext.Provider value={runtimeContext}>
        <HvProvider
          themes={themes}
          theme={resolvedConfig.theming?.theme}
          colorMode={storedColorModeValue ?? resolvedConfig.theming?.colorMode}
        >
          <HvAppShellCombinedProvidersContext.Provider value={providersContext}>
            {children}
          </HvAppShellCombinedProvidersContext.Provider>
        </HvProvider>
      </HvAppShellRuntimeContext.Provider>
    </HvAppShellContext.Provider>
  );
};

export default AppShellProviderInner;
