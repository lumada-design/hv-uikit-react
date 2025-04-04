import { createContext, useContext } from "react";

export interface HvAppShellCombinedProvidersContextValue {
  providers?: React.ComponentType<{
    children: React.ReactNode;
  }>[];
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
