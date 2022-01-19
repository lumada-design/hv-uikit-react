import { create } from "@storybook/theming/create";

export default (theme) =>
  create({
    base: theme.type,

    // Storybook-specific color palette
    colorPrimary: theme.palette.accent.acce2,
    colorSecondary: theme.palette.accent.acce1,

    // UI
    appBg: theme.palette.atmosphere.atmo3,
    appContentBg: theme.palette.atmosphere.atmo2,
    appBorderColor: theme.palette.atmosphere.atmo4,
    appBorderRadius: 2,

    // Fonts
    fontBase: theme.typography.fontFamily.join(", "),
    fontCode: "monospace",

    // Text colors
    textColor: theme.palette.accent.acce1,
    textInverseColor: theme.palette.accent.acce0,
    textMutedColor: theme.palette.accent.acce1,

    // Toolbar default and active colors
    barTextColor: theme.palette.accent.acce1,
    barSelectedColor: theme.palette.accent.acce1,
    barBg: theme.palette.atmosphere.atmo2,

    // Form colors
    inputBg: theme.palette.atmosphere.atmo1,
    inputBorder: theme.palette.atmosphere.atmo6,
    inputTextColor: theme.palette.accent.acce1,
    inputBorderRadius: 1,

    brandTitle: "Hitachi Vantara<br>React UI Kit",
    brandUrl: undefined,
    brandImage: undefined,

    gridCellSize: 10,

    hv: theme,
  });
