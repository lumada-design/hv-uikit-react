import {
  createContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  themes as hvThemes,
  parseThemes,
  toCSSVars,
  setSpacingVars,
} from "theme";

export const ThemeContext = createContext<ThemeContextValue>({
  themes: undefined,
  theme: undefined,
  setTheme: () => {},
  colorModes: [],
  colorMode: undefined,
  setColorMode: () => {},
  spacing: () => 0,
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

    setSpacingVars(hvThemes[theme as string].spacing.base, root.current);
    setColorModes(colorModesListUpdated);
    setColorMode(selectedColorModeUpdated);
  }, [theme]);

  const spacing = useCallback(
    (factor: number) => factor * hvThemes[theme as string].spacing.base,
    [theme]
  );

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

  const value = useMemo(
    () => ({
      themes,
      theme,
      setTheme,
      colorModes,
      colorMode,
      setColorMode,
      spacing,
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
