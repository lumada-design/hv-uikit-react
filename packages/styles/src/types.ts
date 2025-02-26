import type { StandardProperties } from "csstype";

import * as tokens from "./tokens";
import { colors } from "./tokens/colors";

// Theme tokens
const flattenTokens = {
  ...tokens,
  colors: {
    type: "light",
    ...tokens.colors.common,
    ...tokens.colors.light,
  },
};

interface CSSProperties extends StandardProperties<string | number> {}

export type HvThemeTokens = typeof flattenTokens;

/** Theme components props */
export type HvThemeComponentsProps<ComponentNames extends string = string> = {
  /** Component properties to override */
  components?: Record<ComponentNames, Record<string, any>>;
};

/** Theme components */
export type HvThemeComponents = {
  header: {
    height: string;
    secondLevelHeight: string;
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
};

// Theme typography
// TODO: allow arbitrary `CSSProperties` overrides
export type HvThemeTypographyProps = Pick<
  CSSProperties,
  | "color"
  | "fontSize"
  | "letterSpacing"
  | "lineHeight"
  | "fontWeight"
  | "textDecoration"
>;

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

export type HvThemeTypography = {
  typography: Record<TypographyVariants, HvThemeTypographyProps>;
};

// Breakpoints
export type HvThemeBreakpoint = Exclude<keyof typeof tokens.space, "base">;

export type SpacingValue = number | HvThemeBreakpoint | (string & {});

// Theme colors
export type HvThemeColors = typeof colors.common &
  Omit<typeof colors.light, "pp">;

// Base themes: DS3 and DS5
export type HvBaseTheme = "ds3" | "ds5" | "pentahoPlus";

// Theme color modes
export type HvThemeColorMode = "dawn" | "wicked";

// Theme color mode type
export type HvThemeColorModeType = "light" | "dark";

// Theme color mode structure
export interface HvThemeColorModeStructure extends HvThemeColors {
  type: HvThemeColorModeType;
}

// Theme structure
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
  extends HvThemeComponents,
    HvThemeComponentsProps,
    HvThemeTypography,
    Partial<Omit<HvThemeTokens, "colors">> {
  name: string;
  colors: {
    modes: Record<Mode, Partial<HvThemeColorModeStructure>>;
  };
}

// Deep string: set all props to strings
export type DeepString<T> = {
  [P in keyof T]: T[P] extends object ? DeepString<T[P]> : string;
};

// Theme CSS vars
export type HvThemeVars = DeepString<HvThemeTokens> &
  DeepString<HvThemeComponents> &
  DeepString<HvThemeTypography>;
