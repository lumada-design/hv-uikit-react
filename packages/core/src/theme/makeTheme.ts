import * as tokens from "./tokens";
import { mergeTheme } from "./utils";
import { themeVars } from "./themeVars";

export const makeTheme = (arg: any) => {
  const theme = typeof arg === "function" ? arg(themeVars) : arg;

  const { components, ...newTheme } = mergeTheme(
    tokens,
    theme,
    { ...theme.components } // flatten components
  );

  return newTheme;
};
