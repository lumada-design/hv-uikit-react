import { createContext } from "react";

import { HvTheme } from "../types/theme";

type Mode = "light" | "dark";

export interface HvThemeContextValue {
  themes: string[];
  colorModes: string[];
  activeTheme?: HvTheme;
  selectedTheme: string;
  selectedMode: Mode;
  changeTheme: (theme?: string, mode?: Mode) => void;
  changeMode: (mode?: Mode) => void;
  rootId?: string;
}

export const HvThemeContext = createContext<HvThemeContextValue>({
  themes: [],
  activeTheme: undefined,
  colorModes: [],
  selectedTheme: "",
  selectedMode: "light",
  changeTheme: () => {},
  changeMode: () => {},
  rootId: undefined,
});
