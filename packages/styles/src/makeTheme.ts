import * as tokens from "./tokens";
import { theme } from "./theme";
import { mergeTheme } from "./utils";

type Theme = typeof theme;

/**
 * Generate a theme base on the options received.
 * Takes an incomplete theme object and adds the missing parts.
 *
 * @param options The options to generate the theme
 * @returns The generated theme
 */
export const makeTheme = <T extends object | ((theme: Theme) => void)>(
  options: T
): T => {
  const opt = typeof options === "function" ? options(theme) : options;

  const { components, ...newTheme } = mergeTheme(
    tokens,
    opt,
    { ...opt.components } // flatten components
  );

  return newTheme;
};
