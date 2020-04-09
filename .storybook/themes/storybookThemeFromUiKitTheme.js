import { create } from "@storybook/theming/create";

export default function storybookThemeFromUiKitTheme(theme) {
  return create({
    base: theme.type,

    color: {
      primary: theme.palette.accent.acce2,
      secondary: theme.palette.accent.acce1,
      // tertiary: "#FAFBFC",
      // ancillary: "#22a699",
      // orange: "#FC521F",
      // gold: "#FFAE00",
      // green: "#66BF3C",
      // seafoam: "#37D5D3",
      // purple: "#6F2CAC",
      // ultraviolet: "#2A0481",
      // lightest: "#FFFFFF",
      // lighter: "#F8F8F8",
      // light: "#F3F3F3",
      // mediumlight: "#EEEEEE",
      // medium: "#DDDDDD",
      // mediumdark: "#999999",
      // dark: "#666666",
      // darker: "#444444",
      // darkest: "#333333",
      border: theme.palette.atmosphere.atmo5,
      // positive: "#66BF3C",
      // negative: "#FF4400",
      // warning: "#E69D00",
      // critical: "#FFFFFF",
      defaultText: theme.palette.accent.acce1,
      inverseText: theme.palette.accent.acce0
    },
    colorPrimary: theme.palette.accent.acce2,
    colorSecondary: theme.palette.accent.acce1,
    textColor: theme.palette.accent.acce1,
    textInverseColor: theme.palette.accent.acce0,

    // UI
    background: {
      app: theme.palette.atmosphere.atmo3,
      bar: theme.palette.atmosphere.atmo3,
      content: theme.palette.atmosphere.atmo1
      // gridCellSize: 10,
      // hoverable: "rgba(250,250,252,.1)",
      // positive: "#E1FFD4",
      // negative: "#FEDED2",
      // warning: "#FFF5CF",
      // critical: "#FF4400"
    },
    layoutMargin: 10,
    appBg: theme.palette.atmosphere.atmo3,
    appContentBg: theme.palette.atmosphere.atmo3,
    appBorderColor: theme.palette.atmosphere.atmo5,
    appBorderRadius: 1,
    barTextColor: theme.palette.accent.acce1,
    barSelectedColor: theme.palette.accent.acce1,
    barBg: theme.palette.atmosphere.atmo1,

    // Typography
    typography: {
      fonts: { base: theme.typography.fontFamily.join(", "), mono: "monospace" }
      // weight: { regular: 400, bold: 700, black: 900 },
      // size: { s1: 12, s2: 14, s3: 16, m1: 20, m2: 24, m3: 28, l1: 32, l2: 40, l3: 48, code: 90 }
    },
    fontBase: theme.typography.fontFamily.join(", "),
    fontCode: "monospace",

    // Form colors
    input: {
      border: theme.palette.atmosphere.atmo6,
      background: theme.palette.atmosphere.atmo1,
      color: theme.palette.accent.acce1,
      borderRadius: 1
    },
    inputBg: theme.palette.atmosphere.atmo1,
    inputBorder: theme.palette.atmosphere.atmo6,
    inputTextColor: theme.palette.accent.acce1,
    inputBorderRadius: 1,

    brandTitle: "Hitachi Vantara<br>React UI-Kit",
    brandUrl: undefined,
    brandImage: undefined,

    hv: theme
  });
}
