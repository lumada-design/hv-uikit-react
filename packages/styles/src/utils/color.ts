import { themeVars } from "../theme/base";
import { HvColor, HvColorAny } from "../types/theme";

/**
 * Gets a color from the theme palette or falls back to a secondary value.
 *
 * @example
 * getColor("cat1", "#ccc") → "var(--uikit-colors-cat1)" or "#ccc"
 */
export const getColor = (
  color?: HvColorAny,
  fallbackColor?: HvColorAny,
): string | undefined => {
  return getColorOrFallback(color) || getColorOrFallback(fallbackColor);
};

/**
 * Retrieves a theme color if it exists, otherwise returns the raw value.
 */
const getColorOrFallback = (color?: HvColorAny): string | undefined => {
  return themeVars.colors?.[color as HvColor] ?? color;
};

/**
 * Mixes two colors using CSS `color-mix`.
 * Can blend theme tokens or raw CSS colors.
 *
 * @example
 * mix("atmo1", 0.7) → 70% atmo1, 30% transparent
 * mix("cat1", "60%", "orange") → 60% cat1, 40% orange
 */
export const mix = (
  color1: HvColorAny,
  factor: string | number,
  color2: HvColorAny = "transparent",
): string => {
  const percent = typeof factor === "number" ? `${factor * 100}%` : factor;
  return `color-mix(in srgb, ${getColor(color1)} ${percent}, ${getColor(color2)})`;
};

/**
 * Applies an alpha channel to a theme color using `color-mix`.
 *
 * @example
 * alpha("warning", 0.5) → 50% warning color blended with transparency
 */
export const alpha = (color: HvColorAny, factor: number | string): string =>
  mix(color, factor);
