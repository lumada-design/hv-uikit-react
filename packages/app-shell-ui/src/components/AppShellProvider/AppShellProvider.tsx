import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  extractConditionsMetadata,
  HvAppShellConfig,
  processConfig,
  useLoadAllConditionHooks,
} from "@hitachivantara/app-shell-shared";

import AppShellProviderInner from "./AppShellProviderInner";

interface AppShellProviderProps extends PropsWithChildren {
  config?: Partial<HvAppShellConfig>;
  configUrl?: string;
}

const AppShellProvider = ({
  children,
  config: localConfig,
  configUrl,
}: AppShellProviderProps) => {
  const [loadedConfig, setLoadedConfig] = useState<
    HvAppShellConfig | undefined
  >(undefined);
  const [hasError, setHasError] = useState<boolean>(false);

  // Load config from URL
  useEffect(() => {
    if (!localConfig && configUrl) {
      fetch(new URL(configUrl))
        .then((result) => result.json())
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

  const rawConfig = useMemo(
    () => localConfig ?? loadedConfig,
    [localConfig, loadedConfig],
  );

  // Store the config once it's loaded
  const [initialConfig, setInitialConfig] = useState<
    HvAppShellConfig | undefined
  >(undefined);

  useEffect(() => {
    if (rawConfig && !initialConfig) {
      setInitialConfig(rawConfig);
    }
  }, [rawConfig, initialConfig]);

  // Process config to add $key properties
  const processedConfig = useMemo(() => {
    if (!initialConfig) {
      return initialConfig;
    }

    return processConfig(initialConfig);
  }, [initialConfig]);

  // Extract metadata from processed config
  const metadata = useMemo(
    () => extractConditionsMetadata(processedConfig),
    [processedConfig],
  );

  // Create stable bundle list
  const bundleList = useMemo(() => metadata.map((m) => m.bundle), [metadata]);

  // Load all conditions
  const { hooks: loadedHooks, isLoading: isLoadingHooks } =
    useLoadAllConditionHooks(bundleList);

  if (hasError) {
    throw new Error("It was not possible to obtain the configuration");
  }

  // Wait for config and hooks to load
  if (!rawConfig || isLoadingHooks || !processedConfig) {
    return null;
  }

  // Check if any hooks failed to load (are null)
  const hasNullHooks = loadedHooks.includes(null);
  if (hasNullHooks) {
    console.error("Some conditions failed to load. Check console for errors.");
  }

  return (
    <AppShellProviderInner
      rawConfig={processedConfig}
      conditionHooks={loadedHooks}
      metadata={metadata}
    >
      {children}
    </AppShellProviderInner>
  );
};

export default AppShellProvider;
