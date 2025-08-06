import type { Property } from "csstype";

import { indigo } from "../palette";

type SemanticTypes =
  | "primary"
  | "accent"
  | "positive"
  | "warning"
  | "negative"
  | "info";

type SemanticKeys<Prefix extends string> =
  | `${Prefix}`
  | `${Prefix}Strong`
  | `${Prefix}Dimmed`
  | `${Prefix}Subtle`
  | `${Prefix}Deep`;
// 🔎: border tokens don't exist for "primary"

export interface ColorTokens
  extends Record<SemanticKeys<SemanticTypes>, string> {
  // #region semantic
  // 🔎: border tokens don't exist for "primary"
  accentBorder: string;
  positiveBorder: string;
  warningBorder: string;
  negativeBorder: string;
  infoBorder: string;
  // #endregion

  // #region text
  /** primary text color */
  text: string;
  /** secondary text color */
  textSubtle: string;
  /** disabled text color */
  textDisabled: string;
  /** dimmed text, close to the bgColor, used for contrasting with semantic backgrounds */
  textDimmed: string;
  /** light-only text */
  textLight: string;
  /** dark-only text */
  textDark: string;
  // #endregion

  // #region borders
  border: string;
  borderSubtle: string;
  borderStrong: string;
  borderDisabled: string;
  // #endregion

  // #region backgrounds
  /** default page background */
  bgPage: string;
  /** secondary page background (also for :active action). */ // 🔎 weird use-cases?
  bgPageSecondary: string;
  /** default surface background for containers */
  bgContainer: string;
  /** secondary surface background for containers */
  bgContainerSecondary: string;
  /** background for :hover actions */
  bgHover: string;
  /** background for disabled elements */
  bgDisabled: string;
  /** overlay background (for Dialog, dropdowns, etc.) */
  bgOverlay: string;
  /** color to use for opacity */
  dimmer: string;
  // #endregion
}

const base = {
  /** @deprecated use `textLight` instead */
  base_light: "#FBFCFC",
  /** @deprecated use `textDark` instead */
  base_dark: "#414141",
};

const categorical = {
  cat1: "#95AFE8",
  cat2: "#E89E5D",
  cat3: "#73BAA5",
  cat4: "#6F749F",
  cat5: "#D17A7C",
  cat6: "#FFDA8A",
  cat7: "#7DC1DB",
  cat8: "#B67EA3",
  cat9: "#F2BC66",
  cat10: "#2D86B3",
  cat11: "#FC9AAA",
  cat12: "#8EBA8C",
};

const common = {
  ...base,
  ...categorical,
};

// #region Light palette
const accentLight = {
  secondary: "#414141",
  primary: "#2064B4",
  primary_80: "#1775E0",
  primary_20: "#1775E019",
  brand: "#CC0000",
  secondary_80: "#6C6B6B",
  secondary_60: "#999999",
};

const atmosphereLight = {
  atmo1: "#FBFCFC",
  atmo2: "#F4F5F5",
  atmo3: "#E8E8E8",
  atmo4: "#CCCED0",
};

const semanticLight = {
  positive: "#478B1A",
  positive_80: "#709C27",
  positive_120: "#227A10",
  neutral: "#4D8AC0",
  warning: "#F9C846",
  warning_120: "#F8AC39",
  warning_140: "#F27C27",
  negative: "#D43136",
  negative_80: "#ED4747",
  negative_120: "#B41B3A",
  catastrophic: "#930A80",
  neutral_20: "#D8E6F1",
  positive_20: "#D7E6CF",
  negative_20: "#F4D3D4",
  warning_20: "#FBF2D8",
};

const shadowLight = {
  shad1: "rgba(65, 65, 65, 0.12)",
  shadow: "0 2px 12px rgba(65,65,65,0.12)",
};

const newLight = {
  primary: accentLight.primary,
  primaryDeep: accentLight.primary_80,
  primaryStrong: accentLight.primary_80,
  primarySubtle: accentLight.primary_20,
  primaryDimmed: accentLight.primary_20,
  positive: semanticLight.positive,
  positiveDeep: semanticLight.positive_120,
  positiveStrong: semanticLight.positive_80,
  positiveDimmed: semanticLight.positive_20,
  positiveSubtle: semanticLight.positive_20,
  positiveBorder: semanticLight.positive_20,
  warning: semanticLight.warning,
  warningDeep: semanticLight.warning_140,
  warningStrong: semanticLight.warning_120,
  warningDimmed: semanticLight.warning_20,
  warningSubtle: semanticLight.warning_20,
  warningBorder: semanticLight.warning_20,
  negative: semanticLight.negative,
  negativeDeep: semanticLight.negative_120,
  negativeStrong: semanticLight.negative_80,
  negativeDimmed: semanticLight.negative_20,
  negativeSubtle: semanticLight.negative_20,
  negativeBorder: semanticLight.negative_20,
  info: semanticLight.neutral,
  infoDeep: semanticLight.neutral,
  infoStrong: semanticLight.neutral,
  infoDimmed: semanticLight.neutral_20,
  infoSubtle: semanticLight.neutral_20,
  infoBorder: semanticLight.neutral_20,
  accent: indigo[600] as string,
  accentDeep: indigo[800] as string,
  accentStrong: indigo[700] as string,
  accentSubtle: indigo[100] as string,
  accentDimmed: indigo[50] as string,
  accentBorder: indigo[200] as string,

  text: accentLight.secondary,
  textSubtle: accentLight.secondary_80,
  textDisabled: accentLight.secondary_60,
  textDimmed: atmosphereLight.atmo1,
  textLight: base.base_light,
  textDark: base.base_dark,

  border: atmosphereLight.atmo4,
  borderSubtle: atmosphereLight.atmo3,
  borderStrong: accentLight.secondary_80,
  borderDisabled: accentLight.secondary_60,

  bgPage: atmosphereLight.atmo2,
  bgContainer: atmosphereLight.atmo1,
  bgPageSecondary: atmosphereLight.atmo3,
  bgContainerSecondary: atmosphereLight.atmo1,
  bgHover: accentLight.primary_20,
  bgDisabled: atmosphereLight.atmo3,
  bgOverlay: `color-mix(in srgb, ${atmosphereLight.atmo4} 80%, transparent)`,
  dimmer: "#FFFFFF",
} satisfies ColorTokens;
// #endregion

// #region Dark palette
const accentDark = {
  secondary: "#CCCCCC",
  primary: "#639FE3",
  primary_80: "#82B2E8",
  primary_20: "#82B2E84C",
  brand: "#CC0000",
  secondary_80: "#9A9999",
  secondary_60: "#656565",
};

const atmosphereDark = {
  atmo1: "#313131",
  atmo2: "#282828",
  atmo3: "#1F1F1F",
  atmo4: "#4B4B4B",
};

const semanticDark = {
  positive: "#84D930",
  positive_80: "#70BF21",
  positive_120: "#63A621",
  neutral: "#7EBAD6",
  warning: "#E68C17",
  warning_120: "#F57B36",
  warning_140: "#FE6B51",
  negative: "#FF5E6C",
  negative_80: "#EC3D57",
  negative_120: "#D92750",
  catastrophic: "#9A76E7",
  neutral_20: "#D8E6F1",
  positive_20: "#D7E6CF",
  negative_20: "#F4D3D4",
  warning_20: "#FBF2D8",
};

const shadowDark = {
  shad1: "rgba(0,0,0,.16)",
  shadow: "0 3px 5px rgba(0,0,0,.16)",
};

const newDark = {
  primary: accentDark.primary,
  primaryDeep: accentDark.primary_80,
  primaryStrong: accentDark.primary_80,
  primarySubtle: accentDark.primary_20,
  primaryDimmed: accentDark.primary_20,
  positive: semanticDark.positive,
  positiveDeep: semanticDark.positive_120,
  positiveStrong: semanticDark.positive_80,
  positiveDimmed: semanticDark.positive_20,
  positiveSubtle: semanticDark.positive_20,
  positiveBorder: semanticDark.positive_20,
  warning: semanticDark.warning,
  warningDeep: semanticDark.warning_140,
  warningStrong: semanticDark.warning_120,
  warningDimmed: semanticDark.warning_20,
  warningSubtle: semanticDark.warning_20,
  warningBorder: semanticDark.warning_20,
  negative: semanticDark.negative,
  negativeDeep: semanticDark.negative_120,
  negativeStrong: semanticDark.negative_80,
  negativeDimmed: semanticDark.negative_20,
  negativeSubtle: semanticDark.negative_20,
  negativeBorder: semanticDark.negative_20,
  info: semanticDark.neutral,
  infoDeep: semanticDark.neutral,
  infoStrong: semanticDark.neutral,
  infoDimmed: semanticDark.neutral_20,
  infoSubtle: semanticDark.neutral_20,
  infoBorder: semanticDark.neutral_20,
  accent: indigo[500] as string,
  accentDeep: indigo[700] as string,
  accentStrong: indigo[600] as string,
  accentSubtle: indigo[900] as string,
  accentDimmed: indigo[950] as string,
  accentBorder: indigo[800] as string,

  text: accentDark.secondary,
  textSubtle: accentDark.secondary_80,
  textDisabled: accentDark.secondary_60,
  textDimmed: atmosphereDark.atmo1,
  textLight: base.base_light,
  textDark: base.base_dark,

  border: atmosphereDark.atmo4,
  borderSubtle: atmosphereDark.atmo3,
  borderStrong: accentLight.secondary_80,
  borderDisabled: accentLight.secondary_60,

  bgPage: atmosphereDark.atmo2,
  bgContainer: atmosphereDark.atmo1,
  bgPageSecondary: atmosphereDark.atmo3,
  bgContainerSecondary: atmosphereDark.atmo1,
  bgHover: accentDark.primary_20,
  bgDisabled: atmosphereDark.atmo3,
  bgOverlay: `color-mix(in srgb, ${atmosphereDark.atmo4} 80%, transparent)`,
  dimmer: "#000000",
} satisfies ColorTokens;
// #endregion

export const colors = {
  common,
  light: {
    ...accentLight,
    ...atmosphereLight,
    ...semanticLight,
    ...shadowLight,
    ...newLight,
  },
  dark: {
    ...accentDark,
    ...atmosphereDark,
    ...semanticDark,
    ...shadowDark,
    ...newDark,
  },
};

/** @deprecated replace with standard UI Kit ColorTokens in v6 */
type AllColors = typeof colors.common & typeof colors.light;

/** @experimental extendable theme colors */
export interface HvThemeColors extends ColorTokens, AllColors {}

/** A type with all the accepted colors from the color palette */
export type HvColor = keyof HvThemeColors;

/**
 * A type representing an `HvColor` from the palette or any other color string
 * @example "primary" "bgPage" "#FF0000" "purple" "inherit"
 * */
export type HvColorAny = HvColor | Property.Color;
