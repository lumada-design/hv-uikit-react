import { createContext } from "react";

export interface HvAppShellViewContextValue {
  id: string;
}

export const HvAppShellViewContext = createContext<
  HvAppShellViewContextValue | undefined
>(undefined);
