import { createContext } from "react";

import { HvTheme } from "../types/theme";

export interface HvThemeContextValue {
  themes: string[];
  colorModes: string[];
  activeTheme?: HvTheme;
  selectedTheme: string;
  selectedMode: string;
  changeTheme: (theme?: string, mode?: string) => void;
  rootElement?: HTMLElement;
}

export const HvThemeContext = createContext<HvThemeContextValue>({
  themes: [],
  activeTheme: undefined,
  colorModes: [],
  selectedTheme: "",
  selectedMode: "",
  changeTheme: () => {},
  rootElement: undefined,
});
