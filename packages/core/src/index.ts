export { default as HvLink } from "./Link";
export * from "./Link";

export { default as HvFooter } from "./Footer";
export * from "./Footer";

export { default as HvTypography } from "./Typography";
export * from "./Typography";

export type HvAccentColorKeys = "acce0" | "acce1" | "acce2" | "acce2h" | "acce3";
export type HvAtmosphereColorKeys =
  | "atmo1"
  | "atmo2"
  | "atmo3"
  | "atmo4"
  | "atmo5"
  | "atmo6"
  | "atmo7";
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
  | "sema19";

export type HvAccentColors = Record<HvAccentColorKeys, string>;

export type HvAtmosphereColors = Record<HvAtmosphereColorKeys, string>;

export type HvBaseColors = Record<HvBaseColorKeys, string>;

export type HvSemanticColors = Record<HvSemanticColorKeys, string>;

export type HvSupportColors = Record<string, string>;

export interface HvThemeTypographyDefinition {
  color: string;
  fontSize: string;
  letterSpacing: string;
  lineHeight: string;
  fontWeight: string;
}

export type HvSpacingKeys = "xs" | "sm" | "md" | "lg" | "xl";

export type HvThemeSpacing = Record<HvSpacingKeys, string>;

export interface HvThemeVizPalette {
  palette: {
    categorical: Map<string, string>;
    undefinedState: Map<string, string>;
    sequential: Map<string, string>;
    polarized: Map<string, string>;
  };
}

export interface HvThemePalette {
  accent: HvAccentColors;
  atmosphere: HvAtmosphereColors;
  base: HvBaseColors;
  semantic: HvSemanticColors;
  support: HvSupportColors;
}

export interface HvThemeTypography extends Map<string, HvThemeTypographyDefinition> {
  fontFamily: string;
}

export interface HvTheme {
  type: string;
  name: string;
  palette: HvThemePalette;
  typography: HvThemeTypography;
  spacing: HvThemeSpacing;
  viz: HvThemeVizPalette;
}

// extend Material-UI's theme to use `theme.hv` object
declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    hv: HvTheme;
  }

  interface ThemeOptions {
    hv?: HvTheme;
  }
}

export type StandardProps<C> = Omit<C, "classes"> & {
  className?: string;
  ref?: C extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
  style?: React.CSSProperties;
};
