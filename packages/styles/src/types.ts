import type { StandardProperties } from "csstype";

import type { HvThemeBreakpoints } from "./tokens/breakpoints";
import type { HvThemeColors } from "./tokens/colors";
import type { HvThemeRadii } from "./tokens/radii";
import { sizes } from "./tokens/sizes";
import { HvThemeSpace, space } from "./tokens/space";
import {
  fontFamily,
  fontSizes,
  fontWeights,
  lineHeights,
} from "./tokens/typography";
import { zIndices } from "./tokens/zIndices";

interface CSSProperties extends StandardProperties<string | number> {}

/** @experimental extendable theme spacing units */
export interface HvThemeZIndices
  extends Record<keyof typeof zIndices, number> {}

/** UI Kit static theme tokens */
export interface HvThemeTokens {
  breakpoints: HvThemeBreakpoints;
  colors: { type: HvThemeColorModeType } & HvThemeColors;
  radii: HvThemeRadii;
  space: HvThemeSpace;
  /** @deprecated use `theme.space` or the direct value instead */
  sizes: typeof sizes;
  // #region typography
  fontFamily: typeof fontFamily;
  fontSizes: typeof fontSizes;
  fontWeights: typeof fontWeights;
  lineHeights: typeof lineHeights;
  // #endregion
  zIndices: HvThemeZIndices;
}

/** Theme components props */
export interface HvThemeComponentsProps {
  /** Component properties to override */
  components?: Record<string, Record<string, any>>;
  /** Record of icon names and their path, to override the default icons */
  icons?: Record<string, string | string[]> & { viewBox: string };
}

/** Theme components */
export interface HvThemeComponents {
  header: {
    height: string;
    secondLevelHeight: string;
  };
  form: {
    errorColor: string;
  };
  bulkActions: {
    actionButtonVariant: string;
  };
  /** @deprecated unused */
  table: {
    rowStripedBackgroundColorEven: string;
    rowStripedBackgroundColorOdd: string;
    rowExpandBackgroundColor: string;
    rowSortedColor: string;
    rowSortedColorAlpha: string;
  };
  stepNavigation: {
    separatorMargin: string;
    defaultSeparatorHeight: number;
    simpleSeparatorHeight: number;
  };
  filterGroup: {
    applyButtonVariant: string;
    cancelButtonVariant: string;
  };
  scrollTo: {
    dotSelectedSize: number;
    backgroundColorOpacity: number;
  };
  colorPicker: {
    hueDirection: "vertical" | "horizontal";
  };
  snackbar: {
    actionButtonVariant: string;
  };
}

// Theme typography
// TODO: remove in favor of `CSSProperties` when supported
export interface HvThemeTypographyProps
  extends Pick<
    CSSProperties,
    | "color"
    | "fontSize"
    | "letterSpacing"
    | "lineHeight"
    | "fontWeight"
    | "textDecoration"
  > {}

type TypographyVariants =
  | "display"
  | "title1"
  | "title2"
  | "title3"
  | "title4"
  | "label"
  | "body"
  | "captionLabel"
  | "caption1"
  | "caption2"
  | (string & {});

export interface HvThemeTypography {
  typography: Record<TypographyVariants, HvThemeTypographyProps>;
}

// Breakpoints
export type HvThemeBreakpoint = Exclude<keyof typeof space, "base">;

export type SpacingValue = number | HvThemeBreakpoint | (string & {});

// Base themes: DS3 and DS5
export type HvBaseTheme = "ds3" | "ds5" | "pentahoPlus";

// Theme color modes
export type HvThemeColorMode = "dawn" | "wicked";

// Theme color mode type
export type HvThemeColorModeType = "light" | "dark";

// Theme color mode structure
export interface HvThemeColorModeStructure
  extends HvThemeColors,
    Record<string, string> {
  type: HvThemeColorModeType;
}

/** Complete theme structure and values */
export interface HvThemeStructure<Mode extends string = string>
  extends HvThemeComponents,
    HvThemeComponentsProps,
    HvThemeTypography,
    Omit<HvThemeTokens, "colors"> {
  name: string;
  base: HvBaseTheme;
  colors: {
    modes: Record<Mode, HvThemeColorModeStructure>;
  };
}

// Custom theme
export interface HvCustomTheme<Mode extends string = string>
  extends DeepPartial<Omit<HvThemeStructure<Mode>, "base">> {}

// Deep string: set all props to strings
export type DeepString<T> = {
  [P in keyof T]: T[P] extends object ? DeepString<T[P]> : string;
};

type DeepPartial<T> = T extends {}
  ? Partial<{ [P in keyof T]: DeepPartial<T[P]> }>
  : T;

// Theme CSS vars
export interface HvThemeVars
  extends DeepString<HvThemeTokens>,
    DeepString<HvThemeComponents>,
    DeepString<HvThemeTypography> {}
