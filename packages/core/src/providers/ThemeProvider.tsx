import {
  createContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { themes as hvThemes, parseThemes, toCSSVars } from "theme";

export const ThemeContext = createContext<ThemeContextValue>({
  themes: undefined,
  theme: undefined,
  setTheme: () => {},
  colorModes: [],
  colorMode: undefined,
  setColorMode: () => {},
  spacingFn: () => 0,
});

const ThemeProvider = ({ children }) => {
  const root = useRef<HTMLDivElement>(null);

  const { themesList, selectedTheme, colorModesList, selectedColorMode } =
    parseThemes(hvThemes);

  const [themes] = useState<string[]>(themesList);
  const [theme, setTheme] = useState<string>(selectedTheme);
  const [colorModes, setColorModes] = useState<string[]>(colorModesList);
  const [colorMode, setColorMode] = useState<string>(selectedColorMode);

  useEffect(() => {
    const {
      colorModesList: colorModesListUpdated,
      selectedColorMode: selectedColorModeUpdated,
    } = parseThemes(hvThemes, theme, colorMode);

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

    for (const [key, value] of Object.entries(vars)) {
      root.current?.style.setProperty(key, value as string);
    }
  }, [colorMode]);

  const spacingFn = useCallback(
    (m: number) => m * hvThemes[theme as string].spacing.base,
    [theme]
  );

  const value = useMemo(
    () => ({
      themes,
      theme,
      setTheme,
      colorModes,
      colorMode,
      setColorMode,
      spacingFn,
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
