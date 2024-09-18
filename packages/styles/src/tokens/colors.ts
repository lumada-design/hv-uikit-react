import type { Property } from "csstype";

interface ColorTokens {
  // #region semantic
  primary: string;
  primaryAction: string;
  primaryStrong: string;
  primarySubtle: string;
  primaryDimmed: string;
  success: string;
  successAction: string;
  successStrong: string;
  successDimmed: string;
  warning: string;
  warningAction: string;
  warningStrong: string;
  warningDimmed: string;
  error: string;
  errorAction: string;
  errorStrong: string;
  errorDimmed: string;
  neutral: string;
  neutralAction: string;
  neutralStrong: string;
  neutralDimmed: string;
  // #endregion

  // #region text
  /** primary text color */
  text: string;
  /** secondary text color */
  textSubtle: string;
  /** disabled text color */
  textDisabled: string;
  /** dimmed text, close to the bgColor, used for contrasting with semantic backgrounds */
  textDimmed: string; // usage of both subtle & dimmed is confusing
  /** primary link color */
  link: string;
  /** active link color, when hovered/focused */
  linkActive: string;
  /** visited link color */
  // #endregion

  // #region borders
  divider: string;
  dividerSubtle: string;
  dividerDimmed: string;
  // #endregion

  // #region backgrounds
  /** default page backgroung */
  bgPage: string;
  /** default surface background (for Header, Tooltip, Dialog, Drawer, etc. */
  bgSurface: string;
  /** background for :active action */
  bgActive: string;
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
  base_light: "#FBFCFC",
  base_dark: "#414141",
};

const categorical = {
  cat1_180: "#2D4B87",
  cat1_160: "#4767A7",
  cat1_140: "#5C7CBB",
  cat1_120: "#7795D1",
  cat1: "#95AFE8",
  cat1_80: "#B3C6EE",
  cat1_60: "#BDCDEF",
  cat1_40: "#D2DEF5",
  cat1_20: "#E7EDF9",
  cat2_180: "#764419",
  cat2_160: "#9B5F2A",
  cat2_140: "#B4733A",
  cat2_120: "#CD884B",
  cat2: "#E89E5D",
  cat2_80: "#EBB07C",
  cat2_60: "#EFC39B",
  cat2_40: "#F4D7BD",
  cat2_20: "#F8EADC",
  cat3_180: "#0B513E",
  cat3_160: "#1C6F58",
  cat3_140: "#328871",
  cat3_120: "#50A18B",
  cat3: "#73BAA5",
  cat3_80: "#8EC6B6",
  cat3_60: "#A9D3C7",
  cat3_40: "#C5E2DA",
  cat3_20: "#E0EFEB",
  cat4_180: "#131D55",
  cat4_160: "#283373",
  cat4_140: "#3C4784",
  cat4_120: "#525C93",
  cat4: "#6F749F",
  cat4_80: "#8A8EB1",
  cat4_60: "#A6A9C3",
  cat4_40: "#C3C6D7",
  cat4_20: "#DFE1EA",
  cat5_180: "#561C1E",
  cat5_160: "#722D30",
  cat5_140: "#8F4245",
  cat5_120: "#AC5B5E",
  cat5: "#D17A7C",
  cat5_80: "#D99395",
  cat5_60: "#E1ADAE",
  cat5_40: "#EBC9C9",
  cat5_20: "#F3E2E3",
  cat6_180: "#A27B21",
  cat6_160: "#BC9336",
  cat6_140: "#CFA74D",
  cat6_120: "#E3BD66",
  cat6: "#FFDA8A",
  cat6_80: "#FEE0A0",
  cat6_60: "#FDE7B7",
  cat6_40: "#FDEFCF",
  cat6_20: "#FCF6E6",
  cat7_180: "#0A4A61",
  cat7_160: "#1B6783",
  cat7_140: "#31809D",
  cat7_120: "#519FBB",
  cat7: "#7DC1DB",
  cat7_80: "#96CCE1",
  cat7_60: "#AFD8E7",
  cat7_40: "#C9E5F0",
  cat7_20: "#E2F1F6",
  cat8_180: "#45243A",
  cat8_160: "#613753",
  cat8_140: "#7B4B6B",
  cat8_120: "#996487",
  cat8: "#B67EA3",
  cat8_80: "#C396B4",
  cat8_60: "#D1AFC6",
  cat8_40: "#E0CAD9",
  cat8_20: "#EDE3EB",
  cat9_180: "#946D42",
  cat9_160: "#AD804E",
  cat9_140: "#C59259",
  cat9_120: "#D9A162",
  cat9: "#F2BC66",
  cat9_80: "#F3C883",
  cat9_60: "#F5D5A1",
  cat9_40: "#F8E3C1",
  cat9_20: "#FAF0DE",
  cat10_180: "#11415B",
  cat10_160: "#1E5877",
  cat10_140: "#2A6C91",
  cat10_120: "#347BA2",
  cat10: "#2D86B3",
  cat10_80: "#569DC1",
  cat10_60: "#7FB4CF",
  cat10_40: "#A9CDE0",
  cat10_20: "#D2E5EE",
  cat11_180: "#873E4A",
  cat11_160: "#A1525E",
  cat11_140: "#B86774",
  cat11_120: "#CF7D8A",
  cat11: "#FC9AAA",
  cat11_80: "#FBADBA",
  cat11_60: "#FBC0CA",
  cat11_40: "#FCD5DC",
  cat11_20: "#FCE9EC",
  cat12_180: "#375736",
  cat12_160: "#476C46",
  cat12_140: "#5C855B",
  cat12_120: "#719B70",
  cat12: "#8EBA8C",
  cat12_80: "#A3C6A2",
  cat12_60: "#B9D3B8",
  cat12_40: "#D0E2D0",
  cat12_20: "#E5EFE6",
  cat13: "#DE64BD",
  cat14: "#419393",
  cat15: "#F5996E",
  cat16: "#528BBF",
  cat17: "#EB95AF",
  cat18: "#73BF9C",
  cat19: "#B55984",
  cat20: "#F7B552",
  cat21: "#869F1E",
  cat22: "#A4991C",
  cat23: "#C4931A",
  cat24: "#E68C17",
  cat25: "#F27034",
  cat26: "#FF5252",
  cat27: "#EC3D57",
  cat28: "#D8265D",
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
  backgroundColor: atmosphereLight.atmo2,
  containerBackgroundHover: accentLight.primary_20,
};

const newLight = {
  primary: accentLight.primary,
  primaryAction: accentLight.primary_80,
  primaryStrong: accentLight.primary_80,
  primarySubtle: accentLight.primary_20,
  primaryDimmed: accentLight.primary_20,
  success: semanticLight.positive,
  successAction: semanticLight.positive_80,
  successStrong: semanticLight.positive_120,
  successDimmed: semanticLight.positive_20,
  warning: semanticLight.warning,
  warningAction: semanticLight.warning_120,
  warningStrong: semanticLight.warning_140,
  warningDimmed: semanticLight.warning_20,
  error: semanticLight.negative,
  errorAction: semanticLight.negative_80,
  errorStrong: semanticLight.negative_120,
  errorDimmed: semanticLight.negative_20,
  neutral: semanticLight.neutral,
  neutralAction: semanticLight.neutral,
  neutralStrong: semanticLight.neutral,
  neutralDimmed: semanticLight.neutral_20,

  text: accentLight.secondary,
  textSubtle: accentLight.secondary_80,
  textDisabled: accentLight.secondary_60,
  textDimmed: atmosphereLight.atmo1,
  link: accentLight.primary,
  linkActive: accentLight.primary,

  divider: atmosphereLight.atmo4,
  dividerSubtle: atmosphereLight.atmo3,
  dividerDimmed: atmosphereLight.atmo2,
  bgPage: atmosphereLight.atmo2,
  bgSurface: atmosphereLight.atmo1,
  bgActive: atmosphereLight.atmo3,
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
  shad1: "rgba(0,0,0,.16)",
  shadow: "0 3px 5px rgba(0,0,0,.16)",
};

const utilsDark = {
  backgroundColor: atmosphereDark.atmo2,
  containerBackgroundHover: accentDark.primary_20,
};

const newDark = {
  primary: accentDark.primary,
  primaryAction: accentDark.primary_80,
  primaryStrong: accentDark.primary_80,
  primarySubtle: accentDark.primary_20,
  primaryDimmed: accentDark.primary_20,
  success: semanticDark.positive,
  successAction: semanticDark.positive_80,
  successStrong: semanticDark.positive_120,
  successDimmed: semanticDark.positive_20,
  warning: semanticDark.warning,
  warningAction: semanticDark.warning_120,
  warningStrong: semanticDark.warning_140,
  warningDimmed: semanticDark.warning_20,
  error: semanticDark.negative,
  errorAction: semanticDark.negative_80,
  errorStrong: semanticDark.negative_120,
  errorDimmed: semanticDark.negative_20,
  neutral: semanticDark.neutral,
  neutralAction: semanticDark.neutral,
  neutralStrong: semanticDark.neutral,
  neutralDimmed: semanticDark.neutral_20,

  text: accentDark.secondary,
  textSubtle: accentDark.secondary_80,
  textDisabled: accentDark.secondary_60,
  textDimmed: atmosphereDark.atmo1,
  link: accentDark.primary,
  linkActive: accentDark.primary,

  divider: atmosphereDark.atmo4,
  dividerSubtle: atmosphereDark.atmo3,
  dividerDimmed: atmosphereDark.atmo2,
  bgPage: atmosphereDark.atmo2,
  bgSurface: atmosphereDark.atmo1,
  bgActive: atmosphereDark.atmo3,
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
    ...supportLight,
    ...shadowLight,
    ...utilsLight,
    /** new Pentaho+ colors @internal @deprecated INTERNAL USE ONLY */
    pp: newLight,
  },
  dark: {
    ...accentDark,
    ...atmosphereDark,
    ...semanticDark,
    ...supportDark,
    ...shadowDark,
    ...utilsDark,
    /** new Pentaho+ colors @internal @deprecated INTERNAL USE ONLY */
    pp: newDark,
  },
};

// TODO: remove in favour of `HvColor`/`HvColorAny`?
export type HvAccentColor = keyof typeof accentLight;
export type HvAtmosphereColor = keyof typeof atmosphereLight;
export type HvBaseColor = keyof typeof base;
export type HvSemanticColor = keyof typeof semanticLight;
export type HvSupportColor = keyof typeof supportLight;
export type HvCategoricalColor = keyof typeof categorical;

/** A type with all the accepted colors from the color palette */
export type HvColor =
  | keyof typeof colors.common
  | Exclude<keyof typeof colors.light, "pp">;

/**
 * A type representing an `HvColor` from the palette or any other color string
 * @example "secondary" "brand" "atmo2" "#FF0000" "purple" "inherit"
 * */
export type HvColorAny = HvColor | Property.Color;
