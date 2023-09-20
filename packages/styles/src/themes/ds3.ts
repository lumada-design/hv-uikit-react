import { css } from "@emotion/css";
import { colors } from "../tokens/colors";
import { makeTheme } from "../makeTheme";

const ds3 = makeTheme((theme) => ({
  name: "ds3",
  colors: {
    modes: {
      dawn: {
        type: "light",
        backgroundColor: "#F0F0F0",
        containerBackgroundHover: theme.colors.atmo3,
        ...colors.common,
        ...colors.light,
        primary_80: "#477DBD",
        atmo2: "#F0F0F0",
        neutral: "#4D9284",
        catastrophic: "#C51162",
        cat1: "#6EAFFF",
        cat2: "#FFAB5C",
        cat3: "#5CD1B2",
        cat4: "#9672C1",
        cat5: "#ED6868",
        cat6: "#58C9DD",
        cat7: "#FFDB70",
        cat8: "#4AB573",
        cat9: "#646A98",
        cat10: "#EB7397",
        cat11: "#33ABCC",
        cat12: "#F8C169",
      },
      wicked: {
        type: "dark",
        backgroundColor: colors.dark.atmo2,
        containerBackgroundHover: theme.colors.atmo3,
        ...colors.common,
        ...colors.dark,
        positive: "#63A621",
        neutral: "#72CCCB",
        catastrophic: "#E26BD2",
        cat1: "#6EAFFF",
        cat2: "#FFAB5C",
        cat3: "#5CD1B2",
        cat4: "#9672C1",
        cat5: "#ED6868",
        cat6: "#58C9DD",
        cat7: "#FFDB70",
        cat8: "#4AB573",
        cat9: "#646A98",
        cat10: "#EB7397",
        cat11: "#33ABCC",
        cat12: "#F8C169",
      },
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
  breakpoints: {
    unit: "px",
    step: 5,
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1270,
      xl: 1920,
    },
  },
  typography: {
    display: {
      color: theme.colors.secondary,
      fontSize: "42px",
      letterSpacing: "0.02em",
      lineHeight: "52px",
      fontWeight: 600,
    },
    title1: {
      color: theme.colors.secondary,
      fontSize: "32px",
      letterSpacing: "0.02em",
      lineHeight: "40px",
      fontWeight: 600,
    },
    title2: {
      color: theme.colors.secondary,
      fontSize: "22px",
      letterSpacing: "0.02em",
      lineHeight: "30px",
      fontWeight: 600,
    },
    title3: {
      color: theme.colors.secondary,
      fontSize: "18px",
      letterSpacing: "0.02em",
      lineHeight: "28px",
      fontWeight: 600,
    },
    title4: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
    },
    label: {
      color: theme.colors.secondary,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    body: {
      color: theme.colors.secondary,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 400,
    },
    caption1: {
      color: theme.colors.secondary,
      fontSize: "10px",
      letterSpacing: "0.02em",
      lineHeight: "15px",
      fontWeight: 400,
    },
    caption2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.sm,
    },
    // LEGACY
    "5xlTitle": {
      color: theme.colors.secondary,
      fontSize: "52px",
      letterSpacing: "0.02em",
      lineHeight: "60px",
      fontWeight: 600,
    },
    "4xlTitle": {
      color: theme.colors.secondary,
      fontSize: "52px",
      letterSpacing: "0.02em",
      lineHeight: "60px",
      fontWeight: 400,
    },
    xxlTitle: {
      color: theme.colors.secondary,
      fontSize: "42px",
      letterSpacing: "0.02em",
      lineHeight: "52px",
      fontWeight: 400,
    },
    lTitle: {
      color: theme.colors.secondary,
      fontSize: "32px",
      letterSpacing: "0.02em",
      lineHeight: "40px",
      fontWeight: 400,
    },
    sTitle: {
      color: theme.colors.secondary,
      fontSize: "22px",
      letterSpacing: "0.02em",
      lineHeight: "30px",
      fontWeight: 400,
    },
    xxsTitle: {
      color: theme.colors.secondary,
      fontSize: "18px",
      letterSpacing: "0.02em",
      lineHeight: "28px",
      fontWeight: 400,
    },
    sectionTitle: {
      color: theme.colors.secondary,
      fontSize: "14px",
      letterSpacing: "0.32em",
      lineHeight: "18px",
      fontWeight: 400,
      textTransform: "uppercase",
    },
    placeholderText: {
      color: theme.colors.secondary_60,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 400,
    },
    link: {
      color: theme.colors.primary,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    disabledText: {
      color: theme.colors.secondary_60,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    selectedNavText: {
      color: theme.colors.brand,
      fontSize: "12px",
      letterSpacing: "0.02em",
      lineHeight: "16px",
      fontWeight: 600,
    },
    vizTextDisabled: {
      color: theme.colors.secondary_60,
      fontSize: "10px",
      letterSpacing: "0.02em",
      lineHeight: "15px",
      fontWeight: 400,
    },
    xsInlineLink: {
      color: theme.colors.primary,
      fontSize: "10px",
      letterSpacing: "0.02em",
      lineHeight: "15px",
      fontWeight: 600,
      textDecoration: "underline",
    },
  },
  border: {
    // border: `1px solid ${theme.colors.atmo4}`,
    width: "1px",
    color: theme.colors.atmo4,
    style: "solid",
  },
  components: {
    HvActionBar: {
      classes: {
        root: {
          borderTop: `3px solid ${theme.colors.atmo2}`,
        },
      },
    },
    HvBaseCheckBox: {
      classes: {
        root: {
          borderRadius: "0px",
        },
      },
    },
    HvBaseDropdown: {
      classes: {
        header: {
          border: `1px solid ${theme.colors.atmo4}`,
          "&:hover": {
            border: `1px solid ${theme.colors.secondary}`,
          },
          "&:focus-visible": {
            border: `1px solid ${theme.colors.secondary}`,
          },
        },
        headerOpen: {
          border: "1px solid transparent",
          boxShadow: theme.colors.shadow,
          "&:hover": {
            border: "1px solid transparent",
            boxShadow: theme.colors.shadow,
          },
        },
        headerDisabled: {
          border: `1px solid ${theme.colors.atmo4}`,
          background: theme.colors.atmo3,
          "&:hover": {
            border: `1px solid ${theme.colors.atmo4}`,
          },
        },
        headerReadOnly: {
          border: "none",
          background: theme.colors.atmo1,
          "&:focus-visible": {
            border: "none",
          },
        },
        placeholder: {
          color: theme.colors.secondary_60,
        },
        panel: {
          boxShadow: theme.colors.shadow,
          border: "1px solid transparent",
        },
        inputExtensionOpen: {
          height: theme.space.xs,
          borderRight: "1px solid transparent",
          borderLeft: "1px solid transparent",
        },
      },
    },
    HvBaseInput: {
      classes: {
        root: {
          "&:hover &.HvBaseInput-inputBorderContainer": {
            backgroundColor: theme.colors.secondary,
          },

          "&:focus-within &.HvBaseInput-inputBorderContainer": {
            backgroundColor: theme.colors.secondary,
          },
        },
        disabled: {
          "&& &.HvBaseInput-input": {
            color: theme.colors.secondary_60,
            WebkitTextFillColor: theme.colors.secondary_60,
          },

          "& &.HvBaseInput-inputRootMultiline": {
            "& &.HvBaseInput-input": {
              backgroundColor: theme.colors.atmo3,
              border: `1px solid ${theme.colors.atmo4}`,
            },
          },

          "&:hover &.HvBaseInput-inputRootMultiline": {
            "& &.HvBaseInput-input": {
              backgroundColor: theme.colors.atmo3,
              border: `1px solid ${theme.colors.atmo4}`,
            },
          },
        },
        readOnly: {
          "& &.HvBaseInput-inputRootMultiline": {
            "& &.HvBaseInput-input": {
              border: `1px solid transparent`,
              backgroundColor: theme.colors.atmo3,
            },
          },

          "&:hover &.HvBaseInput-inputRootMultiline": {
            "& &.HvBaseInput-input": {
              border: `1px solid transparent`,
              backgroundColor: theme.colors.atmo3,
            },
          },

          "&:focus-within &.HvBaseInput-inputRootMultiline": {
            "& &.HvBaseInput-input": {
              border: `1px solid transparent`,
              backgroundColor: theme.colors.atmo3,
            },
          },
        },
        inputBorderContainer: {
          height: "1px",
        },
        inputRootReadOnly: {
          borderColor: "transparent",
          backgroundColor: theme.colors.atmo1,
        },
        inputRoot: {
          border: "none",
          "&:hover:not(&.HvBaseInput-inputRootDisabled):not(&.HvBaseInput-inputRootInvalid):not(&.HvBaseInput-inputRootReadOnly)":
            {
              borderColor: theme.colors.secondary,
            },
        },
        inputRootFocused: {
          "& .HvBaseInput-inputRootReadOnly": {
            backgroundColor: theme.colors.atmo1,
          },
        },
        inputRootDisabled: {
          background: theme.colors.atmo3,
          borderColor: "transparent",

          "&:hover": {
            background: theme.colors.atmo3,
          },
        },
        inputRootMultiline: {
          "& .HvBaseInput-input": {
            border: `1px solid ${theme.colors.atmo4}`,
            "&:hover": {
              border: `1px solid ${theme.colors.secondary}`,
            },
          },
        },
        input: {
          "&::placeholder": {
            color: theme.colors.secondary_60,
          },
        },
        inputReadOnly: {
          color: theme.colors.secondary,
        },
      },
    },
    HvBaseRadio: {
      classes: {
        root: {
          "&:hover": {
            borderRadius: "0px",
          },
        },
      },
    },
    HvBaseSwitch: {
      classes: {
        root: {
          borderRadius: "0px",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
        track: {
          backgroundColor: theme.colors.atmo2,
        },
        thumb: {},
      },
    },
    HvBulkActions: {
      classes: {
        root: {
          border: "none",
          backgroundColor: theme.colors.atmo1,
          padding: "0px",
        },
        semantic: {
          backgroundColor: theme.colors.neutral_20,
          "& HvBulkActions-selectAll div": {
            color: theme.colors.base_dark,

            "& *": {
              color: theme.colors.base_dark,
              backgroundColor: "transparent",
            },
          },
        },
        divider: {
          display: "none",
        },
      },
    },
    HvButton: {
      classes: {
        root: {
          padding: theme.spacing("0", "xs"),
        },
        secondarySubtle: {
          backgroundColor: theme.colors.atmo1,
          border: `1px solid ${theme.colors.atmo4}`,
        },
        semantic: {
          color: theme.colors.base_dark,
          backgroundColor: "transparent",
          "&:hover, &:focus-visible": {
            backgroundColor: "rgba(251, 252, 252, 0.3)",
          },
          "&:disabled": {
            backgroundColor: "rgba(251, 252, 252, 0.1)",
          },
        },
      },
    },
    HvCalendarHeader: {
      classes: {
        root: {
          borderBottom: `1px solid ${theme.colors.atmo4}`,
          borderTop: "1px solid transparent",
          borderLeft: "1px solid transparent",
          borderRight: "1px solid transparent",
          borderRadius: "0",
        },
        headerDayOfWeek: {
          color: theme.colors.secondary,
        },
        input: {
          color: theme.colors.secondary,
          fontSize: "18px",
          letterSpacing: "0.02em",
          lineHeight: "28px",
          fontWeight: theme.fontWeights.semibold,
        },
      },
    },
    HvCard: {
      classes: {
        root: {
          outline: "none",
          borderRadius: "0px",
        },
        selectable: {
          "&:hover": {
            outline: `1px solid ${theme.colors.atmo4}`,
          },
        },
        icon: {
          top: `calc(-24px + ${theme.space.xs})`,
          right: `calc(-24px + ${theme.space.xs})`,
        },
      },
    },
    HvCarousel: {
      classes: {
        xs: {
          "& .HvCarousel-controls": {
            display: "none",
          },
        },
        controls: {
          justifyContent: "space-between",
          backgroundColor: "transparent",
          border: "none",
        },
        counterContainer: {
          display: "block",
        },
        thumbnail: {
          "& img": {
            borderRadius: theme.radii.none,
          },
        },
        thumbnailSelected: {
          "& img": {
            border: `1px solid ${theme.colors.base_dark}`,
          },
        },
      },
    },
    HvCheckBox: {
      classes: {
        container: {
          "&:hover": {
            borderRadius: "0px",
          },
        },
      },
    },
    HvColorPicker: {
      classes: {
        panel: {
          minWidth: "240px",
          padding: "20px 15px 20px 20px",
        },
        colorPicker: {
          width: "205px",
        },
      },
    },
    HvColorPickerFields: {
      classes: {
        fields: {
          paddingTop: "10px",
          marginRight: "5px",
        },
        single: {
          maxWidth: "40px",
          paddingLeft: "5px",
        },
        double: {
          maxWidth: "80px",
          paddingRight: "20px",
        },
      },
    },
    HvColorPickerPicker: {
      classes: {
        pickers: {
          flexDirection: "row",
        },
        saturation: {
          width: "180px",
          height: "180px",
          marginRight: "5px",

          "& > div": {
            borderRadius: theme.radii.none,

            "& .saturation-white": {
              borderRadius: theme.radii.none,

              "& .saturation-black": {
                borderRadius: theme.radii.none,
              },
            },
          },
        },
        saturationPointer: {
          width: "6px",
          height: "6px",
        },
        hue: {
          height: "180px",
          width: "15px",
          marginTop: "0px",

          "& .hue-horizontal": {
            borderRadius: theme.radii.none,
          },
        },
        hueSlider: {
          width: "12px",
          height: "6px",
          background: "#fff",
          marginLeft: "1px",
          border: "1px solid #fff",
          borderRadius: "1px",
        },
      },
    },
    HvColorPickerPresetColors: {
      classes: {
        root: { width: "205px" },
        colors: {
          width: "calc(100% + 5px)",
          margin: "-5px -3px",
        },
        swatchWrap: {
          width: "16px",
          height: "16px",
          margin: "5px",

          "& > span > div": {
            borderRadius: theme.radii.none,
          },
        },
      },
    },
    HvColorPickerSavedColors: {
      classes: {
        addButton: {
          margin: "5px",
          width: "32px",
          height: "32px",
        },
        root: {
          width: "calc(100% + 5px)",
          margin: "-5px -3px",
        },
        swatchWrap: {
          width: "32px",
          height: "32px",
          margin: "4px",

          "& > span > div": {
            borderRadius: theme.radii.base,
          },
        },
      },
    },
    HvDatePicker: {
      classes: {
        inputText: {
          color: theme.colors.secondary_60,
        },
      },
    },
    HvDialog: {
      classes: {
        paper: {
          borderRadius: "0",
        },
      },
    },
    HvDropdown: {
      classes: {
        readOnly: {
          "& .HvDropdown-dropdownHeader": {
            border: "none",
            backgroundColor: theme.colors.atmo1,
          },
        },
        placeholderClosed: {
          color: theme.colors.secondary_60,
        },
      },
    },
    HvDropDownMenu: {
      classes: {
        icon: {
          borderRadius: "0px",
          border: "none",
        },
        iconSelected: {
          border: "none",
        },
      },
    },
    HvEmptyState: {
      classes: {
        titleContainer: {
          marginTop: "2px",
        },
      },
    },
    HvFile: {
      classes: {
        progressbarContainer: {
          height: "2px",
        },
        previewContainer: {
          width: "52px",
          height: "52px",
          "& img": {
            width: "100%",
            height: "100%",
          },
        },
      },
    },
    HvFileList: {
      classes: {
        listItem: {
          border: "none",
          borderRadius: "0px",
        },
      },
    },
    HvFileUploaderPreview: {
      classes: {
        previewButton: {
          width: "52px",
          height: "52px",
        },
        overlay: {
          backgroundColor: theme.colors.atmo3,
          opacity: "0.75",
          borderRadius: "0px",
        },
      },
    },
    HvDropZone: {
      classes: {
        dropZoneContainer: {
          border: `1px dotted ${theme.colors.atmo4}`,
          background: theme.colors.atmo2,
          borderRadius: "0px",
          "&:hover": {
            border: `1px dotted ${theme.colors.secondary}`,
          },
          "&:focus-within": {
            border: `1px dotted ${theme.colors.secondary}`,
          },
        },
        dragAction: {
          border: `1px dotted ${theme.colors.secondary}`,
        },
        dropZoneContainerDisabled: {
          border: `1px dotted ${theme.colors.atmo4}`,
          "&:hover": {
            border: `1px dotted ${theme.colors.atmo4}`,
          },
        },
      },
    },
    HvFilterGroupCounter: {
      classes: {
        partialCounter: {
          fontWeight: theme.fontWeights.bold,
        },
      },
    },
    HvFilterGroupContent: {
      classes: {
        rightSidePanel: {
          boxShadow: `inset 8px 0 8px -6px ${theme.colors.shad1}`,
          borderLeft: "none",
        },
        applyButton: {
          marginRight: "0px",
        },
      },
    },
    HvGlobalActions: {
      classes: {
        wrapper: {
          padding: theme.space.xs,
          border: "transparent",
          borderRadius: theme.radii.none,
        },
        globalSectionArea: {
          backgroundColor: "transparent",
          paddingLeft: "0px",
        },
      },
    },
    HvHeader: {
      classes: {
        root: {
          borderTop: `4px solid ${theme.colors.brand}`,
        },
      },
    },
    Bar: {
      classes: {
        menu: {
          height: "40px",
        },
      },
    },
    HvHeaderMenuItem: {
      classes: {
        root: {},

        selected: {
          "&.HvHeader-MenuItem-menu": {
            "& > * > span": {
              color: theme.colors.brand,
            },
          },
          "&.HvHeader-MenuItem-menubar": {
            "& > * > span": {
              color: theme.colors.brand,
            },
          },
        },
      },
    },
    HvHorizontalScrollListItem: {
      classes: {
        button: {
          height: "32px",
          borderBottom: "2px solid transparent",
          "&:hover": {
            backgroundColor: theme.colors.atmo3,
          },
        },
        text: css({
          height: "32px",
          borderBottom: "2px solid transparent",
          "& p": {
            padding: "8px 10px",
            maxWidth: "180px",
          },
        }),
        selected: css({
          borderBottom: `2px solid ${theme.colors.secondary}`,
        }),
      },
    },
    HvInlineEditor: {
      classes: {
        button: {
          border: "none",
        },
      },
    },
    HvInfoMessage: {
      classes: {
        root: {
          color: theme.colors.secondary,
        },
      },
    },
    HvLabel: {
      classes: {
        root: { fontWeight: theme.fontWeights.semibold },
      },
    },
    HvList: {
      classes: {
        itemSelector: {
          "&:not(:hover):not(.HvIsFocused):not(:focus-within)": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    HvListItem: {
      classes: {
        disabled: {
          backgroundColor: "transparent",
        },
      },
    },
    HvPaginationSelect: {
      classes: {
        header: {
          borderColor: "transparent",
          "&:hover": {
            borderColor: "transparent",
          },
        },
      },
    },
    HvQueryBuilder: {
      classes: {
        topGroup: {
          paddingBottom: `calc(${theme.space.sm} * 3)`,
        },
        subGroup: {
          left: "-42px",
        },
        subRulesContainer: {
          left: "-41px",
        },
        topActionButtonContainer: {
          position: "absolute",
          bottom: `calc(-1 * ${theme.space.md} * 0.5)`,
          right: `calc(${theme.space.sm} * 1.75)`,
        },
      },
    },
    Rule: {
      classes: {
        root: {
          "&::before": {
            width: "21px",
            height: "39px",

            left: `calc( -1 * 21px)`,
          },
          ":not(.HvQueryBuilder-topRulesContainer)>&:last-child::after": {
            width: "21px",

            left: `calc( -1 * 21px)`,
          },
        },
        actionsContainer: {
          marginTop: "22px",
        },
      },
    },
    HvRadio: {
      classes: {
        container: {
          "&:hover": {
            borderRadius: "0px",
          },
        },
      },
    },
    HvScrollToHorizontal: {
      classes: {
        notSelectedRoot: {
          display: "none",
        },
        selected: {
          display: "none",
        },
      },
    },
    HvSnackbarContent: {
      classes: {
        action: {
          marginLeft: "inherit",
        },
      },
    },
    HvSwitch: {
      classes: {
        invalidSwitch: {
          paddingBottom: "0px",
        },
      },
    },
    HvTab: {
      classes: {
        root: {
          padding: "0 20px",
          "&:hover": {
            backgroundColor: "transparent",
            borderRadius: "0px",
            "&::after": {
              height: "1px",
              backgroundColor: theme.colors.secondary_60,
            },
          },
        },
      },
    },
    HvTagsInput: {
      classes: {
        disabled: {
          "& .HvTagsInput-tagsList": {
            backgroundColor: theme.colors.atmo1,
          },
        },
        readOnly: {
          "& .HvTagsInput-tagsList": {
            backgroundColor: theme.colors.atmo1,
            border: `1px solid ${theme.colors.atmo1}`,

            "&:hover": {
              border: `1px solid transparent`,
            },
          },
        },
        tagsList: {
          border: `1px solid ${theme.colors.atmo4}`,
          "&:hover": {
            border: `1px solid ${theme.colors.secondary}`,
          },
        },
      },
    },
    HvTableCell: {
      classes: {
        root: {
          padding: `calc(${theme.space.xs} - 2px ) ${theme.space.xs} calc(${
            theme.space.xs
          } - 3px ) ${theme.spacing(4)}`,
        },
        head: {
          borderTop: `1px solid ${theme.colors.atmo4}`,
        },
      },
    },
    HvTableHeader: {
      classes: {
        head: {
          "&.HvTableHeader-sortable": {
            "&:hover": {
              backgroundColor: theme.colors.atmo3,

              "& .HvTableHeader-sortIcon": {
                visibility: "visible",
              },
            },
            "&:focus-within": {
              backgroundColor: theme.colors.atmo3,

              "& .HvTableHeader-sortIcon": {
                visibility: "visible",
              },
            },
          },
        },
        sortButton: {
          ".HvTableHeader-root.HvTableHeader-sortable &": {
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
    HvTableRow: {
      classes: {
        root: {
          backgroundColor: "transparent",
        },
        selected: {
          backgroundColor: theme.colors.atmo1,
        },
      },
    },
    HvTooltip: {},
    HvVerticalNavigation: {
      classes: {
        root: {
          justifyContent: "space-between",
        },
      },
    },
    HvVerticalNavigationActions: {
      classes: {
        root: {
          marginTop: "none",
        },
      },
    },
    HvWizardContainer: {
      classes: {
        paper: {
          maxHeight: "calc(100% - (2 * 100px))",
        },
      },
    },
  },
  dropdown: {
    placeholderColor: theme.colors.secondary_60,
  },
  header: {
    height: "44px",
    backgroundColor: theme.colors.atmo1,
    secondLevelBackgroundColor: theme.colors.atmo2,
    borderTopThickness: "4px",
    selectedItemBackgroundColor: "transparent",
    selectedItemBorderTopColor: theme.colors.brand,
    selectedItemBorderTopThickness: "2px",
    selectedItemBorderBottomColor: "transparent",
    selectedItemBorderBottomThickness: "0px",
    secondLevelSelectedItemBorderTopColor: "transparent",
    secondLevelSelectedItemBorderTopThickness: "2px",
    secondLevelSelectedItemBorderBottomColor: "transparent",
    secondLevelSelectedItemBorderBottomThickness: "0px",
    shadow: theme.colors.shadow,
  },
  card: {
    titleVariant: "title3",
    subheaderVariant: "body",
    subheaderColor: theme.colors.secondary,
  },
  dialog: {
    titleVariant: "xxsTitle",
  },
  baseSwitch: {
    padding: 0,
    height: "16px",
    width: "32px",
  },
  bulkActions: {
    actionButtonVariant: "semantic",
  },
  table: {
    headerBorderTopColor: theme.colors.atmo4,
    rowBorderColor: "transparent",
    rowBorderRadius: "0px",
    rowListBorderRadius: "0px",
    rowListBorderColor: "transparent",
    rowStripedBackgroundColorEven: theme.colors.atmo1,
    rowStripedBackgroundColorOdd: "transparent",
    rowExpandBackgroundColor: theme.colors.atmo2,
    rowHoverBorderColor: theme.colors.atmo4,
    rowSortedColor: theme.colors.atmo1,
    rowSortedColorAlpha: "0.4",
    cellListBorder: `solid 2px ${theme.colors.atmo2}`,
    cellBorder: `solid 1px ${theme.colors.atmo4}`,
  },
  globalActions: {
    sectionVariant: "sectionTitle",
  },
  emptyState: {
    titleVariant: "xxsTitle",
  },
  tooltip: {
    borderRadius: "0px",
  },
  verticalNavigation: {
    activeBorderLeft: `2px solid ${theme.colors.brand}`,
    inactiveBorderLeft: `2px solid transparent`,
  },
  slider: {
    dragBarColor: theme.colors.atmo3,
    ringColor: theme.colors.secondary,
    ringOpacity: "20%",
  },
  stepNavigation: {
    separatorMargin: "0px",
    defaultSeparatorHeight: 3,
    simpleSeparatorHeight: 2,
  },
  filterGroup: {
    applyButtonVariant: "secondaryGhost",
    cancelButtonVariant: "secondaryGhost",
  },
  datePicker: {
    placeholderVariant: "body",
  },
  scrollTo: {
    dotRootSize: "32px",
    dotRootRadius: "0%",
    dotHoverBackgroundColor: theme.colors.atmo3,
    dotHoverColor: theme.colors.atmo4,
    dotHoverSize: "10px",
    dotNotSelectedColor: theme.colors.atmo4,
    dotNotSelectedSize: "6px",
    dotSelectedSize: 10,
    backgroundColorOpacity: 0.8,
    backgroundColorBlur: "4px",
  },
  queryBuilder: {
    border: `1px solid ${theme.colors.atmo4}`,
  },
  colorPicker: {
    inputValueVariant: "body",
    recommendedColorsBottomPadding: "20px",
  },
  drawer: {
    backDropBackgroundColor: theme.colors.atmo4,
  },
  forms: {
    infoMessage: {
      textColor: theme.colors.secondary,
    },
    label: {
      fontWeight: theme.fontWeights.semibold,
    },
  },
  snackbar: {
    actionButtonVariant: "secondaryGhost",
  },
}));

export default ds3;
