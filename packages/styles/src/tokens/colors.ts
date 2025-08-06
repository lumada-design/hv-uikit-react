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

type VizKeys = `cat${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`;

export interface HvColorTokens
  extends Record<SemanticKeys<SemanticTypes>, string>,
    Record<VizKeys, string> {
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

  // #region others
  /** brand color */
  brand: string;
  /** shadow color */
  shad1: string;
  /** box shadow */
  shadow: string;
  // #endregion
}

const common = {
  brand: "#CC0000",

  textLight: "#FBFCFC",
  textDark: "#414141",

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
} satisfies Partial<HvColorTokens>;

// #region Light palette
const light = {
  primary: "#2064B4",
  primaryDeep: "#1775E0",
  primaryStrong: "#1775E0",
  primarySubtle: "#1775E019",
  primaryDimmed: "#1775E019",
  positive: "#478B1A",
  positiveDeep: "#227A10",
  positiveStrong: "#709C27",
  positiveDimmed: "#D7E6CF",
  positiveSubtle: "#D7E6CF",
  positiveBorder: "#D7E6CF",
  warning: "#F9C846",
  warningDeep: "#F27C27",
  warningStrong: "#F8AC39",
  warningDimmed: "#FBF2D8",
  warningSubtle: "#FBF2D8",
  warningBorder: "#FBF2D8",
  negative: "#D43136",
  negativeDeep: "#B41B3A",
  negativeStrong: "#ED4747",
  negativeDimmed: "#F4D3D4",
  negativeSubtle: "#F4D3D4",
  negativeBorder: "#F4D3D4",
  info: "#4D8AC0",
  infoDeep: "#4D8AC0",
  infoStrong: "#4D8AC0",
  infoDimmed: "#D8E6F1",
  infoSubtle: "#D8E6F1",
  infoBorder: "#D8E6F1",
  accent: indigo[600] as string,
  accentDeep: indigo[800] as string,
  accentStrong: indigo[700] as string,
  accentSubtle: indigo[100] as string,
  accentDimmed: indigo[50] as string,
  accentBorder: indigo[200] as string,

  text: "#414141",
  textSubtle: "#6C6B6B",
  textDisabled: "#999999",
  textDimmed: "#FBFCFC",

  border: "#CCCED0",
  borderSubtle: "#E8E8E8",
  borderStrong: "#6C6B6B",
  borderDisabled: "#999999",

  bgPage: "#F4F5F5",
  bgContainer: "#FBFCFC",
  bgPageSecondary: "#E8E8E8",
  bgContainerSecondary: "#FBFCFC",
  bgHover: "#1775E019",
  bgDisabled: "#E8E8E8",
  bgOverlay: `color-mix(in srgb, #CCCED0 80%, transparent)`,
  dimmer: "#FFFFFF",

  shad1: "rgba(65, 65, 65, 0.12)",
  shadow: "0 2px 12px rgba(65,65,65,0.12)",
  ...common,
} satisfies HvColorTokens;
// #endregion

// #region Dark palette
const dark = {
  primary: "#639FE3",
  primaryDeep: "#82B2E8",
  primaryStrong: "#82B2E8",
  primarySubtle: "#82B2E84C",
  primaryDimmed: "#82B2E84C",
  positive: "#84D930",
  positiveDeep: "#63A621",
  positiveStrong: "#70BF21",
  positiveDimmed: "#D7E6CF",
  positiveSubtle: "#D7E6CF",
  positiveBorder: "#D7E6CF",
  warning: "#E68C17",
  warningDeep: "#F57B36",
  warningStrong: "#F57B36",
  warningDimmed: "#FBF2D8",
  warningSubtle: "#FBF2D8",
  warningBorder: "#FBF2D8",
  negative: "#FF5E6C",
  negativeDeep: "#D92750",
  negativeStrong: "#EC3D57",
  negativeDimmed: "#F4D3D4",
  negativeSubtle: "#F4D3D4",
  negativeBorder: "#F4D3D4",
  info: "#7EBAD6",
  infoDeep: "#7EBAD6",
  infoStrong: "#7EBAD6",
  infoDimmed: "#D8E6F1",
  infoSubtle: "#D8E6F1",
  infoBorder: "#D8E6F1",
  accent: indigo[500] as string,
  accentDeep: indigo[700] as string,
  accentStrong: indigo[600] as string,
  accentSubtle: indigo[900] as string,
  accentDimmed: indigo[950] as string,
  accentBorder: indigo[800] as string,

  text: "#CCCCCC",
  textSubtle: "#9A9999",
  textDisabled: "#656565",
  textDimmed: "#313131",

  border: "#4B4B4B",
  borderSubtle: "#1F1F1F",
  borderStrong: "#9A9999",
  borderDisabled: "#656565",

  bgPage: "#282828",
  bgContainer: "#313131",
  bgPageSecondary: "#1F1F1F",
  bgContainerSecondary: "#313131",
  bgHover: "#82B2E84C",
  bgDisabled: "#1F1F1F",
  bgOverlay: `color-mix(in srgb, #4B4B4B 80%, transparent)`,
  dimmer: "#000000",

  shad1: "rgba(0,0,0,.16)",
  shadow: "0 3px 5px rgba(0,0,0,.16)",
  ...common,
} satisfies HvColorTokens;
// #endregion

export const colors = {
  light,
  dark,
};

/** @experimental extendable theme colors */
export interface HvThemeColors extends HvColorTokens {}

/** A type with all the accepted colors from the color palette */
export type HvColor = keyof HvThemeColors;

/**
 * A type representing an `HvColor` from the palette or any other color string
 * @example "primary" "bgPage" "#FF0000" "purple" "inherit"
 * */
export type HvColorAny = HvColor | Property.Color;
