import { createContext, useState, useRef, useMemo, useEffect } from "react";
import { Global } from "@emotion/react";
import { localThemes, parseThemes, toVars, cssReset } from "theme";

export const Context = createContext<ContextValue>({
  theme: undefined,
  setTheme: () => {},
  colorMode: undefined,
  setColorMode: () => {},
  themes: undefined,
  colorModes: undefined,
});

const Provider: React.FC<ProviderProps> = ({
  enableCssReset = true,
  children,
}) => {
  const {
    themes: themesList,
    theme: initialTheme,
    colorModes: colorModesList,
    colorMode: initialColorMode,
  } = parseThemes(localThemes);

  const [themes] = useState<string[]>(themesList);
  const [theme, setTheme] = useState<string>(initialTheme);
  const [colorModes, setColorModes] = useState<string[]>(colorModesList);
  const [colorMode, setColorMode] = useState<string>(initialColorMode);

  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { colorModes: updatedColorModes, colorMode: updatedColorMode } =
      parseThemes(localThemes, theme, colorMode);

    setColorModes(updatedColorModes);
    setColorMode(updatedColorMode);
  }, [theme]);

  useEffect(() => {
    const vars = toVars(localThemes[theme][colorMode]);
    for (const [key, value] of Object.entries(vars)) {
      root.current?.style.setProperty(key, value as string);
    }
  }, [colorMode]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      colorMode,
      setColorMode,
      themes,
      colorModes,
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
