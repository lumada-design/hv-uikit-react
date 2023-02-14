import { createContext, useEffect, useMemo, useState } from "react";
import {
  BaseTheme,
  parseTheme,
  ThemeColorMode,
} from "@hitachivantara/uikit-styles";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { setElementAttrs } from "../utils";
import { HvCustomizedTheme } from "./Provider";

interface HvThemeContextValue {
  rootId?: string;
  activeTheme?: HvCustomizedTheme;
  selectedTheme: BaseTheme | string;
  selectedMode: ThemeColorMode | string;
  colorModes: (ThemeColorMode | string)[];
  themes: (BaseTheme | string)[];
  changeTheme: (
    theme: BaseTheme | string,
    mode: ThemeColorMode | string
  ) => void;
}

interface HvThemeProviderProps {
  children: React.ReactNode;
  themes: { [themeName: string]: HvCustomizedTheme };
  theme: BaseTheme | string;
  colorMode: ThemeColorMode | string;
  rootElementId?: string;
}

export const HvThemeContext = createContext<HvThemeContextValue>({
  rootId: undefined,
  activeTheme: undefined,
  selectedTheme: "",
  selectedMode: "",
  colorModes: [],
  themes: [],
  changeTheme: () => {},
});

export const HvThemeProvider = ({
  children,
  themes: availableThemes,
  theme,
  colorMode,
  rootElementId,
}: HvThemeProviderProps) => {
  const initTheme = availableThemes[theme]
    ? theme
    : Object.keys(availableThemes)[0];
  const initMode = availableThemes[initTheme].colors.modes[colorMode]
    ? colorMode
    : Object.keys(availableThemes[initTheme].colors.modes)[0];

  const [rootId] = useState<string | undefined>(rootElementId);
  const [selectedTheme, setTheme] = useState<string>(initTheme);
  const [selectedMode, setThemeMode] = useState<string>(initMode);
  const [colorModes, setColorModes] = useState<string[]>(
    Object.keys(availableThemes[initTheme].colors.modes)
  );
  const [themes, setThemes] = useState<string[]>(Object.keys(availableThemes));
  const [activeTheme, setActiveTheme] = useState<HvCustomizedTheme>(
    availableThemes[initTheme]
  );

  useEffect(() => {
    const parsedTheme = parseTheme(availableThemes, theme, colorMode);

    setThemes(Object.keys(availableThemes));
    setTheme(parsedTheme.selected);
    setThemeMode(parsedTheme.selectedMode);
    setColorModes(parsedTheme.colorModes);
    setActiveTheme(availableThemes[parsedTheme.selected]);
    setElementAttrs(
      parsedTheme.selected,
      parsedTheme.selectedMode,
      availableThemes[parsedTheme.selected].colors.modes[
        parsedTheme.selectedMode
      ].atmo2,
      rootId
    );
  }, [availableThemes, theme, colorMode]);

  const changeTheme = (
    newTheme: BaseTheme | string,
    newMode: ThemeColorMode | string
  ) => {
    if (newTheme !== selectedTheme && themes.includes(newTheme)) {
      const parsedTheme = parseTheme(availableThemes, newTheme, newMode);

      setTheme(parsedTheme.selected);
      setThemeMode(parsedTheme.selectedMode);
      setColorModes(parsedTheme.colorModes);
      setActiveTheme(availableThemes[parsedTheme.selected]);
      setElementAttrs(
        parsedTheme.selected,
        parsedTheme.selectedMode,
        availableThemes[parsedTheme.selected].colors.modes[
          parsedTheme.selectedMode
        ].atmo2,
        rootId
      );
    } else if (newMode !== selectedMode && colorModes.includes(newMode)) {
      setThemeMode(newMode);
      setElementAttrs(
        selectedTheme,
        newMode,
        availableThemes[selectedTheme].colors.modes[newMode].atmo2,
        rootId
      );
    }
  };

  const value = useMemo(
    () => ({
      activeTheme,
      selectedTheme,
      selectedMode,
      colorModes,
      themes,
      rootId,
      changeTheme,
    }),
    [
      activeTheme,
      selectedTheme,
      selectedMode,
      colorModes,
      themes,
      rootId,
      changeTheme,
    ]
  );

  const myTheme = createTheme({
    breakpoints: {
      values: {
        ...availableThemes[selectedTheme].breakpoints.values,
      },
    },
  });

  return (
    <MuiThemeProvider theme={myTheme}>
      <HvThemeContext.Provider value={value}>
        {children}
      </HvThemeContext.Provider>
    </MuiThemeProvider>
  );
};
