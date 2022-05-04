import { Theme } from "@mui/material";

export type HvAccentColorKeys = "acce1" | "acce2" | "acce2h" | "acce3";
export type HvAtmosphereColorKeys = "atmo1" | "atmo2" | "atmo3" | "atmo4" | "atmo5";
export type HvBaseColorKeys = "base1" | "base2";
export type HvSemanticColorKeys =
  | "sema1"
  | "sema2"
  | "sema3"
  | "sema4"
  | "sema5"
  | "sema6"
  | "sema7"
  | "sema8"
  | "sema9"
  | "sema10"
  | "sema11"
  | "sema12"
  | "sema13"
  | "sema14"
  | "sema15"
  | "sema16"
  | "sema17"
  | "sema18"
  | "sema19"
  | "sema20";
export type HvSupportColorKeys = "supp1" | "supp2" | "supp3" | "supp4" | "supp5";
export type HvUndefinedStateColorKeys = "atmo4";
export type HvCategoricalColorKeys =
  | "cviz1"
  | "cviz2"
  | "cviz3"
  | "cviz4"
  | "cviz5"
  | "cviz6"
  | "cviz7"
  | "cviz8"
  | "cviz9"
  | "cviz10"
  | "cviz11"
  | "cviz12"
  | "cviz13"
  | "cviz14"
  | "cviz15"
  | "cviz16"
  | "cviz17"
  | "cviz18"
  | "cviz19"
  | "cviz20";
export type HvSequentialColorKeys =
  | "cviz1"
  | "cviz1_100"
  | "cviz1_200"
  | "cviz1_300"
  | "cviz1_400"
  | "cviz1_500"
  | "cviz1_600"
  | "cviz1_700"
  | "cviz1_800"
  | "cviz1_900";
export type HvPolarizedColorKeys =
  | "sema1"
  | "cviz21"
  | "cviz22"
  | "cviz23"
  | "cviz24"
  | "cviz25"
  | "cviz26"
  | "cviz27"
  | "cviz28"
  | "sema5";

export type HvAccentColors = Record<HvAccentColorKeys, string>;

export type HvAtmosphereColors = Record<HvAtmosphereColorKeys, string>;

export type HvBaseColors = Record<HvBaseColorKeys, string>;

export type HvSemanticColors = Record<HvSemanticColorKeys, string>;

export type HvSupportColors = Record<HvSupportColorKeys, string>;

export interface HvThemeTypographyDefinition {
  color: string;
  fontSize: string;
  letterSpacing: string;
  lineHeight: string;
  fontWeight: number;
}

export type HvSpacingKeys = "xs" | "sm" | "md" | "lg" | "xl";

export type HvThemeSpacing = Record<HvSpacingKeys, number>;

export interface HvThemeVizPalette {
  palette: {
    categorical: Record<HvCategoricalColorKeys, string>;
    undefinedState: Record<HvUndefinedStateColorKeys, string>;
    sequential: Record<HvSequentialColorKeys, string>;
    polarized: Record<HvPolarizedColorKeys, string>;
  };
}

export interface HvThemePalette {
  accent: HvAccentColors;
  atmosphere: HvAtmosphereColors;
  base: HvBaseColors;
  semantic: HvSemanticColors;
  support: HvSupportColors;
}

export type HvTypographyKeys =
  | "5xlTitle"
  | "4xlTitle"
  | "3xlTitle"
  | "xxlTitle"
  | "xlTitle"
  | "lTitle"
  | "mTitle"
  | "sTitle"
  | "xsTitle"
  | "xxsTitle"
  | "sectionTitle"
  | "highlightText"
  | "normalText"
  | "placeholderText"
  | "link"
  | "disabledText"
  | "selectedNavText"
  | "vizText"
  | "vizTextDisabled"
  | "xsInlineLink";

export type HvThemeTypography = Record<HvTypographyKeys, HvThemeTypographyDefinition> & {
  fontFamily: string[] | string;
};

export interface HvTheme {
  type: string;
  name: string;
  palette: HvThemePalette;
  typography: HvThemeTypography;
  spacing: HvThemeSpacing;
  viz: HvThemeVizPalette;
}

export function themeBuilder(theme: HvTheme): Theme;
export function getTheme(theme: string): object;
export default Theme;

export { default as createGenerateClassName } from "./createGenerateClassName";
export { default as HvCssBaseline } from "./CssBaseline";
export { default as HvScopedCssBaseline } from "./ScopedCssBaseline";
