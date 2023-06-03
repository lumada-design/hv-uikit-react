import { createContext, useEffect, useMemo, useState } from "react";
import { parseTheme, HvThemeStructure } from "@hitachivantara/uikit-styles";
import { HvThemeContext } from "@hitachivantara/uikit-react-shared";
import type { HvThemeContextValue } from "@hitachivantara/uikit-react-shared";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import createCache, { EmotionCache } from "@emotion/cache";
import { setElementAttrs } from "@core/utils";
import { HvTheme } from "@core/types";

export { HvThemeContext };
export type { HvThemeContextValue };

export const defaultCacheKey = "hv";

export const defaultEmotionCache = createCache({
  key: defaultCacheKey,
  prepend: true,
});

export const EmotionContext = createContext<{ cache: EmotionCache }>({
  cache: defaultEmotionCache,
});

interface HvThemeProviderProps {
  children: React.ReactNode;
  themes: (HvTheme | HvThemeStructure)[];
  theme: string;
  emotionCache: EmotionCache;
  colorMode: string;
  themeRootId?: string;
}

export const HvThemeProvider = ({
  children,
  themes: themesList,
  theme,
  emotionCache,
  colorMode,
  themeRootId,
}: HvThemeProviderProps) => {
  let pTheme = parseTheme(themesList, theme, colorMode);

  const [rootId] = useState<string | undefined>(themeRootId);
  const [activeTheme, setActiveTheme] = useState<HvTheme | HvThemeStructure>(
    pTheme.theme
  );
  const [selectedTheme, setSelectedTheme] = useState<string>(
    pTheme.selectedTheme
  );
  const [selectedMode, setThemeMode] = useState<string>(pTheme.selectedMode);
  const [colorModes, setColorModes] = useState<string[]>(pTheme.colorModes);
  const [themes, setThemes] = useState<string[]>(themesList.map((t) => t.name));

  useEffect(() => {
    setThemes(themesList.map((t) => t.name));
  }, [themesList]);

  const changeTheme = (newTheme = selectedTheme, newMode = selectedMode) => {
    pTheme = parseTheme(themesList, newTheme, newMode);

    setActiveTheme(pTheme.theme);
    setSelectedTheme(pTheme.selectedTheme);
    setThemeMode(pTheme.selectedMode);
    setColorModes(pTheme.colorModes);

    setElementAttrs(
      pTheme.selectedTheme,
      pTheme.selectedMode,
      pTheme.colorScheme,
      rootId
    );
  };

  useEffect(() => {
    changeTheme(theme, colorMode);
  }, [theme, colorMode]);

  const value = useMemo<HvThemeContextValue>(
    () => ({
      themes,
      colorModes,
      activeTheme: activeTheme as HvTheme,
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
        ...activeTheme.breakpoints.values,
      },
    },
  });

  const emotionCacheValue = useMemo(
    () => ({ cache: emotionCache }),
    [emotionCache]
  );

  return (
    <MuiThemeProvider theme={MuiTheme}>
      <HvThemeContext.Provider value={value}>
        <EmotionContext.Provider value={emotionCacheValue}>
          {children}
        </EmotionContext.Provider>
      </HvThemeContext.Provider>
    </MuiThemeProvider>
  );
};
