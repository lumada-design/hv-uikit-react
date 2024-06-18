import * as tokens from "./tokens";
import type { HvColor, HvColorAny } from "./tokens";
import { palette } from "./tokens/colorsPalette";
import {
  DeepString,
  HvThemeComponents,
  HvThemeTypography,
  HvThemeTypographyProps,
  HvThemeVars,
  SpacingValue,
} from "./types";
import {
  hasMultipleArgs,
  mapCSSVars,
  spacingUtil,
  spacingUtilOld,
} from "./utils";

const componentsSpec: DeepString<HvThemeComponents> = {
  header: {
    height: "string",
    secondLevelHeight: "string",
  },
  bulkActions: {
    actionButtonVariant: "string",
  },
  table: {
    rowStripedBackgroundColorEven: "string",
    rowStripedBackgroundColorOdd: "string",
    rowExpandBackgroundColor: "string",
    rowSortedColor: "string",
    rowSortedColorAlpha: "string",
  },
  stepNavigation: {
    separatorMargin: "string",
    defaultSeparatorHeight: "string",
    simpleSeparatorHeight: "string",
  },
  filterGroup: {
    applyButtonVariant: "string",
    cancelButtonVariant: "string",
  },
  scrollTo: {
    dotSelectedSize: "string",
    backgroundColorOpacity: "string",
  },
  colorPicker: {
    hueDirection: "string",
  },
  snackbar: {
    actionButtonVariant: "string",
  },
};

const typographyProps: DeepString<HvThemeTypographyProps> = {
  color: "string",
  fontSize: "string",
  letterSpacing: "string",
  lineHeight: "string",
  fontWeight: "string",
  textDecoration: "string",
};

const typographySpec: DeepString<HvThemeTypography> = {
  typography: {
    // DS5
    display: { ...typographyProps },
    title1: { ...typographyProps },
    title2: { ...typographyProps },
    title3: { ...typographyProps },
    title4: { ...typographyProps },
    label: { ...typographyProps },
    body: { ...typographyProps },
    captionLabel: { ...typographyProps },
    caption1: { ...typographyProps },
    caption2: { ...typographyProps },
    // LEGACY UNMAPPABLE (DS3)
    "5xlTitle": { ...typographyProps },
    "4xlTitle": { ...typographyProps },
    xxlTitle: { ...typographyProps },
    lTitle: { ...typographyProps },
    sTitle: { ...typographyProps },
    xxsTitle: { ...typographyProps },
    sectionTitle: { ...typographyProps },
    placeholderText: { ...typographyProps },
    link: { ...typographyProps },
    disabledText: { ...typographyProps },
    selectedNavText: { ...typographyProps },
    vizTextDisabled: { ...typographyProps },
    xsInlineLink: { ...typographyProps },
  },
};

const colorTokens = {
  ...tokens.colors.common,
  ...tokens.colors.light,
};

const themeVars: HvThemeVars = mapCSSVars({
  ...tokens,
  colors: {
    type: "light",
    ...colorTokens,
  }, // Flatten colors and add background color
  ...componentsSpec,
  ...typographySpec,
});

const rgbVars = mapCSSVars({
  rgb: {
    ...colorTokens,
  },
});

/**
 * Utility function to generate spacing values from the theme.
 *
 * @example
 * theme.spacing(2) // 16px (2*8px)
 * theme.spacing("md", "inherit", "42px") // 24px inherit 42px
 */
const spacing = (...args: [SpacingValue[]] | SpacingValue[]) => {
  if (hasMultipleArgs(args)) {
    return args.map((arg) => spacingUtil(arg, themeVars)).join(" ");
  }

  const [value] = args;

  switch (typeof value) {
    case "number":
    case "string":
      return spacingUtil(value, themeVars);
    // TODO: remove in v6
    case "object":
      return value && value.length > 0
        ? value.map((val) => spacingUtilOld(val, themeVars)).join(" ")
        : "0px";
    default:
      return "0px";
  }
};

/**
 * Utility function to apply an alpha channel to a color from the theme.
 *
 * @example
 * theme.alpha("atmo1", 0.5) // rgb( R G B / 0.5)
 */
const alpha = (color: HvColor, factor: number | string) =>
  `rgb(${rgbVars.rgb[color]} / ${factor})`;

/**
 * UI Kit static theme object, containing values and utility functions that leverage the injected CSS variables.
 * @returns string values that can be used as CSS values.
 * @example
 * theme.colors.brand // "var(--uikit-colors-brand)"
 * theme.spacing("xs", "sm") // "var(--uikit-space-xs) var(--uikit-space-sm)"
 */
export const theme = {
  ...themeVars,
  palette,
  spacing,
  alpha,
};

export type HvTheme = typeof theme;

const getColorOrFallback = (color: HvColorAny | undefined) => {
  return (color && theme.colors[color as HvColor]) || color;
};

/** Get a `color` from the theme palette, or `fallbackColor` if not found */
export const getColor = (
  color: HvColorAny | undefined,
  fallbackColor?: HvColorAny,
) => getColorOrFallback(color) || getColorOrFallback(fallbackColor);
