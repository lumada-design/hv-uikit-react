import * as tokens from "./tokens";
import type { HvColor, HvColorAny } from "./tokens";
import { breakpoints, type HvBreakpoints } from "./tokens/breakpoints";
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
  form: {
    errorColor: "string",
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

function getColorOrFallback(color?: HvColorAny) {
  return themeVars.colors[color as HvColor] || color;
}

/** Get a `color` from the theme palette, or `fallbackColor` if not found */
export function getColor(color?: HvColorAny, fallbackColor?: HvColorAny) {
  return getColorOrFallback(color) || getColorOrFallback(fallbackColor);
}

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
 * Utility function to mix two colors. Accepts theme and CSS colors.
 *
 * @example
 * theme.mix("atmo1", 0.7) // 70% atmo1, 30% transparent
 * theme.mix("cat1", "60%", "orange") // 60% cat1, 30% orange
 */
const mix = (
  color1: HvColorAny,
  factor: string | number,
  color2: HvColorAny = "transparent",
) => {
  const percent = typeof factor === "number" ? `${factor * 100}%` : factor;
  return `color-mix(in srgb, ${getColor(color1)} ${percent}, ${getColor(color2)})`;
};

/**
 * Utility function to apply an alpha channel to a color from the theme.
 *
 * @example
 * theme.alpha("warning", 0.5) // rgb( R G B / 0.5)
 */
const alpha = (color: HvColorAny, factor: number | string) =>
  mix(color, factor);

function makeBreakpointUtils() {
  const nextBreakpoint = {
    xs: "sm",
    sm: "md",
    md: "lg",
    lg: "xl",
    xl: undefined,
  } as const;

  const { values, unit, step } = breakpoints;
  const step0 = step / 100;

  return {
    up(breakpoint: HvBreakpoints) {
      return `@media (min-width:${values[breakpoint]}${unit})`;
    },
    down(breakpoint: HvBreakpoints) {
      return `@media (max-width:${values[breakpoint] - step0}${unit})`;
    },
    between(start: HvBreakpoints, end?: HvBreakpoints) {
      const endValue = end ? values[end] - step0 : 9999;
      return `@media (min-width:${values[start]}${unit}) and (max-width:${endValue}${unit})`;
    },
    only(breakpoint: HvBreakpoints) {
      return this.between(breakpoint, nextBreakpoint[breakpoint]);
    },
  };
}

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
  mix,
  bp: makeBreakpointUtils(),
};

export type HvTheme = typeof theme;
