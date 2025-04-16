import { baseTheme, theme } from "../theme/base";
import type { HvCustomTheme, HvTheme, HvThemeStructure } from "../types/theme";
import { isObject } from "./common";
import { toCSSVars } from "./cssVars";

/**
 * Deeply merges multiple theme-like objects.
 * Later values override earlier ones.
 */
export const mergeTheme = (...objects: Record<string, any>[]): any => {
  return objects.reduce((acc, obj) => {
    for (const key in obj) {
      const a = acc[key];
      const b = obj[key];
      acc[key] = isObject(a) && isObject(b) ? mergeTheme(a, b) : (b ?? a);
    }
    return acc;
  }, {});
};

/**
 * Generates a complete theme structure by merging a base theme
 * with a custom theme or a theme factory function.
 */
export const makeTheme = <Mode extends string = string>(
  options: HvCustomTheme<Mode> | ((theme: HvTheme) => HvCustomTheme<Mode>),
): HvThemeStructure<Mode> => {
  const customTheme = typeof options === "function" ? options(theme) : options;
  return mergeTheme(baseTheme, customTheme);
};

/**
 * Converts structured themes into a map of scoped CSS variable sets.
 * Keys follow `[data-theme="..."][data-color-mode="..."]` convention.
 */
export const getThemesVars = (
  themes: HvThemeStructure[],
): Record<string, any> => {
  const vars: Record<string, any> = {};

  for (const theme of themes) {
    const { name, colors, ...rest } = theme;

    for (const mode of Object.keys(colors.modes)) {
      const colorMode = colors.modes[mode];

      // Scoped selector for color-mode-specific variables
      const modeSelector = `[data-theme="${name}"][data-color-mode="${mode}"]`;
      vars[modeSelector] = toCSSVars({ colors: { ...colorMode } });

      // Base selector without color-mode, for shared structure variables
      const themeSelector = `[data-theme="${name}"]`;
      vars[themeSelector] = toCSSVars({ ...rest });
    }
  }

  return vars;
};

/**
 * Applies the selected theme and mode to a DOM element (defaults to `<html>`).
 * Sets CSS variables, theme data attributes, and fallback inline styles.
 */
export const applyTheme = (
  theme: HvThemeStructure,
  mode: string,
  elementId?: string,
) => {
  const element = getTargetElement(elementId);
  if (!element) return;

  element.setAttribute(`data-theme`, theme.name);
  element.setAttribute(`data-color-mode`, mode);

  // set default styles for child components to inherit
  element.classList.add(`uikit-root-element`);
  element.style.colorScheme = theme.colors.modes[mode].type;
};

/**
 * Returns a theme by name from a list of themes.
 * If no match is found, returns the first theme.
 */
export const getTheme = (themes: HvThemeStructure[], themeName?: string) => {
  return (
    themes.find(
      ({ name }) => name.toLowerCase() === themeName?.toLowerCase(),
    ) || themes[0]
  );
};

/**
 * Returns a valid mode name from a theme.
 * Defaults to the first mode if not found.
 */
export const getMode = (theme: HvThemeStructure, modeName?: string) => {
  return (
    (modeName && modeName in theme.colors.modes && modeName) ||
    Object.keys(theme.colors.modes)[0]
  );
};

/**
 * Resolves the DOM element to apply theme styles to.
 * Defaults to the <body> element.
 */
const getTargetElement = (elementId?: string): HTMLElement | null => {
  const element = elementId
    ? document.getElementById(elementId)
    : document.body;

  if (!element) {
    console.error(
      `Target element "${elementId}" not found. Falling back to <html>.`,
    );
  }

  return element;
};
