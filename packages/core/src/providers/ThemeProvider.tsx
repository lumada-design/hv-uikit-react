import { createContext, useRef, useState, useEffect, useMemo } from "react";
import { hvThemes } from "theme";
import { parseTheme, toCSSVars, setCSSVars } from "theme/utils";

export const ThemeContext = createContext<ThemeContextValue>({
  themes: undefined,
  theme: undefined,
  setTheme: () => {},
  colorModes: [],
  colorMode: undefined,
  setColorMode: () => {},
});

const ThemeProvider = ({ children }) => {
  const root = useRef<HTMLDivElement>(null);

  const { themesList, selectedTheme, colorModesList, selectedColorMode } =
    parseTheme(hvThemes);

  const [themes] = useState<string[]>(themesList);
  const [theme, setTheme] = useState<string>(selectedTheme);
  const [colorModes, setColorModes] = useState<string[]>(colorModesList);
  const [colorMode, setColorMode] = useState<string>(selectedColorMode);

  useEffect(() => {
    const {
      colorModesList: colorModesListUpdated,
      selectedColorMode: selectedColorModeUpdated,
    } = parseTheme(hvThemes, theme, colorMode);

    setColorModes(colorModesListUpdated);
    setColorMode(selectedColorModeUpdated);
  }, [theme]);

  useEffect(() => {
    const vars = toCSSVars({
      ...hvThemes[theme as string],
      colors: {
        ...hvThemes[theme as string].colors.modes[colorMode],
      },
    });

    setCSSVars(root.current, vars);
  }, [colorMode]);

  const value = useMemo(
    () => ({
      themes,
      theme,
      setTheme,
      colorModes,
      colorMode,
      setColorMode,
    }),
    [theme, colorMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div ref={root}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
