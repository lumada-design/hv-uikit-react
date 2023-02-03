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
    disabledBorderColor: "string",
    disabledTextColor: "string",
    disabledBackgroundColor: "string",
    readOnlyBorderColor: "string",
    readOnlyTextColor: "string",
    readOnlyBackgroundColor: "string",
    multilineBorderColor: "string",
    multilineDisabledBorderColor: "string",
    letterSpacing: "string",
    fontSize: "string",
    lineHeight: "string",
  },
  radio: {
    hoverColor: "string",
    borderRadius: "string",
    letterSpacing: "string",
    fontSize: "string",
  },
  tagsInput: {
    disabledBackgroundColor: "string",
    readOnlyBackgroundColor: "string",
    hoverColor: "string",
    readOnlyBorderColor: "string",
  },
  switch: {
    invalidPaddingBottom: "string",
  },
  fileUploader: {
    dropZone: {
      fontSize: "string",
      lineHeight: "string",
      letterSpacing: "string",
      borderColor: "string",
      backgroundColor: "string",
      borderRadius: "string",
      borderColorDrag: "string",
      borderColorDisabled: "string",
      borderType: "string",
    },
    fileList: {
      itemBorder: "string",
      itemBorderRadius: "string",
    },
    file: {
      fontSize: "string",
      letterSpacing: "string",
      lineHeight: "string",
      progressHeight: "string",
      borderWidth: "string",
      previewContainerSize: "string",
      imageSize: "string",
    },
    preview: {
      buttonSize: "string",
      overlayColor: "string",
      overlayOpacity: "string",
      overlayBorderRadius: "string",
    },
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
