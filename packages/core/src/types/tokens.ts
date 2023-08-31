import type {
  HvAccentColor,
  HvAtmosphereColor,
  HvBaseColor,
  HvSemanticColor,
  HvSupportColor,
  HvCategoricalColor,
} from "@hitachivantara/uikit-styles";

// TODO: deprecate/remove this
export type HvAccentColorKeys = HvAccentColor;
export type HvAtmosphereColorKeys = HvAtmosphereColor;
export type HvBaseColorKeys = HvBaseColor;
export type HvSemanticColorKeys = HvSemanticColor;
export type HvSupportColorKeys = HvSupportColor;
export type HvUndefinedStateColorKeys = "atmo4";
export type HvCategoricalColorKeys = HvCategoricalColor;
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
  | "positive"
  | "positive_120"
  | "positive_80"
  | "warning"
  | "warning_120"
  | "warning_140"
  | "negative"
  | "cat21"
  | "cat22"
  | "cat23"
  | "cat24"
  | "cat25"
  | "cat26"
  | "cat27"
  | "cat28"
  | "catastrophic";

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
