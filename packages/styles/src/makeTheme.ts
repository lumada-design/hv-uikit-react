import { HvTheme, theme } from "./theme";
import { baseTheme } from "./tokens";
import { colors, HvThemeColors, type ColorTokens } from "./tokens/colors";
import type { HvCustomTheme, HvThemeStructure } from "./types";
import { mergeTheme } from "./utils";

/**
 * Generate a theme base on the options received.
 * Takes an incomplete theme object and adds the missing parts.
 *
 * @param options The options to generate the theme
 * @returns The generated theme
 */
export const makeTheme = (
  options: HvCustomTheme | ((theme: HvTheme) => HvCustomTheme),
): HvThemeStructure => {
  const customTheme = typeof options === "function" ? options(theme) : options;
  const newTheme = mergeTheme(baseTheme, customTheme);

  return newTheme;
};

/** Compatibility object between UI Kit tokens and NEXT tokens */
const compatMap: Partial<Record<keyof ColorTokens, keyof HvThemeColors>> = {
  primaryStrong: "primary_80",
  primaryDimmed: "primary_20",
  positiveStrong: "positive_80",
  positiveDeep: "positive_120",
  positiveDimmed: "positive_20",
  warningStrong: "warning_120",
  warningDeep: "warning_140",
  warningDimmed: "warning_20",
  negativeStrong: "negative_80",
  negativeDeep: "negative_120",
  negativeDimmed: "negative_20",
  info: "neutral",
  infoDimmed: "neutral_20",

  text: "secondary",
  textSubtle: "secondary_80",
  textDisabled: "secondary_60",
  textDimmed: "atmo1",
  textLight: "base_light",
  textDark: "base_dark",

  bgHover: "primary_20",
  bgDisabled: "atmo3",
  bgPage: "atmo2",
  bgContainer: "atmo1",
  bgPageSecondary: "atmo3",
  border: "atmo4",
};

/** Adds the NEXT compatibility colors for a given palette. @example `bgPage` => `backgroundColor` => `atmo2` */
const extendCompatColors = (colors: Partial<HvThemeColors>) => {
  return Object.entries(colors).reduce((acc, [key, color]) => {
    const compatKey = compatMap[key as keyof typeof compatMap];
    if (compatKey) {
      acc[compatKey] = color;
    }
    return acc;
  }, {} as Partial<HvThemeColors>);
};

/**
 * Takes in a subset `HvThemeColors`, where the values can be the `[light,dark]` colors theme tuple,
 * or a single color for both light and dark modes.
 * @private @internal internal use only
 */
export const makeColors = (
  inputColors: Partial<Record<keyof HvThemeColors, [string, string] | string>>,
): HvCustomTheme["colors"] => {
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
    light: {
      ...colors.common,
      ...colors.light,
      ...extendCompatColors(lightColors),
      ...lightColors,
    },
    dark: {
      ...colors.common,
      ...colors.dark,
      ...extendCompatColors(darkColors),
      ...darkColors,
    },
  };
};
