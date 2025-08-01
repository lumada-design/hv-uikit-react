import { createContext } from "react";

import { HvTheme } from "../types/theme";

export interface HvThemeContextValue {
  themes: string[];
  colorModes: string[];
  activeTheme?: HvTheme;
  selectedMode: string;
  changeTheme: (theme?: string, mode?: string) => void;
  rootId?: string;
}

export const HvThemeContext = createContext<HvThemeContextValue>({
  themes: [],
  activeTheme: undefined,
  colorModes: [],
  selectedMode: "",
  changeTheme: () => {},
  rootId: undefined,
});
