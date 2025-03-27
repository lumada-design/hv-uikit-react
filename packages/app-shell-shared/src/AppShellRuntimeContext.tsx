import { createContext } from "react";
import type { i18n } from "i18next";

export interface HvAppShellRuntimeContextValue {
  i18n: i18n;
}

export const HvAppShellRuntimeContext = createContext<
  HvAppShellRuntimeContextValue | undefined
>(undefined);
