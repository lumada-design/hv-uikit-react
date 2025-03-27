import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import {
  CONFIG_TRANSLATIONS_NAMESPACE,
  HvAppShellContext,
  HvAppShellRuntimeContext,
  useHvAppShellConfig,
} from "@hitachivantara/app-shell-shared";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { addResourceBundles, createI18Next } from "./i18n";

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
              <BrowserRouter basename="/">{children}</BrowserRouter>
            </ErrorBoundary>
          </HvAppShellContext.Provider>
        </HvAppShellRuntimeContext.Provider>
      </HvProvider>
    );
  }, [children, i18n, outerConfig]);
};

export default TestProvider;
