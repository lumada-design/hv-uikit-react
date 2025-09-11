import { HvTheme, theme } from "./theme";
import { baseTheme } from "./tokens";
import { colors, HvThemeColors, type HvColorTokens } from "./tokens/colors";
import type { HvCustomTheme, HvThemeStructure } from "./types";
import { mergeTheme } from "./utils";

const getKey = (...keys: string[]) => keys.filter(Boolean).join("-");

/** Uses a Proxy to output the CSS Vars based on the `themeObject` */
const makeVarsProxy = (themeObject: Record<string, any>, parentKey = "") => {
  return new Proxy(themeObject, {
    get(target, prop) {
      if (prop === "vars" || typeof prop !== "string") return null;

      if (typeof target[prop] === "object" && target[prop] != null) {
        return makeVarsProxy(target[prop], getKey(parentKey, prop));
      }

      return `var(--${getKey("uikit", parentKey, prop)})`;
    },
  });
};

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

  // Add the vars proxy for accessing CSS variables
  newTheme.vars = makeVarsProxy(newTheme);

  return newTheme;
};

/** Compatibility object between UI Kit tokens and NEXT tokens */
const compatMap: Partial<Record<keyof HvColorTokens, keyof HvThemeColors>> = {
  // Most mappings are now direct since we simplified the color structure
  // Only keeping mappings for compatibility colors that still exist
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
        acc[0][key as keyof HvColorTokens] = lightColor;
      }
      if (darkColor) {
        acc[1][key as keyof HvColorTokens] = darkColor;
      }
      return acc;
    },
    [{}, {}] as [Partial<HvThemeColors>, Partial<HvThemeColors>],
  );

  return {
    light: {
      ...colors.light,
      ...extendCompatColors(lightColors),
      ...lightColors,
    },
    dark: {
      ...colors.dark,
      ...extendCompatColors(darkColors),
      ...darkColors,
    },
  };
};
