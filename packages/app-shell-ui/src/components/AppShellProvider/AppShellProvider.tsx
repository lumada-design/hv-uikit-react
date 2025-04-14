import {
  ComponentType,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { I18nContext } from "react-i18next";
import {
  CONFIG_TRANSLATIONS_NAMESPACE,
  HvAppShellCombinedProvidersContext,
  HvAppShellConfig,
  HvAppShellContext,
  HvAppShellContextValue,
  HvAppShellRuntimeContext,
} from "@hitachivantara/app-shell-shared";
import {
  themes as baseThemes,
  HvProvider,
  HvProviderProps,
} from "@hitachivantara/uikit-react-core";

import useLocalStorage from "../../hooks/useLocalStorage";
import { addResourceBundles } from "../../i18n";

export type AppShellProviderProps = {
  children: ReactNode;
  config?: Partial<HvAppShellConfig>;
  configUrl?: string;
};

const AppShellProvider = ({
  children,
  config: localConfig,
  configUrl,
}: AppShellProviderProps) => {
  const { i18n } = useContext(I18nContext);
  const { value: storedColorModeValue } = useLocalStorage("COLOR_MODE");
  const [loadedConfig, setLoadedConfig] = useState<
    HvAppShellConfig | undefined
  >(undefined);

  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!localConfig && configUrl) {
      fetch(new URL(configUrl))
        .then((result) => {
          return result.json();
        })
        .then((data) => setLoadedConfig(data))
        .catch((e) => {
          console.error(
            `It was not possible to obtain the context from: ${configUrl}`,
            e,
          );
          setLoadedConfig(undefined);
          setHasError(true);
        });
    }
  }, [localConfig, configUrl]);

  const theConfig: HvAppShellContextValue | undefined = useMemo(
    () => localConfig ?? loadedConfig,
    [localConfig, loadedConfig],
  );

  if (hasError) {
    throw Error("It was not possible to obtain the configuration");
  }

  if (theConfig?.translations) {
    addResourceBundles(
      i18n,
      theConfig.translations,
      CONFIG_TRANSLATIONS_NAMESPACE,
    );
  }

  const [themes, setThemes] = useState<HvProviderProps["themes"]>(undefined);
  const [providers, setProviders] = useState<
    ComponentType<{ children: ReactNode }>[] | undefined
  >(undefined);

  useEffect(() => {
    if (theConfig?.theming?.themes) {
      Promise.all(
        theConfig.theming.themes?.map((bundle) => {
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
  }, [theConfig?.theming?.themes]);

  useEffect(() => {
    if (theConfig?.providers) {
      Promise.all(
        theConfig.providers.map((provider) => {
          return import(/* @vite-ignore */ provider.bundle)
            .then((module) => module.default)
            .catch((e) => {
              console.error(
                `Import of provider '${provider.bundle}' failed! ${e}`,
              );
            });
        }),
      )
        .then((loadedProviders) =>
          setProviders(loadedProviders.filter((provider) => !!provider)),
        )
        .catch((e) => {
          console.error(`Import of providers failed!`, e);
        });
    }
  }, [theConfig?.providers]);

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
    !theConfig ||
    (theConfig.theming?.themes && !themes) ||
    (theConfig.providers != null && providers === undefined)
  ) {
    return null;
  }

  return (
    <HvAppShellContext.Provider value={theConfig}>
      <HvAppShellRuntimeContext.Provider value={runtimeContext}>
        <HvProvider
          themes={themes}
          theme={theConfig.theming?.theme}
          colorMode={storedColorModeValue ?? theConfig.theming?.colorMode}
        >
          <HvAppShellCombinedProvidersContext.Provider value={providersContext}>
            {children}
          </HvAppShellCombinedProvidersContext.Provider>
        </HvProvider>
      </HvAppShellRuntimeContext.Provider>
    </HvAppShellContext.Provider>
  );
};

export default AppShellProvider;
