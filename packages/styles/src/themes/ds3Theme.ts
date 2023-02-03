import { colors, makeTheme, shadows } from "..";

const ds3Theme = makeTheme((theme) => ({
  colors: {
    modes: {
      dawn: { ...colors.common, ...colors.light },
      wicked: { ...colors.common, ...colors.dark },
    },
  },
  space: {
    base: 10,
    xs: "10px",
    sm: "20px",
    md: "30px",
    lg: "60px",
    xl: "90px",
  },
  components: {
    dropdown: {
      borderRadius: "none",
    },
    button: {
      borderRadius: theme.radii.base,
      marginIconRight: "0px",
      marginIconLeft: "-8px",
      semanticColor: "rgba(251, 252, 252, 0.3)",
      semanticColorDisabled: "rgba(251, 252, 252, 0.1)",
    },
    header: {
      color: theme.colors.sema4,
      height: "44px",
      borderTopThickness: "4px",
      borderTopColor: `${theme.colors.sema4}`,
      selectedItemBorderTopColor: theme.colors.acce3,
      selectedItemBorderTopThickness: "2px",
      selectedItemBorderBottomColor: "transparent",
      selectedItemBorderBottomThickness: "0px",
      shadow: theme.shadows.md,
    },
    card: {
      iconMargin: "-24px",
      outline: "none",
      borderRadius: "0px",
      hoverColor: theme.colors.atmo4,
    },
    tab: {
      letterSpacing: "0.02em",
      fontSize: "12px",
      lineHeight: "16px",
      padding: "0 20px",
      hoverBackgroundColor: "transparent",
      hoverBackgroundBorderRadius: "0px",
      hoverUnderlineBackgroundColor: theme.colors.atmo5,
    },
    list: {
      hoverColor: theme.colors.atmo3,
      disabledBackgroundColor: "transparent",
    },
    dialog: {
      borderRadius: "0",
      margin: "100px",
    },
    baseCheckBox: {
      hoverColor: theme.colors.atmo3,
      borderRadius: "0px",
    },
    checkbox: {
      hoverColor: theme.colors.atmo3,
      borderRadius: "0px",
      letterSpacing: "0.02em",
      fontSize: "12px",
    },
    baseDropdown: {
      shadow: shadows.md,
      placeholderColor: theme.colors.atmo5,
      letterSpacing: "0.02em",
      fontSize: "12px",
      lineHeight: "16px",
      borderColor: theme.colors.atmo4,
      hoverBorderColor: theme.colors.acce1,
      disabledBorderColor: theme.colors.atmo4,
      disabledBackgroundColor: theme.colors.atmo3,
      readOnlyBorder: "none",
      readOnlyBackgroundColor: theme.colors.atmo1,
      openBorderColor: theme.colors.atmo1,
    },
    baseRadio: {
      hoverColor: theme.colors.atmo3,
      hoverBorderRadius: 0,
    },
    baseSwitch: {
      padding: 0,
      height: "16px",
      width: "32px",
      track: {
        opacity: 1,
        borderRadius: "15px",
        height: "16px",
        width: "32px",
        border: `solid 1px ${theme.colors.acce1}`,
        backgroundColor: theme.colors.atmo2,
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
      hoverBackgroundColor: "transparent",
      hoverBaseBackgroundColor: "transparent",
      checkedOpacity: 1,
      borderRadius: 0,
      focusBorderRadius: "8px",
    },
    baseInput: {
      underlineHeight: "1px",
      placeholderColor: theme.colors.atmo5,
      borderColor: "none",
      hoverColor: theme.colors.acce1,
      disabledBorderColor: "transparent",
      disabledTextColor: theme.colors.atmo5,
      disabledBackgroundColor: theme.colors.atmo3,
      readOnlyBorderColor: "transparent",
      readOnlyTextColor: theme.colors.acce1,
      readOnlyBackgroundColor: theme.colors.atmo1,
      multilineBorderColor: theme.colors.atmo4,
      multilineDisabledBorderColor: theme.colors.atmo4,
      letterSpacing: "0.02em",
      fontSize: "12px",
      lineHeight: "16px",
    },
    radio: {
      hoverColor: theme.colors.atmo3,
      borderRadius: "0px",
      letterSpacing: "0.02em",
      fontSize: "12px",
    },
    tagsInput: {
      disabledBackgroundColor: theme.colors.atmo1,
      readOnlyBackgroundColor: theme.colors.atmo1,
      hoverColor: theme.colors.acce1,
      readOnlyBorderColor: "transparent",
    },
    switch: {
      invalidPaddingBottom: "0px",
    },
    fileUploader: {
      dropZone: {
        fontSize: "12px",
        lineHeight: "16px",
        letterSpacing: "0.02em",
        borderColor: theme.colors.atmo4,
        backgroundColor: theme.colors.atmo2,
        borderRadius: "0px",
        borderColorDrag: theme.colors.acce1,
        borderColorDisabled: theme.colors.atmo4,
        borderType: "dotted",
      },
      fileList: {
        itemBorder: "none",
        itemBorderRadius: "0px",
      },
      file: {
        fontSize: "12px",
        letterSpacing: "0.02em",
        lineHeight: "16px",
        progressHeight: "2px",
        borderWidth: "1px",
        previewContainerSize: "52px",
        imageSize: "100%",
      },
      preview: {
        buttonSize: "52px",
        overlayColor: theme.colors.atmo3,
        overlayOpacity: "0.75",
        overlayBorderRadius: "0px",
      },
    },
  },
}));

export default ds3Theme;
