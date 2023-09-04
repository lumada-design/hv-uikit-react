import * as tokens from "./tokens";
import { theme } from "./theme";
import { mergeTheme } from "./utils";
import type { HvCustomTheme, HvTheme, HvThemeStructure } from "./types";

/**
 * Generate a theme base on the options received.
 * Takes an incomplete theme object and adds the missing parts.
 *
 * @param options The options to generate the theme
 * @returns The generated theme
 */
export const makeTheme = (
  options: HvCustomTheme | ((theme: HvTheme) => HvCustomTheme)
): HvThemeStructure => {
  const customTheme = typeof options === "function" ? options(theme) : options;
  const newTheme = mergeTheme(tokens, customTheme);

  return newTheme;
};
