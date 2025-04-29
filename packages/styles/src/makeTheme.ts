import { HvTheme, theme } from "./theme";
import * as tokens from "./tokens";
import { colors, type ColorTokens } from "./tokens";
import type { HvCustomTheme, HvThemeColors, HvThemeStructure } from "./types";
import { mergeTheme } from "./utils";

/**
 * Generate a theme base on the options received.
 * Takes an incomplete theme object and adds the missing parts.
 *
 * @param options The options to generate the theme
 * @returns The generated theme
 */
export const makeTheme = <Mode extends string = string>(
  options: HvCustomTheme<Mode> | ((theme: HvTheme) => HvCustomTheme<Mode>),
): HvThemeStructure<Mode> => {
  const customTheme = typeof options === "function" ? options(theme) : options;
  const newTheme = mergeTheme(tokens, customTheme);

  return newTheme;
};

export const makeColors = (
  inputColors: Partial<Record<keyof HvThemeColors, [string, string] | string>>,
): HvCustomTheme<"dawn" | "wicked">["colors"] => {
  const [lightColors, darkColors] = Object.entries(inputColors).reduce(
    (acc, [key, color]) => {
      const [lightColor, darkColor] =
        typeof color === "string" ? [color, color] : color;

      if (lightColor) {
        acc[0][key as keyof ColorTokens] = lightColor;
      }
      if (darkColor) {
        acc[1][key as keyof ColorTokens] = darkColor;
      }
      return acc;
    },
    [{}, {}] as [Partial<HvThemeColors>, Partial<HvThemeColors>],
  );

  return {
    // TODO: review any number of modes vs light/dark only
    modes: {
      dawn: {
        type: "light",
        ...colors.common,
        ...colors.light,
        ...lightColors,
      },
      wicked: {
        type: "dark",
        ...colors.common,
        ...colors.dark,
        ...darkColors,
      },
    },
  };
};
