import { colors } from "./tokens/colors";
import * as tokens from "./tokens";
import * as themes from "./themes";

// Theme tokens
const flattenTokens = {
  ...tokens,
  colors: { ...tokens.colors.common, ...tokens.colors.light }, // Flatten colors
};

export type ThemeTokens = typeof flattenTokens;

// Theme components
export type ThemeComponents = {
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
    marginIconRight: string;
    marginIconLeft: string;
    semanticColor: string;
    semanticColorDisabled: string;
  };
  header: {
    color: string;
    height: string;
    borderTopThickness: string;
    borderTopColor: string;
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
};

// Theme typography
export type TypographyProps = {
  color?: string;
  fontSize?: string;
  letterSpacing?: string;
  lineHeight?: string;
  fontWeight?: string | number;
  textTransform?: string;
};

export type ThemeTypography = {
  typography: {
    // DS5
    display: TypographyProps;
    title1: TypographyProps;
    title2: TypographyProps;
    title3: TypographyProps;
    title4: TypographyProps;
    label: TypographyProps;
    body: TypographyProps;
    caption1: TypographyProps;
    caption2: TypographyProps;
    // LEGACY UNMAPPABLE (DS3)
    ["5xlTitle"]: TypographyProps;
    ["4xlTitle"]: TypographyProps;
    xxlTitle: TypographyProps;
    lTitle: TypographyProps;
    sTitle: TypographyProps;
    xxsTitle: TypographyProps;
    sectionTitle: TypographyProps;
    placeholderText: TypographyProps;
  };
};

// Theme utils
export type ThemeUtils = {
  spacing: (factor: number) => string;
};

// Theme colors
export type ThemeColors = typeof colors.common & typeof colors.light;

// Theme color modes
export type ThemeColorMode = "dawn" | "wicked";

// Theme structure
export type ThemeStructure = ThemeComponents &
  ThemeTypography &
  Omit<ThemeTokens, "colors"> & {
    colors: {
      modes: {
        [key: string]: ThemeColors;
      };
    };
  };

// Custom theme
export type CustomTheme = ThemeComponents &
  ThemeTypography &
  Partial<Omit<ThemeTokens, "colors">> & {
    colors: {
      modes: {
        [key: string]: ThemeColors;
      };
    };
  };

// Deep string: set all props to strings
export type DeepString<T> = {
  [P in keyof T]: T[P] extends object ? DeepString<T[P]> : string;
};

// Theme CSS vars
export type ThemeVars = DeepString<ThemeTokens> &
  DeepString<ThemeComponents> &
  DeepString<ThemeTypography>;

// Theme: utils + CSS vars
export type Theme = ThemeVars & ThemeUtils;

// Base themes: DS3 and DS5
const baseThemes = { ...themes } as const;
export type BaseTheme = keyof typeof baseThemes;
