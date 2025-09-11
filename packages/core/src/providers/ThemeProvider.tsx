import { useEffect, useMemo, useState } from "react";
import { EmotionCache } from "@emotion/cache";
import {
  createTheme as createMuiTheme,
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
import {
  HvThemeColorMode,
  HvThemeStructure,
} from "@hitachivantara/uikit-styles";

import { getContainerElement } from "../utils/document";
import { setElementAttrs } from "../utils/theme";

export { HvThemeContext };
export type { HvThemeContextValue };

export { defaultCacheKey, defaultEmotionCache, EmotionContext };

interface HvThemeProviderProps {
  children: React.ReactNode;
  theme: HvTheme | HvThemeStructure;
  emotionCache: EmotionCache;
  colorMode: HvThemeColorMode;
  themeRootId?: string;
}

export const HvThemeProvider = ({
  children,
  theme,
  emotionCache,
  colorMode: colorModeProp,
  themeRootId: rootId,
}: HvThemeProviderProps) => {
  const [colorMode, setColorMode] = useState(colorModeProp);

  // review in v6 so that theme/colorMode isn't both controlled & uncontrolled
  useEffect(() => {
    setColorMode(colorModeProp);
  }, [colorModeProp]);

  useEffect(() => {
    const element = getContainerElement(rootId);
    if (!element) return;
    setElementAttrs(element, theme.name, colorMode);
  }, [colorMode, rootId, theme.name]);

  const value = useMemo<HvThemeContextValue>(
    () => ({
      colorModes: ["light", "dark"],
      activeTheme: theme as HvTheme,
      selectedMode: colorMode,
      changeMode(newMode = colorMode) {
        setColorMode(newMode);
      },
      rootId,
    }),
    [theme, colorMode, rootId],
  );

  const muiTheme = useMemo(() => {
    const colors = theme.colors[colorMode] || theme.colors.light || {};

    return createMuiTheme({
      colorSchemes: { light: true, dark: true },
      spacing: theme.space.base,
      typography: {
        fontFamily: theme.fontFamily.body,
      },
      palette: {
        primary: { main: colors.primary || "#007acc" },
        success: { main: colors.positive || "#4caf50" },
        warning: { main: colors.warning || "#ff9800" },
        error: { main: colors.negative || "#f44336" },
        info: { main: colors.info || "#2196f3" },
        text: {
          primary: colors.text || "#000000",
          secondary: colors.textSubtle || "#666666",
          disabled: colors.textDisabled || "#999999",
        },
        background: {
          default: colors.bgPage || "#ffffff",
          paper: colors.bgContainer || "#ffffff",
        },
        divider: colors.border || "#e0e0e0",
        action: {
          active: colors.primary || "#007acc",
          hover: colors.primaryStrong || "#005a9e",
          selected: colors.primaryStrong || "#005a9e",
          disabled: colors.textDisabled || "#999999",
          disabledBackground: colors.bgDisabled || "#f5f5f5",
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
      breakpoints: theme.breakpoints,
    });
  }, [theme, colorMode]);

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
