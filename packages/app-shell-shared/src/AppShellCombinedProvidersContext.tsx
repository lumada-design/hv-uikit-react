import {
  createContext,
  useContext,
  type ComponentType,
  type ReactNode,
} from "react";

export interface HvAppShellCombinedProvidersContextValue {
  providers?: Array<{
    component: ComponentType<{
      children: ReactNode;
    }>;
    config?: Record<string, unknown>;
  }>;
}

export const HvAppShellCombinedProvidersContext = createContext<
  HvAppShellCombinedProvidersContextValue | undefined
>(undefined);

export const useHvAppShellCombinedProviders =
  (): HvAppShellCombinedProvidersContextValue => {
    return useContext(
      HvAppShellCombinedProvidersContext,
    ) as HvAppShellCombinedProvidersContextValue;
  };
