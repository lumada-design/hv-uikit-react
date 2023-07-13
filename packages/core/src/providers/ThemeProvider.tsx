import { useCallback, useEffect, useMemo, useState } from "react";
import { parseTheme, HvThemeStructure } from "@hitachivantara/uikit-styles";
import {
  HvThemeContext,
  defaultCacheKey,
  defaultEmotionCache,
  EmotionContext,
} from "@hitachivantara/uikit-react-shared";
import type { HvThemeContextValue } from "@hitachivantara/uikit-react-shared";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { EmotionCache } from "@emotion/cache";
import { setElementAttrs } from "@core/utils";
import { HvTheme } from "@core/types";

export { HvThemeContext };
export type { HvThemeContextValue };

export { defaultCacheKey, defaultEmotionCache, EmotionContext };

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
  themeRootId: rootId,
}: HvThemeProviderProps) => {
  const initTheme = parseTheme(themesList, theme, colorMode);

  const [parsedTheme, setParsedTheme] = useState(initTheme);
  const [activeTheme, setActiveTheme] = useState(parsedTheme.theme);
  const [selectedTheme, setSelectedTheme] = useState(parsedTheme.selectedTheme);
  const [selectedMode, setThemeMode] = useState(parsedTheme.selectedMode);
  const [colorModes, setColorModes] = useState(parsedTheme.colorModes);
  const [themes, setThemes] = useState(themesList.map((t) => t.name));

  useEffect(() => {
    const pTheme = parseTheme(themesList, theme, colorMode);
    setThemes(themesList.map((t) => t.name));
    setParsedTheme(pTheme);
  }, [themesList, theme, colorMode]);

  useEffect(() => {
    setActiveTheme(parsedTheme.theme);
    setSelectedTheme(parsedTheme.selectedTheme);
    setThemeMode(parsedTheme.selectedMode);
    setColorModes(parsedTheme.colorModes);

    setElementAttrs(
      parsedTheme.selectedTheme,
      parsedTheme.selectedMode,
      parsedTheme.colorScheme,
      rootId
    );
  }, [parsedTheme, rootId]);

  const changeTheme = useCallback(
    (newTheme = selectedTheme, newMode = selectedMode) => {
      const pTheme = parseTheme(themesList, newTheme, newMode);
      setParsedTheme(pTheme);
    },
    [selectedMode, selectedTheme, themesList]
  );

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
