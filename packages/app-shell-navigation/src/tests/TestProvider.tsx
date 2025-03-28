import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  HvAppShellContext,
  HvAppShellRuntimeContext,
  useHvAppShellConfig,
} from "@hitachivantara/app-shell-shared";
// eslint-disable-next-line import/no-extraneous-dependencies
import { HvProvider } from "@hitachivantara/uikit-react-core";

import createI18Next, {
  addResourceBundles,
  CONFIG_TRANSLATIONS_NAMESPACE,
} from "./i18n";

interface TestProviderProps {
  children: React.ReactNode;
  bundles?: Record<string, object>;
}

const TestProvider = ({ children, bundles = {} }: TestProviderProps) => {
  const outerConfig = useHvAppShellConfig();
  const { i18n } = createI18Next();
  if (bundles) {
    addResourceBundles(i18n, bundles, CONFIG_TRANSLATIONS_NAMESPACE);
  }
  return useMemo(() => {
    return (
      <HvProvider>
        <HvAppShellRuntimeContext.Provider value={{ i18n }}>
          <HvAppShellContext.Provider value={outerConfig}>
            <ErrorBoundary fallback={<div>Generic Error</div>}>
              {children}
            </ErrorBoundary>
          </HvAppShellContext.Provider>
        </HvAppShellRuntimeContext.Provider>
      </HvProvider>
    );
  }, [children, i18n, outerConfig]);
};

export default TestProvider;
