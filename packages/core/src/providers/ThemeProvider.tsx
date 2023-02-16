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
import { setElementAttrs } from "utils";
import { HvCustomizedTheme } from "types/theme";

interface HvThemeContextValue {
  themes: (BaseTheme | string)[];
  activeTheme?: HvCustomizedTheme;
  colorModes: (ThemeColorMode | string)[];
  selectedTheme: BaseTheme | string;
  selectedMode: ThemeColorMode | string;
  changeTheme: (
    theme: BaseTheme | string,
    mode: ThemeColorMode | string
  ) => void;
  rootId?: string;
}

interface HvThemeProviderProps {
  children: React.ReactNode;
  themes: { [themeName: string]: HvCustomizedTheme };
  theme: BaseTheme | string;
  colorMode: ThemeColorMode | string;
  rootElementId?: string;
}

export const HvThemeContext = createContext<HvThemeContextValue>({
  themes: [],
  activeTheme: undefined,
  colorModes: [],
  selectedTheme: "",
  selectedMode: "",
  changeTheme: () => {},
  rootId: undefined,
});

export const HvThemeProvider = ({
  children,
  themes: themesList,
  theme,
  colorMode,
  rootElementId,
}: HvThemeProviderProps) => {
  let pTheme = parseTheme(themesList, theme, colorMode);

  const [rootId] = useState<string | undefined>(rootElementId);
  const [activeTheme, setActiveTheme] = useState<HvCustomizedTheme>(
    themesList[pTheme.selected]
  );
  const [selectedTheme, setSelectedTheme] = useState<string>(pTheme.selected);
  const [selectedMode, setThemeMode] = useState<string>(pTheme.selectedMode);
  const [colorModes, setColorModes] = useState<string[]>(pTheme.colorModes);
  const [themes] = useState<string[]>(Object.keys(themesList));

  const changeTheme = (newTheme = selectedTheme, newMode = selectedMode) => {
    pTheme = parseTheme(themesList, newTheme, newMode);

    setActiveTheme(themesList[pTheme.selected]);
    setSelectedTheme(pTheme.selected);
    setThemeMode(pTheme.selectedMode);
    setColorModes(pTheme.colorModes);

    setElementAttrs(
      pTheme.selected,
      pTheme.selectedMode,
      pTheme.bgColor,
      rootId
    );
  };

  useEffect(() => {
    changeTheme(theme, colorMode);
  }, [theme, colorMode]);

  const value = useMemo(
    () => ({
      themes,
      colorModes,
      activeTheme,
      selectedTheme,
      selectedMode,
      changeTheme,
      rootId,
    }),
    [
      themes,
      colorModes,
      activeTheme,
      selectedTheme,
      selectedMode,
      changeTheme,
      rootId,
    ]
  );

  const MuiTheme = createTheme({
    breakpoints: {
      values: {
        ...themesList[selectedTheme].breakpoints.values,
      },
    },
  });

  return (
    <MuiThemeProvider theme={MuiTheme}>
      <HvThemeContext.Provider value={value}>
        {children}
      </HvThemeContext.Provider>
    </MuiThemeProvider>
  );
};
