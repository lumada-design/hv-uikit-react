import { useCallback, useEffect, useMemo, useState } from "react";
import { EmotionCache } from "@emotion/cache";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import {
  defaultCacheKey,
  defaultEmotionCache,
  EmotionContext,
  HvThemeContext,
  type HvThemeContextValue,
} from "@hitachivantara/uikit-react-shared";
import { HvThemeStructure, parseTheme } from "@hitachivantara/uikit-styles";

import { HvTheme } from "../types/theme";
import { setElementAttrs } from "../utils/theme";

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
  theme: themeProp,
  emotionCache,
  colorMode: colorModeProp,
  themeRootId: rootId,
}: HvThemeProviderProps) => {
  const [theme, setTheme] = useState(themeProp);
  const [colorMode, setColorMode] = useState(colorModeProp);

  const {
    theme: activeTheme,
    selectedTheme,
    selectedMode,
    colorModes,
    colorScheme,
  } = parseTheme(themesList, theme, colorMode);

  const themes = themesList.map((t) => t.name);

  // review in v6 so that theme/colorMode isn't both controlled & uncontrolled
  useEffect(() => {
    setTheme(themeProp);
    setColorMode(colorModeProp);
  }, [colorModeProp, themeProp]);

  useEffect(() => {
    setElementAttrs(selectedTheme, selectedMode, colorScheme, rootId);
  }, [colorScheme, rootId, selectedMode, selectedTheme]);

  const changeTheme = useCallback(
    (newTheme = selectedTheme, newMode = selectedMode) => {
      setTheme(newTheme);
      setColorMode(newMode);
    },
    [selectedMode, selectedTheme],
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
    ],
  );

  const muiTheme = useMemo(() => {
    const colors = activeTheme.colors.modes[colorMode];
    return createTheme({
      spacing: activeTheme.space.base,
      typography: {
        fontFamily: activeTheme.fontFamily.body,
      },
      palette: {
        primary: { main: colors.primary },
        success: { main: colors.positive },
        warning: { main: colors.warning },
        error: { main: colors.negative },
        info: { main: colors.primary },
        text: {
          primary: colors.secondary,
          secondary: colors.secondary_80,
          disabled: colors.secondary_60,
        },
        background: {
          default: colors.atmo2,
          paper: colors.atmo1,
        },
        divider: colors.atmo4,
        action: {
          active: colors.primary,
          hover: colors.primary_80,
          selected: colors.primary_80,
          disabled: colors.secondary_60,
          disabledBackground: colors.atmo3,
        },
      },
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
      },
      breakpoints: activeTheme.breakpoints,
    });
  }, [activeTheme, colorMode]);

  const emotionCacheValue = useMemo(
    () => ({ cache: emotionCache }),
    [emotionCache],
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <HvThemeContext.Provider value={value}>
        <EmotionContext.Provider value={emotionCacheValue}>
          {children}
        </EmotionContext.Provider>
      </HvThemeContext.Provider>
    </MuiThemeProvider>
  );
};
