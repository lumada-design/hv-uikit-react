import { colors } from "../tokens/colors";
import { makeTheme } from "../makeTheme";
import { Theme } from "../types";

const ds5 = makeTheme((theme: Theme) => ({
  colors: {
    modes: {
      dawn: {
        backgroundColor: colors.light.atmo2,
        ...colors.common,
        ...colors.light,
      },
      wicked: {
        backgroundColor: colors.dark.atmo2,
        ...colors.common,
        ...colors.dark,
      },
    },
  },
  typography: {
    display: {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl4,
      lineHeight: theme.lineHeights.xl3,
    },
    title1: {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl3,
      lineHeight: theme.lineHeights.xl2,
    },
    title2: {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl2,
      lineHeight: theme.lineHeights.xl,
    },
    title3: {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl,
      lineHeight: theme.lineHeights.lg,
    },
    title4: {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
    },
    label: {
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    },
    body: {
      color: theme.colors.acce1,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    },
    caption1: {
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    },
    caption2: {
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.sm,
    },
    // LEGACY
    ["5xlTitle"]: {
      color: theme.colors.acce1,
      fontSize: "52px",
      letterSpacing: "0.02em",
      lineHeight: "60px",
      fontWeight: 600,
    },
    ["4xlTitle"]: {
      color: theme.colors.acce1,
      fontSize: "52px",
      letterSpacing: "0.02em",
      lineHeight: "60px",
      fontWeight: 400,
    },
    xxlTitle: {
      color: theme.colors.acce1,
      fontSize: "42px",
      letterSpacing: "0.02em",
      lineHeight: "52px",
      fontWeight: 400,
    },
    lTitle: {
      color: theme.colors.acce1,
      fontSize: "32px",
      letterSpacing: "0.02em",
      lineHeight: "40px",
      fontWeight: 400,
    },
    sTitle: {
      color: theme.colors.acce1,
      fontSize: "22px",
      letterSpacing: "0.02em",
      lineHeight: "30px",
      fontWeight: 400,
    },
    xxsTitle: {
      color: theme.colors.acce1,
      fontSize: "18px",
      letterSpacing: "0.02em",
      lineHeight: "28px",
      fontWeight: 400,
    },
    sectionTitle: {
      color: theme.colors.acce1,
      fontSize: "14px",
      letterSpacing: "0.32em",
      lineHeight: "18px",
      fontWeight: 400,
      textTransform: "uppercase",
    },
    placeholderText: {
      color: theme.colors.atmo5,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 400,
    },
  },
  dropdown: {
    borderRadius: "2px",
    headerBorder: `1px solid ${theme.colors.acce4}`,
    headerBorderHover: `1px solid ${theme.colors.acce4}`,
    disabledColor: theme.colors.atmo5,
    readOnlyBorder: `1px solid ${theme.colors.acce4}`,
    readOnlyBackgroundColor: theme.colors.atmo1,
    placeholderColor: theme.colors.acce4,
    dropdownHeaderInvalidBorder: `1px solid ${theme.colors.sema4}`,
    dropdownHeaderOpenBorder: `1px solid ${theme.colors.acce1}`,
    listBackgroundColor: theme.colors.atmo1,
    listBorder: `1px solid ${theme.colors.acce1}`,
    listBorderRadius: `0px 0px ${theme.radii.sm} ${theme.radii.sm}`,
    listContainerPadding: theme.space.sm,
    searchContainerMargin: theme.space.xs,
  },
  button: {
    borderRadius: theme.radii.base,
    padding: theme.spacing(["xs", "sm"]),
    marginIconRight: "0px",
    marginIconLeft: "-8px",
    semanticColor: "rgba(251, 252, 252, 0.3)",
    semanticColorDisabled: "rgba(251, 252, 252, 0.1)",
    hoverColor: theme.colors.acce2s,
  },
  header: {
    color: theme.colors.acce1,
    height: "64px",
    borderTopThickness: "0px",
    borderTopColor: "transparent",
    selectedItemBorderTopColor: "transparent",
    selectedItemBorderTopThickness: "0px",
    selectedItemBorderBottomColor: theme.colors.acce1,
    selectedItemBorderBottomThickness: "4px",
    shadow: "none",
  },
  card: {
    iconMargin: "0px",
    outline: `1px solid ${theme.colors.atmo4}`,
    borderRadius: "0px 0px 6px 6px",
    hoverColor: theme.colors.acce2,
  },
  tab: {
    padding: "0 16px",
    hoverBackgroundColor: theme.colors.acce2s,
    hoverBackgroundBorderRadius: "2px",
    hoverUnderlineBackgroundColor: theme.colors.atmo4,
  },
  list: {
    hoverColor: theme.colors.acce2s,
    disabledBackgroundColor: theme.colors.atmo3,
  },
  dialog: {
    borderRadius: "6px",
    margin: "80px",
  },
  baseCheckBox: {
    hoverColor: theme.colors.acce2s,
    borderRadius: "2px",
  },
  checkbox: {
    hoverColor: theme.colors.acce2s,
    borderRadius: "2px",
  },
  baseDropdown: {
    shadow: "none",
    placeholderColor: theme.colors.acce4,
    borderColor: theme.colors.acce4,
    hoverBorderColor: theme.colors.acce2,
    disabledBorderColor: theme.colors.atmo5,
    disabledBackgroundColor: theme.colors.atmo2,
    readOnlyBorder: `1px solid ${theme.colors.atmo5}`,
    readOnlyBackgroundColor: theme.colors.atmo2,
    openBorderColor: theme.colors.acce4,
  },
  baseRadio: {
    hoverColor: theme.colors.acce2s,
    hoverBorderRadius: "2px",
  },
  baseSwitch: {
    padding: 0,
    height: "32px",
    width: "40px",
    track: {
      opacity: 1,
      borderRadius: "15px",
      height: "16px",
      width: "32px",
      border: `solid 1px ${theme.colors.acce1}`,
      backgroundColor: theme.colors.atmo1,
      hoverBackgroundColor: "transparent",
    },
    thumb: {
      width: "12px",
      height: "12px",
      left: "-9px",
      border: `solid 1px ${theme.colors.acce1}`,
      backgroundColor: theme.colors.atmo1,
      marginLeft: "2px",
      marginTop: 0,
      boxShadow: "none",
    },
    disabled: {
      thumbBackgroundColor: theme.colors.atmo3,
      thumbBorder: `solid 1px ${theme.colors.atmo5}`,
      trackBackgroundColor: theme.colors.atmo3,
      trackBorder: `solid 1px ${theme.colors.atmo5}`,
      trackOpacity: 1,
    },
    checkedTrackBackgroundColor: theme.colors.acce1,
    hoverBackgroundColor: theme.colors.acce2s,
    hoverBaseBackgroundColor: "transparent",
    checkedOpacity: 1,
    borderRadius: "2px",
    focusBorderRadius: "8px",
  },
  baseInput: {
    underlineHeight: "0px",
    placeholderColor: theme.colors.acce4,
    borderColor: theme.colors.acce4,
    hoverColor: theme.colors.acce2,
    disabledBorderColor: theme.colors.atmo5,
    disabledTextColor: theme.colors.atmo5,
    disabledBackgroundColor: theme.colors.atmo2,
    readOnlyBorderColor: theme.colors.atmo5,
    readOnlyTextColor: theme.colors.acce4,
    readOnlyBackgroundColor: theme.colors.atmo2,
    multilineBorderColor: theme.colors.acce4,
    multilineDisabledBorderColor: theme.colors.atmo5,
  },
  radio: {
    hoverColor: theme.colors.acce2s,
    borderRadius: "2px",
  },
  tagsInput: {
    disabledBackgroundColor: theme.colors.atmo2,
    readOnlyBackgroundColor: theme.colors.atmo2,
    hoverColor: theme.colors.acce2,
    readOnlyBorderColor: theme.colors.atmo5,
  },
  switch: {
    invalidPaddingBottom: "1px",
  },
  fileUploader: {
    dropZone: {
      borderColor: theme.colors.atmo5,
      backgroundColor: theme.colors.atmo1,
      borderRadius: "6px",
      borderColorDrag: theme.colors.acce2,
      borderColorDisabled: theme.colors.atmo5,
      borderType: "dashed",
    },
    fileList: {
      itemBorder: `1px solid ${theme.colors.atmo4}`,
      itemBorderRadius: "0px 0px 6px 6px",
    },
    file: {
      progressHeight: "4px",
      borderWidth: "2px",
      previewContainerSize: "48px",
      imageSize: "40px",
    },
    preview: {
      buttonSize: "48px",
      overlayColor: theme.colors.acce2s,
      overlayOpacity: "0.6", // TODO: Change to 1 when acce2s is fixed and has an alpha value
      overlayBorderRadius: "2px",
    },
  },
  dropDownMenu: {
    borderRadius: "2px",
    hoverColor: theme.colors.acce2s,
    borderOpened: `1px solid ${theme.colors.acce4}`,
    borderClosed: "1px solid transparent",
    extensionHeight: "0px",
    extensionBorderColor: theme.colors.acce4,
  },
  pagination: {
    pageSizeBorderColor: theme.colors.acce1,
    pageSizeBorderRadius: "2px",
    pageJumpTextAlign: "center",
  },
  actionsGeneric: { buttonSize: "md" },
  bulkActions: {
    separatorDisplay: "flex",
    border: `1px solid ${theme.colors.atmo4}`,
    backgroundColor: theme.colors.atmo2,
    padding: `${theme.space.xs} ${theme.space.md}`,
    anySelectedBackgroundColor: theme.colors.acce2s,
    buttonSize: "md",
  },
  table: {
    headerHoverColor: "transparent",
    headerBorderTopColor: "transparent",
    selectedRowBackgroundColor: theme.colors.acce2s,
    rowBorderColor: theme.colors.atmo4,
    rowBackgroundColor: theme.colors.atmo1,
    rowBorderRadius: theme.radii.md,
    rowStripedBackgroundColor: theme.colors.atmo1,
    rowExpandBackgroundColor: theme.colors.atmo2,
    rowHoverColor: theme.colors.acce2s,
    rowHoverBorderColor: theme.colors.atmo4,
  },
}));

export default ds5;