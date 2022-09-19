import { createContext, useState, useRef, useMemo, useEffect } from "react";
import { Global } from "@emotion/react";
import { themes as hvThemes, parseThemes, toVars, cssReset } from "theme";

export const Context = createContext<ProviderContextValue>({
  themes: [],
  theme: "",
  setTheme: () => {},
  colorModes: [],
  colorMode: "",
  setColorMode: () => {},
});

const Provider: React.FC<ProviderProps> = ({
  enableCssReset = true,
  children,
}) => {
  const { themesList, selectedTheme, colorModesList, selectedColorMode } =
    parseThemes(hvThemes);

  const [themes] = useState<string[]>(themesList);
  const [theme, setTheme] = useState<string>(selectedTheme);
  const [colorModes, setColorModes] = useState<string[]>(colorModesList);
  const [colorMode, setColorMode] = useState<string>(selectedColorMode);

  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const {
      colorModesList: colorModesListUpdated,
      selectedColorMode: selectedColorModeUpdated,
    } = parseThemes(hvThemes, theme, colorMode);

    setColorModes(colorModesListUpdated);
    setColorMode(selectedColorModeUpdated);
  }, [theme]);

  useEffect(() => {
    const vars = toVars({
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
    }),
    [theme, colorMode]
  );

  return (
    <Context.Provider value={value}>
      {enableCssReset && <Global styles={cssReset} />}
      <div ref={root}>{children}</div>
    </Context.Provider>
  );
};

export default Provider;
