import { createContext, useState, useMemo, useEffect } from "react";
import { themes, parseTheme } from "@hitachivantara/uikit-styles";

import { setElementAttrs } from "../utils/themeUtils";

interface ThemeContextValue {
  rootId?: string;
  selectedTheme: string;
  selectedMode: string;
  setTheme: (theme: string) => void;
  setThemeMode: (mode: string) => void;
  colorModes: string[];
}

export const ThemeContext = createContext<ThemeContextValue>({
  rootId: undefined,
  selectedTheme: "",
  selectedMode: "",
  setTheme: () => {},
  setThemeMode: () => {},
  colorModes: [],
});

type NavigationProviderProps = {
  children: React.ReactNode;
  rootElementId?: string;
};

const ThemeProvider = ({
  children,
  rootElementId,
}: NavigationProviderProps) => {
  let theme = parseTheme(themes);

  const [rootId] = useState(rootElementId);
  const [selectedTheme, setTheme] = useState(theme.selected);
  const [selectedMode, setThemeMode] = useState(theme.selectedMode);
  const [colorModes, setColorModes] = useState(theme.colorModes);

  useEffect(() => {
    theme = parseTheme(themes, selectedTheme, selectedMode);

    setThemeMode(theme.selectedMode);
    setColorModes(theme.colorModes);

    setElementAttrs(rootId, theme.selected, theme.selectedMode);
  }, [selectedTheme]);

  useEffect(() => {
    setElementAttrs(rootId, selectedTheme, selectedMode);
  }, [selectedMode]);

  const value = useMemo(
    () => ({
      selectedTheme,
      selectedMode,
      setTheme,
      setThemeMode,
      colorModes,
    }),
    [selectedTheme, selectedMode, setTheme, setThemeMode, colorModes]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
