import {
  DeepString,
  HvTheme,
  HvThemeComponents,
  HvThemeBreakpoint,
  HvThemeTypography,
  HvThemeVars,
  HvThemeTypographyProps,
} from "./types";
import * as tokens from "./tokens";
import { mapCSSVars } from "./utils";

const componentsSpec: DeepString<HvThemeComponents> = {
  dropdown: {
    borderRadius: "string",
    headerBorder: "string",
    headerBorderHover: "string",
    disabledColor: "string",
    readOnlyBorder: "string",
    readOnlyBackgroundColor: "string",
    placeholderColor: "string",
    dropdownHeaderInvalidBorder: "string",
    dropdownHeaderOpenBorder: "string",
    listBackgroundColor: "string",
    listBorder: "string",
    listBorderRadius: "string",
    listContainerPadding: "string",
    searchContainerMargin: "string",
  },
  button: {
    borderRadius: "string",
    padding: "string",
    marginIconRight: "string",
    marginIconLeft: "string",
    semanticColor: "string",
    semanticColorDisabled: "string",
    hoverColor: "string",
    secondaryBackgroundColor: "string",
    secondarySubtleBorderColor: "string",
  },
  header: {
    color: "string",
    brandColor: "string",
    height: "string",
    backgroundColor: "string",
    secondLevelBackgroundColor: "string",
    secondLevelHeight: "string",
    hoverColor: "string",
    borderTopThickness: "string",
    borderTopColor: "string",
    selectedItemColor: "string",
    selectedItemBackgroundColor: "string",
    selectedItemBorderTopColor: "string",
    selectedItemBorderTopThickness: "string",
    selectedItemBorderBottomColor: "string",
    selectedItemBorderBottomThickness: "string",
    secondLevelSelectedItemBorderTopColor: "string",
    secondLevelSelectedItemBorderTopThickness: "string",
    secondLevelSelectedItemBorderBottomColor: "string",
    secondLevelSelectedItemBorderBottomThickness: "string",
    shadow: "string",
    secondLevelItemColor: "string",
    secondLevelSelectedItemColor: "string",
    secondLevelSelectedItemBackgroundColor: "string",
  },
  card: {
    iconMargin: "string",
    outline: "string",
    borderRadius: "string",
    hoverColor: "string",
    backgroundColor: "string",
    titleVariant: "string",
    subheaderVariant: "string",
    subheaderColor: "string",
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
    titleVariant: "string",
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
    borderColor: "string",
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
    pageSizeHoverBorderColor: "string",
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
  table: {
    headerHoverColor: "string",
    headerBorderTopColor: "string",
    selectedRowBackgroundColor: "string",
    rowBorderColor: "string",
    rowBackgroundColor: "string",
    rowBorderRadius: "string",
    rowListBackgroundColor: "string",
    rowListBorderRadius: "string",
    rowListBorderColor: "string",
    rowStripedBackgroundColorEven: "string",
    rowStripedBackgroundColorOdd: "string",
    rowExpandBackgroundColor: "string",
    rowHoverColor: "string",
    rowHoverBorderColor: "string",
    rowSortedColor: "string",
    rowSortedColorAlpha: "string",
    cellPaddingTop: "string",
    cellPaddingBottom: "string",
    cellListBorder: "string",
    cellBorder: "string",
  },
  calendar: {
    border: "string",
    borderRadius: "string",
    cellHoverColor: "string",
    headerInputBorderBottom: "string",
    headerInputBorderTop: "string",
    headerInputBorderLeft: "string",
    headerInputBorderRight: "string",
    headerInputFontColor: "string",
    headerInputFontSize: "string",
    headerInputFontLetterSpacing: "string",
    headerInputFontLineHeight: "string",
    headerInputFontWeight: "string",
  },
  globalActions: {
    sectionVariant: "string",
  },
  emptyState: {
    titleVariant: "string",
    titleMarginTop: "string",
  },
  tooltip: {
    borderRadius: "string",
  },
  verticalNavigation: {
    justifyContent: "string",
    hoverColor: "string",
    activeBorderLeft: "string",
    inactiveBorderLeft: "string",
    actionsMarginTop: "string",
  },
  slider: {
    dragBarColor: "string",
    ringColor: "string",
    ringOpacity: "string",
  },
  stepNavigation: {
    separatorMargin: "string",
    defaultSeparatorHeight: "string",
    simpleSeparatorHeight: "string",
  },
  filterGroup: {
    applyButtonVariant: "string",
    cancelButtonVariant: "string",
    applyButtonMarginRight: "string",
    panelsBorder: "string",
    panelsBorderBottom: "string",
    actionBarBorder: "string",
    actionBarBorderTop: "string",
    rightPanelBorderLeft: "string",
    rightPanelShadow: "string",
    partialCounterFontWeight: "string",
  },
  multiButton: {
    disabledBackgroundColor: "string",
  },
  datePicker: {
    panelBorder: "string",
    panelBackgroundColor: "string",
    dropdownHeaderOpenBorder: "string",
    dropdownPlaceholderColor: "string",
    placeholderVariant: "string",
  },
  scrollTo: {
    horizontal: {
      dotDisplay: "string",
      buttonHeight: "string",
      buttonHoverBackgroundColor: "string",
      buttonBottomBorder: "string",
      selectedButtonBottomBorder: "string",
      textPadding: "string",
      textMaxWidth: "string",
    },
    dotRootSize: "string",
    dotRootRadius: "string",
    dotHoverBackgroundColor: "string",
    dotHoverColor: "string",
    dotHoverSize: "string",
    dotNotSelectedColor: "string",
    dotNotSelectedSize: "string",
    dotSelectedSize: "string",
    backgroundColorOpacity: "string",
    backgroundColorBlur: "string",
  },
  inlineEditor: {
    hoverBorderColor: "string",
    activeBorderColor: "string",
    borderWidth: "string",
  },
  queryBuilder: {
    ruleSubGroupLeftConnectorPosition: "string",
    ruleSubGroupContainerLeftConnectorPosition: "string",
    ruleLeftConnectorPosition: "string",
    ruleConnectorHorizontalSize: "string",
    ruleConnectorHeight: "string",
    actionsContainerMarginTop: "string",
    topActionButtonContainerBottom: "string",
    topActionButtonContainerRight: "string",
    topGroupPaddingBottom: "string",
    border: "string",
  },
  colorPicker: {
    inputValueVariant: "string",
    panelBorder: "string",
    panelBorderRadius: "string",
    panelMinWidth: "string",
    panelPadding: "string",
    pickersFlexDirection: "string",
    hueHeight: "string",
    hueWidth: "string",
    hueDirection: "string",
    hueMarginTop: "string",
    hueBorderRadius: "string",
    hueSliderWidth: "string",
    hueSliderHeight: "string",
    hueSliderBorderRadius: "string",
    hueSliderBackground: "string",
    hueSliderBorder: "string",
    hueSliderMarginLeft: "string",
    saturationWidth: "string",
    saturationHeight: "string",
    saturationMarginRight: "string",
    saturationBorderRadius: "string",
    saturationPointerWidth: "string",
    saturationPointerHeight: "string",
    colorPickerWidth: "string",
    recommendedColorsRootWidth: "string",
    recommendedColorsWidth: "string",
    recommendedColorsMargin: "string",
    recommendedColorsBottomPadding: "string",
    recommendedColorsSwatchWidth: "string",
    recommendedColorsSwatchHeight: "string",
    recommendedColorsSwatchMargin: "string",
    recommendedColorsSwatchBorderRadius: "string",
    fieldsPaddingTop: "string",
    fieldsMarginRight: "string",
    fieldsHexPaddingRight: "string",
    fieldsRgbPaddingLeft: "string",
    fieldsHexWidth: "string",
    fieldsRgbWidth: "string",
    addSavedColorButtonMargin: "string",
    addSavedColorButtonWidth: "string",
    addSavedColorButtonHeight: "string",
    savedColorsWidth: "string",
    savedColorsMargin: "string",
    savedColorsSwatchWidth: "string",
    savedColorsSwatchHeight: "string",
    savedColorsSwatchMargin: "string",
    savedColorsSwatchBorderRadius: "string",
  },
  carousel: {
    xsControlsDisplay: "string",
    counterContainerDisplay: "string",
    actionsOffsetTop: "string",
    mainContainerFlexDirection: "string",
    controlsBorder: "string",
    controlsBackgroundColor: "string",
    controlsJustifyContent: "string",
    thumbnailBorderRadius: "string",
    thumbnailSelectedBorder: "string",
  },
  drawer: {
    backDropBackgroundColor: "string",
  },
  forms: {
    infoMessage: {
      textColor: "string",
    },
    label: {
      fontWeight: "string",
    },
  },
};

const typographyProps: DeepString<HvThemeTypographyProps> = {
  color: "string",
  fontSize: "string",
  letterSpacing: "string",
  lineHeight: "string",
  fontWeight: "string",
  textDecoration: "string",
};

const typographySpec: DeepString<HvThemeTypography> = {
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
    "5xlTitle": { ...typographyProps },
    "4xlTitle": { ...typographyProps },
    xxlTitle: { ...typographyProps },
    lTitle: { ...typographyProps },
    sTitle: { ...typographyProps },
    xxsTitle: { ...typographyProps },
    sectionTitle: { ...typographyProps },
    placeholderText: { ...typographyProps },
    link: { ...typographyProps },
    disabledText: { ...typographyProps },
    selectedNavText: { ...typographyProps },
    vizTextDisabled: { ...typographyProps },
    xsInlineLink: { ...typographyProps },
  },
};

const themeVars: HvThemeVars = mapCSSVars({
  ...tokens,
  colors: {
    type: "light",
    backgroundColor: tokens.colors.light.atmo2,
    ...tokens.colors.common,
    ...tokens.colors.light,
  }, // Flatten colors and add background color
  ...componentsSpec,
  ...typographySpec,
});

const spacing = (
  value:
    | string
    | number
    | HvThemeBreakpoint
    | (string | number | HvThemeBreakpoint)[]
): string => {
  switch (typeof value) {
    case "number":
      return `calc(${themeVars.space.base} * ${value}px)`;
    case "string":
      return themeVars.space[value] || value;
    case "object":
      return value && value.length > 0
        ? value
            .map((x) => {
              switch (typeof x) {
                case "number":
                  return `${x}px`;
                case "string":
                  return themeVars.space[x] || x;
                default:
                  return "0px";
              }
            })
            .join(" ")
        : "0px";
    default:
      return "0px";
  }
};

export const theme: HvTheme = {
  ...themeVars,
  spacing,
};
