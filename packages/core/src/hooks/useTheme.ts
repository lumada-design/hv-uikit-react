import { useContext } from "react";
import {
  HvThemeContext,
  HvThemeContextValue,
} from "../providers/ThemeProvider";

export const useTheme = (): HvThemeContextValue => {
  return useContext(HvThemeContext);
};
