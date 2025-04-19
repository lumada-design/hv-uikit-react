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

/**
 * Deep stringified structure of `ColorTokens`.
 * Useful for validation, introspection, or schema generation.
 */
export const colorTokensSpec: ColorTokens = {
  primary: "string",
  primaryStrong: "string",
  primaryDimmed: "string",
  primarySubtle: "string",
  primaryDeep: "string",

  accent: "string",
  accentStrong: "string",
  accentDimmed: "string",
  accentSubtle: "string",
  accentDeep: "string",
  accentBorder: "string",

  positive: "string",
  positiveStrong: "string",
  positiveDimmed: "string",
  positiveSubtle: "string",
  positiveDeep: "string",
  positiveBorder: "string",

  warning: "string",
  warningStrong: "string",
  warningDimmed: "string",
  warningSubtle: "string",
  warningDeep: "string",
  warningBorder: "string",

  negative: "string",
  negativeStrong: "string",
  negativeDimmed: "string",
  negativeSubtle: "string",
  negativeDeep: "string",
  negativeBorder: "string",

  info: "string",
  infoStrong: "string",
  infoDimmed: "string",
  infoSubtle: "string",
  infoDeep: "string",
  infoBorder: "string",

  text: "string",
  textSubtle: "string",
  textDisabled: "string",
  textDimmed: "string",
  textLight: "string",
  textDark: "string",

  border: "string",
  borderSubtle: "string",
  borderStrong: "string",
  borderDisabled: "string",

  bgPage: "string",
  bgPageSecondary: "string",
  bgContainer: "string",
  bgContainerSecondary: "string",
  bgHover: "string",
  bgDisabled: "string",
  bgOverlay: "string",
  dimmer: "string",
};
