import {
  DeepString,
  Theme,
  ThemeComponents,
  ThemeTypography,
  ThemeUtils,
  ThemeVars,
  TypographyProps,
} from "./types";
import * as tokens from "./tokens";
import { mapCSSVars } from "./utils";

const componentsSpec: DeepString<ThemeComponents> = {
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
  },
  baseDropdown: {
    shadow: "string",
    placeholderColor: "string",
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
  },
  radio: {
    hoverColor: "string",
    borderRadius: "string",
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
  dropDownMenu: {
    borderRadius: "string",
    hoverColor: "string",
    borderOpened: "string",
    borderClosed: "string",
    extensionHeight: "string",
    extensionBorderColor: "string",
  },
  pagination: {
    pageSizeBorderColor: "string",
    pageSizeBorderRadius: "string",
    pageJumpTextAlign: "string",
  },
  actionsGeneric: { buttonSize: "string" },
  bulkActions: {
    separatorDisplay: "string",
    border: "string",
    backgroundColor: "string",
    padding: "string",
    anySelectedBackgroundColor: "string",
    buttonSize: "string",
  },
};

const typographyProps: DeepString<TypographyProps> = {
  color: "string",
  fontSize: "string",
  letterSpacing: "string",
  lineHeight: "string",
  fontWeight: "string",
};

const typographySpec: DeepString<ThemeTypography> = {
  typography: {
    // DS5
    display: { ...typographyProps },
    title1: { ...typographyProps },
    title2: { ...typographyProps },
    title3: { ...typographyProps },
    title4: { ...typographyProps },
    label: { ...typographyProps },
    body: { ...typographyProps },
    caption1: { ...typographyProps },
    caption2: { ...typographyProps },
    // LEGACY UNMAPPABLE (DS3)
    ["5xlTitle"]: { ...typographyProps },
    ["4xlTitle"]: { ...typographyProps },
    xxlTitle: { ...typographyProps },
    lTitle: { ...typographyProps },
    sTitle: { ...typographyProps },
    xxsTitle: { ...typographyProps },
    sectionTitle: { ...typographyProps },
    placeholderText: { ...typographyProps },
  },
};

const themeUtils: ThemeUtils = {
  spacing: (factor: number): string =>
    `calc(${tokens.space.base} * ${factor}px)`,
};

const themeVars: ThemeVars = mapCSSVars({
  ...tokens,
  colors: { ...tokens.colors.common, ...tokens.colors.light }, // Flatten colors
  ...componentsSpec,
  ...typographySpec,
});

export const theme: Theme = {
  ...themeVars,
  ...themeUtils,
};
