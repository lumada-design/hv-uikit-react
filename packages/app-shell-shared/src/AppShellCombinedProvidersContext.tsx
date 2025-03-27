import { createContext } from "react";

export interface HvAppShellCombinedProvidersContextValue {
  providers?: React.ComponentType<{
    children: React.ReactNode;
  }>[];
}

export const HvAppShellCombinedProvidersContext = createContext<
  HvAppShellCombinedProvidersContextValue | undefined
>(undefined);
