import { useCallback, useEffect, useMemo, useState } from "react";
import { EmotionCache } from "@emotion/cache";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import {
  defaultCacheKey,
  defaultEmotionCache,
  EmotionContext,
  HvThemeContext,
  type HvTheme,
  type HvThemeContextValue,
} from "@hitachivantara/uikit-react-shared";
import { HvThemeStructure, parseTheme } from "@hitachivantara/uikit-styles";

import { setElementAttrs } from "../utils/theme";

export { HvThemeContext };
export type { HvThemeContextValue };

export { defaultCacheKey, defaultEmotionCache, EmotionContext };

interface HvThemeProviderProps {
  children: React.ReactNode;
  themes: (HvTheme | HvThemeStructure)[];
  theme: string;
  emotionCache: EmotionCache;
  defaultColorMode: string;
  rootElement?: HTMLElement;
}

export const HvThemeProvider = ({
  children,
  themes: themesList,
  theme: themeProp,
  emotionCache,
  defaultColorMode,
  rootElement,
}: HvThemeProviderProps) => {
  const [theme, setTheme] = useState(themeProp);
  const [colorMode, setColorMode] = useState(defaultColorMode);

  const {
    theme: activeTheme,
    selectedTheme,
    selectedMode,
    colorModes,
    colorScheme,
  } = parseTheme(themesList, theme, colorMode);

  const themes = themesList.map((t) => t.name);

  useEffect(() => {
    if (!rootElement) return;
    setElementAttrs(rootElement, selectedTheme, selectedMode, colorScheme);
  }, [colorScheme, rootElement, selectedMode, selectedTheme]);

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
      rootElement,
    }),
    [
      themes,
      colorModes,
      activeTheme,
      selectedTheme,
      selectedMode,
      changeTheme,
      rootElement,
    ],
  );

  const muiTheme = useMemo(() => {
    const colors = activeTheme.colors.modes[colorMode];
    return createTheme({
      colorSchemes: { light: true, dark: true },
      spacing: activeTheme.space.base,
      typography: {
        fontFamily: activeTheme.fontFamily.body,
      },
      palette: {
        primary: { main: colors.primary },
        success: { main: colors.positive },
        warning: { main: colors.warning },
        error: { main: colors.negative },
        info: { main: colors.info },
        text: {
          primary: colors.text,
          secondary: colors.textSubtle,
          disabled: colors.textDisabled,
        },
        background: {
          default: colors.bgPage,
          paper: colors.bgContainer,
        },
        divider: colors.border,
        action: {
          active: colors.primary,
          hover: colors.primaryStrong,
          selected: colors.primaryStrong,
          disabled: colors.textDisabled,
          disabledBackground: colors.bgDisabled,
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
