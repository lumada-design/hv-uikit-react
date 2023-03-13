import {
  HvThemeContext,
  HvThemeContextValue,
} from "../providers/ThemeProvider";
import { useContext } from "react";

export const useTheme = (): HvThemeContextValue => {
  return useContext(HvThemeContext);
};
