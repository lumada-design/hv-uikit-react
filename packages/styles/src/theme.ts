import {
  DeepString,
  HvTheme,
  HvThemeComponents,
  HvThemeTypography,
  HvThemeVars,
  HvThemeTypographyProps,
  HvThemeUtils,
} from "./types";
import * as tokens from "./tokens";
import type { HvColorAny } from "./tokens";
import {
  hasMultipleArgs,
  mapCSSVars,
  spacingUtil,
  spacingUtilOld,
} from "./utils";

const componentsSpec: DeepString<HvThemeComponents> = {
  header: {
    height: "string",
    backgroundColor: "string",
    secondLevelBackgroundColor: "string",
    borderTopThickness: "string",
    selectedItemBorderTopColor: "string",
    selectedItemBorderTopThickness: "string",
    selectedItemBorderBottomColor: "string",
    selectedItemBorderBottomThickness: "string",
    secondLevelSelectedItemBorderTopColor: "string",
    secondLevelSelectedItemBorderTopThickness: "string",
    secondLevelSelectedItemBorderBottomColor: "string",
    secondLevelSelectedItemBorderBottomThickness: "string",
    shadow: "string",
  },
  card: {
    titleVariant: "string",
    subheaderVariant: "string",
    subheaderColor: "string",
  },
  dialog: {
    titleVariant: "string",
  },
  baseSwitch: {
    padding: "string",
    height: "string",
    width: "string",
  },
  bulkActions: {
    actionButtonVariant: "string",
  },
  table: {
    headerBorderTopColor: "string",
    rowBorderColor: "string",
    rowBorderRadius: "string",
    rowListBorderRadius: "string",
    rowListBorderColor: "string",
    rowStripedBackgroundColorEven: "string",
    rowStripedBackgroundColorOdd: "string",
    rowExpandBackgroundColor: "string",
    rowHoverBorderColor: "string",
    rowSortedColor: "string",
    rowSortedColorAlpha: "string",
    cellListBorder: "string",
    cellBorder: "string",
  },
  globalActions: {
    sectionVariant: "string",
  },
  emptyState: {
    titleVariant: "string",
  },
  tooltip: {
    borderRadius: "string",
  },
  verticalNavigation: {
    activeBorderLeft: "string",
    inactiveBorderLeft: "string",
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
  },
  datePicker: {
    placeholderVariant: "string",
  },
  scrollTo: {
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
  queryBuilder: {
    border: "string",
  },
  colorPicker: {
    inputValueVariant: "string",
    recommendedColorsBottomPadding: "string",
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
  snackbar: {
    actionButtonVariant: "string",
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
    containerBackgroundHover: tokens.colors.light.primary_20,
    backgroundColor: tokens.colors.light.atmo2,
    ...tokens.colors.common,
    ...tokens.colors.light,
  }, // Flatten colors and add background color
  ...componentsSpec,
  ...typographySpec,
});

const spacing: HvThemeUtils["spacing"] = (...args) => {
  if (hasMultipleArgs(args)) {
    return args.map(spacingUtil).join(" ");
  }

  const [value] = args;

  switch (typeof value) {
    case "number":
    case "string":
      return spacingUtil(value);
    // TODO: remove in v6
    case "object":
      return value && value.length > 0
        ? value.map(spacingUtilOld).join(" ")
        : "0px";
    default:
      return "0px";
  }
};

export const theme: HvTheme = {
  ...themeVars,
  spacing,
};

const getColorOrFallback = (color: HvColorAny | undefined) => {
  return (color && (theme.colors[color] as string)) || color;
};

/** Get a `color` from the theme palette, or `fallbackColor` if not found */
export const getColor = (
  color: HvColorAny | undefined,
  fallbackColor?: HvColorAny
) => getColorOrFallback(color) || getColorOrFallback(fallbackColor);
