import { create, ThemeVarsPartial } from "@storybook/theming";
import { colors } from "@hitachivantara/uikit-styles";

const getThemeVars = (base: "light" | "dark"): ThemeVarsPartial => ({
  base,

  appBg: colors[base].bgSurface,
  appBorderRadius: 0,
  appContentBg: colors[base].bgSurface,
  barBg: colors[base].bgSurface,
  barSelectedColor: colors[base].primary,
  barTextColor: colors[base].text,
  brandImage: `ui-kit-logo-${base}.png`,
  brandTitle: "NEXT UI Kit",

  colorPrimary: colors[base].primary,
  colorSecondary: colors[base].text,
  fontBase: "'Open Sans',sans-serif",
  fontCode: "monospace",
  textColor: colors[base].text,
  textInverseColor: colors[base === "dark" ? "light" : "dark"].text,
  textMutedColor: colors[base].textSubtle,

  // controls styles
  booleanBg: colors[base].backgroundColor,
  booleanSelectedBg: colors[base].bgSurface,
  buttonBg: colors[base].bgSurface,
  buttonBorder: colors[base].text,
  inputBg: colors[base].bgSurface,
  inputBorder: colors[base].textDisabled,
  inputBorderRadius: 2,
  inputTextColor: colors[base].text,
});

export const themes = {
  wicked: create(getThemeVars("dark")),
  dawn: create(getThemeVars("light")),
};
