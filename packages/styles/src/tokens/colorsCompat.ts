const light = {
  base_light: "#CCCCCC",
  base_dark: "#414141",

  // accent
  brand: "#CC0000",
  primary: "#2064B4",
  primary_80: "#1775E0",
  primary_20: "#1775E019",
  secondary: "#414141",
  secondary_80: "#6C6B6B",
  secondary_60: "#999999",

  // atmosphere
  atmo1: "#FBFCFC",
  atmo2: "#F4F5F5",
  atmo3: "#E8E8E8",
  atmo4: "#CCCED0",

  // semantic
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

const dark = {
  base_light: "#CCCCCC",
  base_dark: "#414141",

  // accent
  brand: "#CC0000",
  primary: "#639FE3",
  primary_80: "#82B2E8",
  primary_20: "#82B2E84C",
  secondary: "#CCCCCC",
  secondary_80: "#9A9999",
  secondary_60: "#656565",

  // atmosphere
  atmo1: "#313131",
  atmo2: "#282828",
  atmo3: "#1F1F1F",
  atmo4: "#4B4B4B",

  // semantic
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

export const compatColors = { light, dark };

export type HvThemeColorsCompat = typeof compatColors.light;
