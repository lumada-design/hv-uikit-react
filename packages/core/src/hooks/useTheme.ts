import { useContext } from "react";
import {
  HvThemeContext,
  HvThemeContextValue,
} from "@core/providers/ThemeProvider";

export const useTheme = (): HvThemeContextValue => {
  return useContext(HvThemeContext);
};
