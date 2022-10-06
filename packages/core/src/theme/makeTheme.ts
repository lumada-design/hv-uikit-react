import * as tokens from "./tokens";
import { mergeTheme } from "./utils";
import { themeVars } from "./themeVars";

export const makeTheme = <T extends object | ((themeVars: ThemeVars) => void)>(
  arg: T
): T => {
  const theme = typeof arg === "function" ? arg(themeVars) : arg;

  const { components, ...newTheme } = mergeTheme(
    tokens,
    theme,
    { ...theme.components } // flatten components
  );

  return newTheme;
};
