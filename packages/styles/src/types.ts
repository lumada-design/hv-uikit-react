import { colors } from "./tokens/colors";
import * as tokens from "./tokens";
import * as themes from "./themes";
import { CSSProperties } from "react";

// Theme tokens
const flattenTokens = {
  ...tokens,
  colors: {
    type: "light",
    backgroundColor: tokens.colors.light.atmo2,
    ...tokens.colors.common,
    ...tokens.colors.light,
  }, // Flatten colors and add background color
};

export type HvThemeTokens = typeof flattenTokens;

// Theme components
export type HvThemeComponents = {
  dropdown: {
    borderRadius: string;
    headerBorder: string;
    headerBorderHover: string;
    disabledColor: string;
    readOnlyBorder: string;
    readOnlyBackgroundColor: string;
    placeholderColor: string;
    dropdownHeaderInvalidBorder: string;
    dropdownHeaderOpenBorder: string;
    listBackgroundColor: string;
    listBorder: string;
    listBorderRadius: string;
    listContainerPadding: string;
    searchContainerMargin: string;
  };
  button: {
    borderRadius: string;
    padding: string;
    marginIconRight: string;
    marginIconLeft: string;
    semanticColor: string;
    semanticColorDisabled: string;
    hoverColor: string;
    secondaryBackgroundColor: string;
  };
  header: {
    color: string;
    height: string;
    backgroundColor: string;
    secondLevelBackgroundColor: string;
    hoverColor: string;
    borderTopThickness: string;
    borderTopColor: string;
    selectedItemColor: string;
    selectedItemBackgroundColor: string;
    selectedItemBorderTopColor: string;
    selectedItemBorderTopThickness: string;
    selectedItemBorderBottomColor: string;
    selectedItemBorderBottomThickness: string;
    shadow: string;
  };
  card: {
    iconMargin: string;
    outline: string;
    borderRadius: string;
    hoverColor: string;
    backgroundColor: string;
    titleVariant: keyof HvThemeTypography["typography"];
    subheaderVariant: keyof HvThemeTypography["typography"];
    subheaderColor: string;
  };
  tab: {
    padding: string;
    hoverBackgroundColor: string;
    hoverBackgroundBorderRadius: string;
    hoverUnderlineBackgroundColor: string;
  };
  list: {
    hoverColor: string;
    disabledBackgroundColor: string;
  };
  dialog: {
    borderRadius: string;
    margin: string;
    titleVariant: keyof HvThemeTypography["typography"];
  };
  baseCheckBox: {
    hoverColor: string;
    borderRadius: string;
  };
  checkbox: {
    hoverColor: string;
    borderRadius: string;
  };
  baseDropdown: {
    shadow: string;
    placeholderColor: string;
    borderColor: string;
    hoverBorderColor: string;
    disabledBorderColor: string;
    disabledBackgroundColor: string;
    readOnlyBorder: string;
    readOnlyBackgroundColor: string;
    openBorderColor: string;
  };
  baseRadio: {
    hoverColor: string;
    hoverBorderRadius: string;
  };
  baseSwitch: {
    padding: number;
    height: string;
    width: string;
    track: {
      opacity: number;
      borderRadius: string;
      height: string;
      width: string;
      border: string;
      backgroundColor: string;
      hoverBackgroundColor: string;
    };
    thumb: {
      width: string;
      height: string;
      left: string;
      border: string;
      backgroundColor: string;
      marginLeft: string;
      marginTop: number;
      boxShadow: string;
    };
    disabled: {
      thumbBackgroundColor: string;
      thumbBorder: string;
      trackBackgroundColor: string;
      trackBorder: string;
      trackOpacity: number;
    };
    checkedTrackBackgroundColor: string;
    hoverBackgroundColor: string;
    hoverBaseBackgroundColor: string;
    checkedOpacity: number;
    borderRadius: string;
    focusBorderRadius: string;
  };
  baseInput: {
    underlineHeight: string;
    placeholderColor: string;
    borderColor: string;
    hoverColor: string;
    disabledBorderColor: string;
    disabledTextColor: string;
    disabledBackgroundColor: string;
    readOnlyBorderColor: string;
    readOnlyTextColor: string;
    readOnlyBackgroundColor: string;
    multilineBorderColor: string;
    multilineDisabledBorderColor: string;
  };
  radio: {
    hoverColor: string;
    borderRadius: string;
  };
  tagsInput: {
    borderColor: string;
    disabledBackgroundColor: string;
    readOnlyBackgroundColor: string;
    hoverColor: string;
    readOnlyBorderColor: string;
  };
  switch: {
    invalidPaddingBottom: string;
  };
  fileUploader: {
    dropZone: {
      borderColor: string;
      backgroundColor: string;
      borderRadius: string;
      borderColorDrag: string;
      borderColorDisabled: string;
      borderType: string;
    };
    fileList: {
      itemBorder: string;
      itemBorderRadius: string;
    };
    file: {
      progressHeight: string;
      borderWidth: string;
      previewContainerSize: string;
      imageSize: string;
    };
    preview: {
      buttonSize: string;
      overlayColor: string;
      overlayOpacity: string;
      overlayBorderRadius: string;
    };
  };
  dropDownMenu: {
    borderRadius: string;
    hoverColor: string;
    borderOpened: string;
    borderClosed: string;
    extensionHeight: string;
    extensionBorderColor: string;
  };
  pagination: {
    pageSizeBorderColor: string;
    pageSizeBorderRadius: string;
    pageJumpTextAlign: string;
  };
  actionsGeneric: { buttonSize: string };
  bulkActions: {
    separatorDisplay: string;
    border: string;
    backgroundColor: string;
    padding: string;
    anySelectedBackgroundColor: string;
    buttonSize: string;
  };
  table: {
    headerHoverColor: string;
    headerBorderTopColor: string;
    selectedRowBackgroundColor: string;
    rowBorderColor: string;
    rowBackgroundColor: string;
    rowBorderRadius: string;
    rowStripedBackgroundColor: string;
    rowExpandBackgroundColor: string;
    rowHoverColor: string;
    rowHoverBorderColor: string;
  };
  calendar: {
    border: string;
    borderRadius: string;
    cellHoverColor: string;
    headerInputBorderBottom: string;
    headerInputBorderTop: string;
    headerInputBorderLeft: string;
    headerInputBorderRight: string;
    headerInputFontColor: string;
    headerInputFontSize: string;
    headerInputFontLetterSpacing: string;
    headerInputFontLineHeight: string;
    headerInputFontWeight: string;
  };
  globalActions: {
    sectionVariant: keyof HvThemeTypography["typography"];
  };
  emptyState: {
    titleVariant: keyof HvThemeTypography["typography"];
    titleMarginTop: string;
  };
  tooltip: {
    borderRadius: string;
  };
};

// Theme typography
export type HvTypographyProps = Pick<
  CSSProperties,
  "color" | "fontSize" | "letterSpacing" | "lineHeight" | "fontWeight"
>;

export type HvThemeTypography = {
  typography: {
    // DS5
    display: HvTypographyProps;
    title1: HvTypographyProps;
    title2: HvTypographyProps;
    title3: HvTypographyProps;
    title4: HvTypographyProps;
    label: HvTypographyProps;
    body: HvTypographyProps;
    caption1: HvTypographyProps;
    caption2: HvTypographyProps;
    // LEGACY UNMAPPABLE (DS3)
    ["5xlTitle"]: HvTypographyProps;
    ["4xlTitle"]: HvTypographyProps;
    xxlTitle: HvTypographyProps;
    lTitle: HvTypographyProps;
    sTitle: HvTypographyProps;
    xxsTitle: HvTypographyProps;
    sectionTitle: HvTypographyProps;
    placeholderText: HvTypographyProps;
  };
};

// Breakpoints
export type HvThemeBreakpoint = Exclude<keyof typeof tokens.space, "base">;

// Theme utils
export type HvThemeUtils = {
  spacing: (
    value:
      | string
      | number
      | HvThemeBreakpoint
      | (string | number | HvThemeBreakpoint)[]
  ) => string;
};

// Theme colors
export type HvThemeColors = typeof colors.common & typeof colors.light;

// Theme color modes
export type HvThemeColorMode = "dawn" | "wicked";

// Theme color mode type
export type HvThemeColorModeType = "light" | "dark";

// Theme color mode structure
export type HvThemeColorModeStructure = HvThemeColors & {
  backgroundColor: string;
  type: HvThemeColorModeType;
};

// Theme structure
export type HvThemeStructure = HvThemeComponents &
  HvThemeTypography &
  Omit<HvThemeTokens, "colors"> & {
    colors: {
      modes: {
        [key: string]: HvThemeColorModeStructure;
      };
    };
  };

// Custom theme
export type HvCustomTheme = HvThemeComponents &
  HvThemeTypography &
  Partial<Omit<HvThemeTokens, "colors">> & {
    colors: {
      modes: {
        [key: string]: HvThemeColorModeStructure;
      };
    };
  };

// Deep string: set all props to strings
export type DeepString<T> = {
  [P in keyof T]: T[P] extends object ? DeepString<T[P]> : string;
};

// Theme CSS vars
export type HvThemeVars = DeepString<HvThemeTokens> &
  DeepString<HvThemeComponents> &
  DeepString<HvThemeTypography>;

// Theme: utils + CSS vars
export type HvTheme = HvThemeVars & HvThemeUtils;

// Base themes: DS3 and DS5
const baseThemes = { ...themes } as const;
export type HvBaseTheme = keyof typeof baseThemes;
