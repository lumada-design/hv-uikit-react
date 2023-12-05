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
export const makeTheme = <Mode extends string = string>(
  options: HvCustomTheme<Mode> | ((theme: HvTheme) => HvCustomTheme<Mode>)
): HvThemeStructure<Mode> => {
  const customTheme = typeof options === "function" ? options(theme) : options;
  const newTheme = mergeTheme(tokens, customTheme);

  return newTheme;
};
