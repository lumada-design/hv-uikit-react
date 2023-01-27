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
    borderRadius: "string",
  },
  checkbox: {
    hoverColor: "string",
    borderRadius: "string",
    letterSpacing: "string",
    fontSize: "string",
  },
  baseDropdown: {
    shadow: "string",
    placeholderColor: "string",
    letterSpacing: "string",
    fontSize: "string",
    lineHeight: "string",
    borderColor: "string",
    hoverBorderColor: "string",
    disabledBorderColor: "string",
    disabledBackgroundColor: "string",
    readOnlyBorder: "string",
    readOnlyBackgroundColor: "string",
    openBorderColor: "string",
  },
  baseRadio: {
    hoverColor: "string",
    hoverBorderRadius: "string",
    disabledColor: "string",
    borderRadius: "string",
    padding: "string",
    focusBorderRadius: "string",
  },
  baseSwitch: {
    padding: "string",
    height: "string",
    width: "string",
    track: {
      opacity: "string",
      borderRadius: "string",
      height: "string",
      width: "string",
      border: "string",
      backgroundColor: "string",
      hoverBackgroundColor: "string",
    },
    thumb: {
      width: "string",
      height: "string",
      left: "string",
      opacity: "string",
      borderRadius: "string",
      border: "string",
      backgroundColor: "string",
      marginLeft: "string",
      marginTop: "string",
      boxShadow: "string",
    },
    disabled: {
      thumbBackgroundColor: "string",
      thumbBorder: "string",

      trackBackgroundColor: "string",
      trackBorder: "string",
      trackOpacity: "string",
    },
    checkedTrackBackgroundColor: "string",
    hoverBackgroundColor: "string",
    hoverBaseBackgroundColor: "string",
    checkedOpacity: "string",
    borderRadius: "string",
    focusBorderRadius: "string",
  },
  baseInput: {
    underlineHeight: "string",
    placeholderColor: "string",
    borderColor: "string",
    hoverColor: "string",
    invalidBorderColor: "string",
    disabledBorderColor: "string",
    disabledTextColor: "string",
    disabledBackgroundColor: "string",
    readOnlyBorderColor: "string",
    readOnlyTextColor: "string",
    readOnlyBackgroundColor: "string",
  },
  radio: {
    display: "string",
    height: "string",
    invalidRadioBottomBorder: "string",

    containerDisplay: "string",
    containerHeight: "string",
    containerTransitionProperty: "string",
    containerTransitionDuration: "string",
    containerTransitionTimingFunction: "string",
    containerTransitionDelay: "string",

    containerHoverBackgroundColor: "string",
    containerFocusBackgroundColor: "string",

    labelOverflow: "string",
    labelTextOverflow: "string",
    labelVerticalAlign: "string",
    labelPaddingRight: "string",
    labelFontWeight: "string",
    labelHeight: "string",
    labelLineHeight: "string",
    labelWidth: "string",
    labelDisabledColor: "string",
  },
  tagsInput: {
    disabledBackgroundColor: "string",
    readOnlyBackgroundColor: "string",
    hoverColor: "string",
    readOnlyBorderColor: "string",
  },
  switch: {
    labelMarginBottom: "string",
    containerHeight: "string",
    containerBorderBottom: "string",
    invalidContainerBorderBottom: "string",
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
