export { default as HvBadge } from "./Badge";
export * from "./Badge";

export { default as HvButton } from "./Button";
export * from "./Button";

export { default as HvTypography } from "./Typography";
export * from "./Typography";

export { default as HvGrid } from "./Grid";
export * from "./Grid";

export interface HvTheme {
  type: string;
  name: string;
  palette: HvThemePalette;
  typography: HvThemeTypography;
  spacing: HvThemeSpacing;
  viz: HvThemeVizPalette;
}

export interface HvThemePalette {
  accent: HvAccentColors;
  atmosphere: HvAtmosphereColors;
  base: HvBaseColors;
  semantic: HvSemanticColors;
  support: HvSupportColors;
}

interface HvAccentColors extends Map<string, string> {}

interface HvAtmosphereColors extends Map<string, string> {}

interface HvBaseColors extends Map<string, string> {}

interface HvSemanticColors extends Map<string, string> {}

interface HvSupportColors extends Map<string, string> {}

interface HvThemeTypography extends Map<string, HvThemeTypographyDefinition> {
  fontFamily: string;
}

interface HvThemeTypographyDefinition {
  color: string;
  fontSize: string;
  letterSpacing: string;
  lineHeight: string;
  fontWeight: string;
}

interface HvThemeSpacing extends Map<string, number> {}

interface HvThemeVizPalette {
  palette: {
    categorical: Map<string, string>;
    undefinedState: Map<string, string>;
    sequential: Map<string, string>;
    polarizes: Map<string, string>;
  };
}
