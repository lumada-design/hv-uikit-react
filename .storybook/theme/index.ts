import { colors } from "@hitachivantara/uikit-styles";

import { create } from "@storybook/theming/create";

const common = {
  appBorderRadius: 0,
  fontBase: "'Open Sans',sans-serif",
  brandTitle: "NEXT UI Kit",
};

export const themes = {
  wicked: create({
    ...common,
    base: "dark",
    appBg: colors.dark.atmo1,
    appContentBg: colors.dark.atmo1,
    textColor: colors.dark.secondary,
    textInverseColor: colors.light.secondary,
    colorSecondary: colors.dark.primary,
    barTextColor: colors.dark.secondary,
    barSelectedColor: colors.dark.primary,
    barBg: colors.dark.atmo1,
    brandImage: "ui-kit-logo-dark.png",
  }),
  dawn: create({
    ...common,
    base: "light",
    appBg: colors.light.atmo1,
    appContentBg: colors.light.atmo1,
    textColor: colors.light.secondary,
    textInverseColor: colors.dark.secondary,
    colorSecondary: colors.light.primary,
    barTextColor: colors.light.secondary,
    barSelectedColor: colors.light.primary,
    barBg: colors.light.atmo1,
    brandImage: "ui-kit-logo-light.png",
  }),
};
