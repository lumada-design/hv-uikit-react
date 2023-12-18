import { useContext, useMemo } from "react";
import { HvTheme } from "@hitachivantara/uikit-react-shared";

import {
  HvThemeContext,
  HvThemeContextValue,
} from "../providers/ThemeProvider";

export const useTheme = (): HvThemeContextValue & {
  /** Colors of the currently active theme and mode */
  colors?: HvTheme["colors"]["modes"]["mode"];
} => {
  const context = useContext(HvThemeContext);

  return useMemo(() => {
    const { activeTheme, selectedMode } = context;
    return { ...context, colors: activeTheme?.colors.modes?.[selectedMode] };
  }, [context]);
};
