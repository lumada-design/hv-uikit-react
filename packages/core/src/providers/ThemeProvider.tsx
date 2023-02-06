import { createContext, useEffect, useMemo, useState } from "react";
import { parseTheme, themes } from "@hitachivantara/uikit-styles";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { setElementAttrs } from "utils";

interface ThemeContextValue {
  rootId?: string;
  activeTheme: any;
  selectedTheme: string;
  selectedMode: string;
  setTheme: (theme: string) => void;
  setThemeMode: (mode: string) => void;
  colorModes: string[];
}

interface ThemeProviderProps {
  children: React.ReactNode;
  rootElementId?: string;
}

export const ThemeContext = createContext<ThemeContextValue>({
  rootId: undefined,
  activeTheme: {},
  selectedTheme: "",
  selectedMode: "",
  setTheme: () => {},
  setThemeMode: () => {},
  colorModes: [],
});

export const ThemeProvider = ({
  children,
  rootElementId,
}: ThemeProviderProps) => {
  let theme = parseTheme(themes);

  const [rootId] = useState(rootElementId);
  const [selectedTheme, setTheme] = useState(theme.selected);
  const [selectedMode, setThemeMode] = useState(theme.selectedMode);
  const [colorModes, setColorModes] = useState(theme.colorModes);

  const [activeTheme, setActiveTheme] = useState(themes[theme.selected]);

  useEffect(() => {
    theme = parseTheme(themes, selectedTheme, selectedMode);

    setThemeMode(theme.selectedMode);
    setColorModes(theme.colorModes);

    setActiveTheme(themes[selectedTheme]);

    setElementAttrs(rootId, theme.selected, theme.selectedMode);
  }, [selectedTheme]);

  useEffect(() => {
    setElementAttrs(rootId, selectedTheme, selectedMode);
  }, [selectedMode]);

  const value = useMemo(
    () => ({
      activeTheme,
      selectedTheme,
      selectedMode,
      setTheme,
      setThemeMode,
      colorModes,
      rootId,
    }),
    [
      activeTheme,
      selectedTheme,
      selectedMode,
      setTheme,
      setThemeMode,
      colorModes,
      rootId,
    ]
  );

  const myTheme = createTheme({
    breakpoints: {
      values: {
        ...themes[selectedTheme].breakpoints.values,
      },
    },
  });

  return (
    <MuiThemeProvider theme={myTheme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
