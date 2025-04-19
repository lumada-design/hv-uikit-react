import { ColorTokens } from "../types/color";
import { base, palette } from "./colors";

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
  sema6: "#AA00FF",
  neutral_20: "#D8E6F1",
  positive_20: "#D7E6CF",
  negative_20: "#F4D3D4",
  sema10: "#CE703D",
  sema11: "#D36041",
  sema12: "#CF4E38",
  sema13: "#CB3B30",
  sema14: "#BA2626",
  sema15: "#6589CB",
  sema16: "#4D8AC0",
  sema17: "#3388B1",
  sema18: "#1A85A1",
  sema19: "#00838F",
  warning_20: "#FBF2D8",
};

const supportLight = {
  supp1: "#0F8B8D",
  supp2: "#734B6D",
  supp3: "#4E7599",
  supp4: "#C19C31",
  supp5: "#546B6B",
};

const shadowLight = {
  shad1: "rgba(65, 65, 65, 0.12)",
  shadow: "0 2px 12px rgba(65,65,65,0.12)",
};

const utilsLight = {
  /** @deprecated use `bgPage` */
  backgroundColor: atmosphereLight.atmo2,
  /** @deprecated use `bgHover` */
  containerBackgroundHover: accentLight.primary_20,
};

const tokensLight = {
  primary: accentLight.primary,
  primaryDeep: accentLight.primary_80,
  primaryStrong: accentLight.primary_80,
  primarySubtle: accentLight.primary_20,
  primaryDimmed: accentLight.primary_20,
  accent: palette.indigo[600] as string,
  accentDeep: palette.indigo[800] as string,
  accentStrong: palette.indigo[700] as string,
  accentSubtle: palette.indigo[100] as string,
  accentDimmed: palette.indigo[50] as string,
  accentBorder: palette.indigo[200] as string,
  positive: semanticLight.positive,
  positiveDeep: semanticLight.positive_120,
  positiveStrong: semanticLight.positive_80,
  positiveDimmed: semanticLight.positive_20,
  positiveSubtle: semanticLight.positive_20,
  positiveBorder: semanticLight.positive_20,
  negative: semanticLight.negative,
  negativeDeep: semanticLight.negative_120,
  negativeStrong: semanticLight.negative_80,
  negativeDimmed: semanticLight.negative_20,
  negativeSubtle: semanticLight.negative_20,
  negativeBorder: semanticLight.negative_20,
  warning: semanticLight.warning,
  warningDeep: semanticLight.warning_140,
  warningStrong: semanticLight.warning_120,
  warningDimmed: semanticLight.warning_20,
  warningSubtle: semanticLight.warning_20,
  warningBorder: semanticLight.warning_20,
  info: semanticLight.neutral,
  infoDeep: semanticLight.neutral,
  infoStrong: semanticLight.neutral,
  infoDimmed: semanticLight.neutral_20,
  infoSubtle: semanticLight.neutral_20,
  infoBorder: semanticLight.neutral_20,
  text: accentLight.secondary,
  textSubtle: accentLight.secondary_80,
  textDisabled: accentLight.secondary_60,
  textDimmed: atmosphereLight.atmo1,
  textLight: base.base_light,
  textDark: base.base_dark,
  bgPage: atmosphereLight.atmo2,
  bgContainer: atmosphereLight.atmo1,
  bgPageSecondary: atmosphereLight.atmo3,
  bgContainerSecondary: atmosphereLight.atmo1,
  bgHover: accentLight.primary_20,
  bgDisabled: atmosphereLight.atmo3,
  border: atmosphereLight.atmo4,
  borderSubtle: atmosphereLight.atmo3,
  borderStrong: accentLight.secondary_80,
  borderDisabled: accentLight.secondary_60,
  bgOverlay: `color-mix(in srgb, ${atmosphereLight.atmo4} 80%, transparent)`,
  dimmer: "#FFFFFF",
} satisfies ColorTokens;

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
  sema6: "#928FFF",
  neutral_20: "#D8E6F1",
  positive_20: "#D7E6CF",
  negative_20: "#F4D3D4",
  sema10: "#F4CAB0",
  sema11: "#F1B7A0",
  sema12: "#EEA291",
  sema13: "#E98B82",
  sema14: "#E57373",
  sema15: "#80DEEA",
  sema16: "#4DD0E1",
  sema17: "#26C6DA",
  sema18: "#00ACC1",
  sema19: "#00A0B7",
  warning_20: "#FBF2D8",
};

const supportDark = {
  supp2: "#734B6D",
  supp3: "#4E7599",
  supp4: "#C19C31",
  supp5: "#546B6B",
  supp1: "#0F8B8D",
};

const shadowDark = {
  shad1: "rgba(0,0,0,Dark.16)",
  shadow: "0 3px 5px rgba(0,0,0,Dark.16)",
};

const utilsDark = {
  /** @deprecated use `bgPage` */
  backgroundColor: atmosphereDark.atmo2,
  /** @deprecated use `bgHover` */
  containerBackgroundHover: accentDark.primary_20,
};

const tokensDark = {
  primary: accentDark.primary,
  primaryDeep: accentDark.primary_80,
  primaryStrong: accentDark.primary_80,
  primarySubtle: accentDark.primary_20,
  primaryDimmed: accentDark.primary_20,
  accent: palette.indigo[500],
  accentDeep: palette.indigo[700],
  accentStrong: palette.indigo[600],
  accentSubtle: palette.indigo[900],
  accentDimmed: palette.indigo[950],
  accentBorder: palette.indigo[800],
  positive: semanticDark.positive,
  positiveDeep: semanticDark.positive_120,
  positiveStrong: semanticDark.positive_80,
  positiveDimmed: semanticDark.positive_20,
  positiveSubtle: semanticDark.positive_20,
  positiveBorder: semanticDark.positive_20,
  negative: semanticDark.negative,
  negativeDeep: semanticDark.negative_120,
  negativeStrong: semanticDark.negative_80,
  negativeDimmed: semanticDark.negative_20,
  negativeSubtle: semanticDark.negative_20,
  negativeBorder: semanticDark.negative_20,
  warning: semanticDark.warning,
  warningDeep: semanticDark.warning_140,
  warningStrong: semanticDark.warning_120,
  warningDimmed: semanticDark.warning_20,
  warningSubtle: semanticDark.warning_20,
  warningBorder: semanticDark.warning_20,
  info: semanticDark.neutral,
  infoDeep: semanticDark.neutral,
  infoStrong: semanticDark.neutral,
  infoDimmed: semanticDark.neutral_20,
  infoSubtle: semanticDark.neutral_20,
  infoBorder: semanticDark.neutral_20,
  text: accentDark.secondary,
  textSubtle: accentDark.secondary_80,
  textDisabled: accentDark.secondary_60,
  textDimmed: atmosphereDark.atmo1,
  textLight: base.base_light,
  textDark: base.base_dark,
  bgPage: atmosphereDark.atmo2,
  bgContainer: atmosphereDark.atmo1,
  bgPageSecondary: atmosphereDark.atmo3,
  bgContainerSecondary: atmosphereDark.atmo1,
  bgHover: accentDark.primary_20,
  bgDisabled: atmosphereDark.atmo3,
  border: atmosphereDark.atmo4,
  borderSubtle: atmosphereDark.atmo3,
  borderStrong: accentLight.secondary_80,
  borderDisabled: accentLight.secondary_60,
  bgOverlay: `color-mix(in srgb, ${atmosphereDark.atmo4} 80%, transparent)`,
  dimmer: "#000000",
} satisfies ColorTokens;

export const light = {
  ...accentLight,
  ...atmosphereLight,
  ...semanticLight,
  ...supportLight,
  ...shadowLight,
  ...utilsLight,
  ...tokensLight,
};

export const dark = {
  ...accentDark,
  ...atmosphereDark,
  ...semanticDark,
  ...supportDark,
  ...shadowDark,
  ...utilsDark,
  ...tokensDark,
};

// TODO: remove in favour of `HvColor`/`HvColorAny`?
export type HvAccentColor = keyof typeof accentLight;
export type HvAtmosphereColor = keyof typeof atmosphereLight;
export type HvSemanticColor = keyof typeof semanticLight;
export type HvSupportColor = keyof typeof supportLight;
