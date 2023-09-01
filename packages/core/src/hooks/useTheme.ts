import { useContext, useMemo } from "react";
import { HvThemeColorModeStructure } from "@hitachivantara/uikit-styles";
import {
  HvThemeContext,
  HvThemeContextValue,
} from "@core/providers/ThemeProvider";

export const useTheme = (): HvThemeContextValue & {
  /** Colors of the currently active theme and mode */
  colors?: HvThemeColorModeStructure;
} => {
  const context = useContext(HvThemeContext);

  return useMemo(() => {
    const { activeTheme, selectedMode } = context;
    return { ...context, colors: activeTheme?.colors.modes?.[selectedMode] };
  }, [context]);
};
