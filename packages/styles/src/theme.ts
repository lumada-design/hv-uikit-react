/* eslint-disable @typescript-eslint/no-unused-vars */
import * as tokens from "./tokens";
import { mapCSSVars } from "./utils";

const componentsSpec = {
  dropdown: {
    borderRadius: "string",
  },
  button: {
    borderRadius: "string",
    marginIconRight: "string",
    marginIconLeft: "string",
    semanticColor: "string",
    semanticColorDisabled: "string",
  },
  header: {
    color: "string",
    height: "string",
    borderTopThickness: "string",
    borderTopColor: "string",
    selectedItemBorderTopColor: "string",
    selectedItemBorderTopThickness: "string",
    selectedItemBorderBottomColor: "string",
    selectedItemBorderBottomThickness: "string",
    shadow: "string",
  },
  card: {
    iconMargin: "string",
    outline: "string",
    borderRadius: "string",
    hoverColor: "string",
  },
  tab: {
    letterSpacing: "string",
    fontSize: "string",
    lineHeight: "string",
    padding: "string",
    hoverBackgroundColor: "string",
    hoverBackgroundBorderRadius: "string",
    hoverUnderlineBackgroundColor: "string",
  },
  list: {
    hoverColor: "string",
    disabledBackgroundColor: "string",
  },
  dialog: {
    borderRadius: "string",
    margin: "string",
  },
  baseCheckBox: {
    hoverColor: "string",
  },
  baseRadio: {
    hoverColor: "string",
    hoverBorderRadius: "string",
    disabledColor: "string",
    borderRadius: "string",
    padding: "string",
    focusBorderRadius: "string",
  },
};

const keys = [...Object.keys(tokens.breakpoints.values)];

const themeUtils = {
  spacing: (factor: number): string =>
    `calc(${tokens.space.base} * ${factor}px)`,
};

const themeVars = mapCSSVars({
  ...tokens,
  colors: { ...tokens.colors.common, ...tokens.colors.light }, // flatten colors
  ...componentsSpec,
});

export const theme = {
  ...themeVars,
  ...themeUtils,
  // The line below is needed because both `themeVars` and `themeUtils` have a `breakpoints` prop
  // and the one from the utils was replacing the values on the vars.
  breakpoints: { ...themeVars.breakpoints },
};
