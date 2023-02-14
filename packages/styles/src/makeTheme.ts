import * as tokens from "./tokens";
import { theme } from "./theme";
import { mergeTheme } from "./utils";
import { CustomTheme, Theme, ThemeStructure } from "./types";

/**
 * Generate a theme base on the options received.
 * Takes an incomplete theme object and adds the missing parts.
 *
 * @param options The options to generate the theme
 * @returns The generated theme
 */
export const makeTheme = (
  options: CustomTheme | ((theme: Theme) => CustomTheme)
): ThemeStructure => {
  const opt: CustomTheme =
    typeof options === "function" ? options(theme) : options;

  const newTheme = mergeTheme(tokens, opt);

  return newTheme;
};
