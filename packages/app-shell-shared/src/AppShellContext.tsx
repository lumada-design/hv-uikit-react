import { createContext } from "react";

import type { HvAppShellConfig } from "./types/Config";

export type HvAppShellContextValue = HvAppShellConfig;
export const HvAppShellContext = createContext<
  HvAppShellContextValue | undefined
>(undefined);
