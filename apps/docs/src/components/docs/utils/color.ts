/**
 * Normalize a hex color string by removing the leading hash.
 */
const normalizeHex = (hex: string): string => hex.replace(/^#/, "");

/**
 * Converts a hex color string to its RGB components.
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const hexValue = normalizeHex(hex);
  const rgb = hexValue.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [
    0, 0, 0,
  ];
  const [r, g, b] = rgb;
  return { r, g, b };
};

/**
 * Calculates the relative luminance of a color based on WCAG standards.
 */
export const relativeLuminance = (hex: string): number => {
  const hexValue = normalizeHex(hex);
  const [r, g, b] = hexValue
    .match(/.{1,2}/g)
    ?.map((x) => parseInt(x, 16) / 255) ?? [0, 0, 0];

  const normalize = (c: number): number =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
};

/**
 * Calculates the contrast ratio between two colors based on WCAG standards.
 */
export const contrastRatio = (color1: string, color2: string): number => {
  const l1 = relativeLuminance(color1);
  const l2 = relativeLuminance(color2);
  const [lighter, darker] = [Math.max(l1, l2), Math.min(l1, l2)];
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Determines whether black or white text would be more accessible on a given background color.
 */
export const getAccessibleTextColor = (bgColor: string): string => {
  return contrastRatio(bgColor, "#FFFFFF") > contrastRatio(bgColor, "#000000")
    ? "#FFFFFF"
    : "#000000";
};

/**
 * Returns a WCAG accessibility rating for a given contrast ratio.
 * @param contrast - The contrast ratio.
 * @returns "AAA", "AA", or "Fail".
 */
export const getContrastRating = (contrast: number): "AAA" | "AA" | "Fail" => {
  if (contrast >= 7) return "AAA";
  if (contrast >= 4.5) return "AA";
  return "Fail";
};

/**
 * Groups color tokens by their prefix category.
 */
export const groupColorTokensByCategory = (
  colors: Record<string, string>,
): Record<string, { token: string; value: string }[]> => {
  const groups: Record<string, { token: string; value: string }[]> = {};

  Object.keys(colors).forEach((token) => {
    const match = token.match(/^[a-z]+/);
    const category = match ? match[0] : "misc";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push({ token, value: colors[token] });
  });

  return groups;
};
