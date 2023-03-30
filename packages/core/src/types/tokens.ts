// COLORS
export type HvAccentColorKeys =
  | "secondary"
  | "primary"
  | "primary_80"
  | "brand";
export type HvAtmosphereColorKeys =
  | "atmo1"
  | "atmo2"
  | "atmo3"
  | "atmo4"
  | "secondary_60";
export type HvBaseColorKeys = "base_light" | "base_dark";
export type HvSemanticColorKeys =
  | "positive"
  | "neutral"
  | "warning"
  | "negative"
  | "catastrophic"
  | "sema6"
  | "neutral_20"
  | "positive_20"
  | "negative_20"
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
  | "warning_20";
export type HvSupportColorKeys =
  | "supp1"
  | "supp2"
  | "supp3"
  | "supp4"
  | "supp5";
export type HvUndefinedStateColorKeys = "atmo4";
export type HvCategoricalColorKeys =
  | "cat1"
  | "cat2"
  | "cat3"
  | "cat4"
  | "cat5"
  | "cat6"
  | "cat7"
  | "cat8"
  | "cat9"
  | "cat10"
  | "cat11"
  | "cat12"
  | "cat13"
  | "cat14"
  | "cat15"
  | "cat16"
  | "cat17"
  | "cat18"
  | "cat19"
  | "cat20";
export type HvSequentialColorKeys =
  | "cat1"
  | "cat1_100"
  | "cat1_200"
  | "cat1_300"
  | "cat1_400"
  | "cat1_500"
  | "cat1_600"
  | "cat1_700"
  | "cat1_800"
  | "cat1_900";
export type HvPolarizedColorKeys =
  | "sema1"
  | "cat21"
  | "cat22"
  | "cat23"
  | "cat24"
  | "cat25"
  | "cat26"
  | "cat27"
  | "cat28"
  | "sema5";

export type HvAccentColors = Record<HvAccentColorKeys, string>;

export type HvAtmosphereColors = Record<HvAtmosphereColorKeys, string>;

export type HvBaseColors = Record<HvBaseColorKeys, string>;

export type HvSemanticColors = Record<HvSemanticColorKeys, string>;

export type HvSupportColors = Record<HvSupportColorKeys, string>;

export interface HvThemePalette {
  accent: HvAccentColors;
  atmosphere: HvAtmosphereColors;
  base: HvBaseColors;
  semantic: HvSemanticColors;
  support: HvSupportColors;
}

// BREAKPOINTS
export type HvBreakpoints = "xs" | "sm" | "md" | "lg" | "xl";
