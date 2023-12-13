import * as CSS from "csstype";

import { colors } from "./tokens/colors";
import * as tokens from "./tokens";

// Theme tokens
const flattenTokens = {
  ...tokens,
  colors: {
    type: "light",
    backgroundColor: tokens.colors.light.atmo2,
    containerBackgroundHover: tokens.colors.light.primary_20,
    ...tokens.colors.common,
    ...tokens.colors.light,
  }, // Flatten colors and add background color
};

interface CSSProperties extends CSS.Properties<string | number> {}

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
export type HvThemeTypographyProps = Pick<
  CSSProperties,
  | "color"
  | "fontSize"
  | "letterSpacing"
  | "lineHeight"
  | "fontWeight"
  | "textDecoration"
>;

export type HvThemeTypography = {
  typography: {
    // DS5
    display: HvThemeTypographyProps;
    title1: HvThemeTypographyProps;
    title2: HvThemeTypographyProps;
    title3: HvThemeTypographyProps;
    title4: HvThemeTypographyProps;
    label: HvThemeTypographyProps;
    body: HvThemeTypographyProps;
    caption1: HvThemeTypographyProps;
    caption2: HvThemeTypographyProps;
    // LEGACY UNMAPPABLE (DS3)
    ["5xlTitle"]: HvThemeTypographyProps;
    ["4xlTitle"]: HvThemeTypographyProps;
    xxlTitle: HvThemeTypographyProps;
    lTitle: HvThemeTypographyProps;
    sTitle: HvThemeTypographyProps;
    xxsTitle: HvThemeTypographyProps;
    sectionTitle: HvThemeTypographyProps;
    placeholderText: HvThemeTypographyProps;
    link: HvThemeTypographyProps;
    disabledText: HvThemeTypographyProps;
    selectedNavText: HvThemeTypographyProps;
    vizTextDisabled: HvThemeTypographyProps;
    xsInlineLink: HvThemeTypographyProps;
  };
};

// Breakpoints
export type HvThemeBreakpoint = Exclude<keyof typeof tokens.space, "base">;

export type SpacingValue = number | HvThemeBreakpoint | (string & {});

// Theme utils
export type HvThemeUtils = {
  /**
   * Utility function to generate spacing values from the theme.
   *
   * @example
   * theme.spacing(2) // 16px (2*8px)
   * theme.spacing("md", "inherit", "42px") // 24px inherit 42px
   */
  spacing: (...args: [SpacingValue[]] | SpacingValue[]) => string;
  /**
   * Utility function to apply an alpha channel to a color from the theme.
   *
   * @example
   * theme.alpha("atmo1", 0.5) // rgb( R G B / 0.5)
   * */
  alpha: (
    color: Exclude<keyof HvThemeTokens["colors"], "type" | "shadow">, // "type" and "shadow" are not actual colors
    alpha: number | string
  ) => string;
};

// Theme colors
export type HvThemeColors = typeof colors.common & typeof colors.light;

// Base themes: DS3 and DS5
export type HvBaseTheme = "ds3" | "ds5";

// Theme color modes
export type HvThemeColorMode = "dawn" | "wicked";

// Theme color mode type
export type HvThemeColorModeType = "light" | "dark";

// Theme color mode structure
export type HvThemeColorModeStructure = HvThemeColors & {
  backgroundColor: string;
  containerBackgroundHover: string;
  type: HvThemeColorModeType;
};

// Theme structure
export interface HvThemeStructure<Mode extends string = string>
  extends HvThemeComponents,
    HvThemeComponentsProps,
    HvThemeTypography,
    Omit<HvThemeTokens, "colors"> {
  name: string;
  base?: HvBaseTheme;
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

// Theme: utils + CSS vars
export type HvTheme = HvThemeVars & HvThemeUtils;
