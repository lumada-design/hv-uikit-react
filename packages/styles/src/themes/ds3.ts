import type { CSSProperties } from "react";

import { makeColors, makeTheme } from "../makeTheme";
import { colors } from "../tokens/colors";

const ds3 = makeTheme((theme) => ({
  name: "ds3",
  colors: makeColors({
    bgPage: ["#F0F0F0", colors.dark.atmo2],
    bgHover: [colors.light.atmo3, colors.dark.atmo3],
    primaryStrong: ["#477DBD", ""],
    positive: ["", "#63A621"],
    info: ["#4D9284", "#72CCCB"],
    catastrophic: ["#C51162", "#E26BD2"],
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
  }),
  space: {
    base: 10,
    xxs: "4px",
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
    captionLabel: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
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
          borderRadius: 0,
        },
      },
    },
    HvCheckBoxIcon: {
      classes: {
        root: {
          borderRadius: 0,
          borderColor: theme.colors.text,
        },
        checked: {
          backgroundColor: theme.colors.text,
          color: theme.colors.atmo1,
        },
        semantic: {
          "&[data-variant=indeterminate]": {
            backgroundColor: theme.colors.textLight,
            color: theme.colors.textDark,
          },
        },
        indeterminate: {
          color: theme.colors.text,
        },
      },
    },
    HvBaseDropdown: {
      classes: {
        header: {
          border: `1px solid ${theme.colors.atmo4}`,
          ":hover,:focus-visible": {
            borderColor: theme.colors.secondary,
          },
        },
        headerOpen: {
          "&,:hover": {
            borderColor: "transparent",
            boxShadow: theme.colors.shadow,
          },
        },
        headerDisabled: {
          background: theme.colors.atmo3,
          "&,:hover": {
            borderColor: theme.colors.atmo4,
          },
        },
        headerReadOnly: {
          background: theme.colors.atmo1,
          "&,:focus-visible": {
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
    HvLabelContainer: {
      classes: {
        root: {
          height: "auto",
        },
      },
    },
    HvBaseInput: {
      classes: {
        root: {
          border: "none",

          ":not(.HvBaseInput-disabled):not(.HvBaseInput-invalid):not(.HvBaseInput-readOnly)":
            {
              ":hover,:focus-within": {
                borderColor: theme.colors.secondary,
                "::after": {
                  borderBottomColor: theme.colors.secondary,
                },
              },
            },

          "::after": {
            content: '" "',
            position: "absolute",
            inset: "auto 0 0",
            margin: "0 2px",
            borderBottom: `1px solid ${theme.colors.atmo4}`,
          },
        },
        invalid: {
          "::after": {
            borderBottomColor: theme.form.errorColor,
          },
        },
        disabled: {
          backgroundColor: theme.colors.atmo3,

          "&& .HvBaseInput-input": {
            color: theme.colors.secondary_60,
            WebkitTextFillColor: theme.colors.secondary_60,
          },
        },
        multiline: {
          border: `1px solid ${theme.colors.atmo4}`,
          "&::after": {
            display: "none",
          },
          "&.HvBaseInput-disabled": {
            borderColor: theme.colors.atmo4,
          },
        },
        readOnly: {
          borderColor: "transparent",
          backgroundColor: theme.colors.atmo1,

          "::after": {
            borderColor: "transparent",
          },
        },
        focused: {
          "&.HvBaseInput-readOnly": {
            backgroundColor: theme.colors.atmo1,
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
            borderRadius: 0,
          },
        },
      },
    },
    HvRadioIcon: {
      classes: {
        checked: {
          backgroundColor: theme.colors.text,
          color: theme.colors.bgPage,
        },
      },
    },
    HvBaseSwitch: {
      classes: {
        root: {
          width: "32px",
          height: "16px",
          borderRadius: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
          " .HvBaseSwitch-switchBase.HvBaseSwitch-checked:not(.HvBaseSwitch-disabled) + .HvBaseSwitch-track":
            {
              backgroundColor: theme.colors.text,
            },
        },
        switch: {
          width: "32px",
          height: "16px",
        },
        switchBase: {
          width: "32px",
          height: "16px",
        },
        track: {
          backgroundColor: theme.colors.atmo2,
        },
        thumb: {
          width: 12,
          height: 12,
        },
      },
    },
    HvBreadCrumbPage: {
      classes: {
        link: {
          ":hover,:focus": {
            backgroundColor: theme.colors.atmo3,
          },
        },
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
          "& .HvBulkActions-selectAll div": {
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
          padding: theme.spacing(0, "xs"),
          minWidth: "70px",
        },
        icon: {
          minWidth: "unset",
        },
        secondarySubtle: {
          backgroundColor: theme.colors.atmo1,
          borderColor: theme.colors.atmo4,
        },
        secondary: {
          backgroundColor: theme.colors.atmo1,
          borderColor: theme.colors.atmo4,
        },
        ghost: {},
        disabled: {
          "&:not(.HvButton-ghost):not(.HvButton-semantic)": {
            backgroundColor: theme.colors.atmo3,
          },
          "&.HvButton-subtle": {
            borderColor: theme.colors.atmo4,
          },
        },
      },
    },
    HvCalendarHeader: {
      classes: {
        root: {
          marginTop: theme.space.xs,
          paddingBottom: 32,
          "& input": {
            height: "27px",
            fontSize: "18px",
            letterSpacing: "0.02em",
            lineHeight: "28px",
            fontWeight: theme.fontWeights.semibold,
          },
        },
        invalid: {
          paddingBottom: 0,
        },
        headerDayOfWeek: {
          color: theme.colors.secondary,
        },
      },
    },
    HvCard: {
      classes: {
        root: {
          outline: "none",
          borderRadius: 0,
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
    HvCardHeader: {
      classes: {
        root: {
          padding: theme.spacing("15px", "sm"),
        },
        title: {
          ...theme.typography.title3,
        },
        titleShort: {
          ...theme.typography.title3,
        },
        subheader: {
          ...theme.typography.body,
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
            borderRadius: 0,
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
            borderRadius: 0,
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
        headerColorValue: {
          ...theme.typography.body,
        },
        recommendedColorsRoot: {
          ":not(:only-child)": {
            paddingBottom: "20px",
          },
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
            borderRadius: 0,

            "& .saturation-white": {
              borderRadius: 0,

              "& .saturation-black": {
                borderRadius: 0,
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
            borderRadius: 0,
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
            borderRadius: 0,
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
          ...theme.typography.body,
          color: theme.colors.secondary_60,
        },
      },
    },
    HvDialog: {
      classes: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    HvDialogTitle: {
      classes: {
        titleText: {
          ...theme.typography.xxsTitle,
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
        iconSelected: {
          border: "none",
          "&:hover": {
            border: "none",
          },
        },
      },
    },
    HvEmptyState: {
      classes: {
        titleContainer: {
          marginTop: "2px",
          ...theme.typography.xxsTitle,
        },
      },
    },
    HvFile: {
      classes: {
        root: {
          border: "none",
          borderRadius: 0,
        },
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
    HvFileUploaderPreview: {
      classes: {
        previewButton: {
          width: "52px",
          height: "52px",
        },
        overlay: {
          backgroundColor: theme.colors.atmo3,
          opacity: "0.75",
          borderRadius: 0,
        },
      },
    },
    HvDropZone: {
      classes: {
        dropZoneContainer: {
          border: `1px dotted ${theme.colors.atmo4}`,
          background: theme.colors.atmo2,
          borderRadius: 0,
          ":hover,:focus-within": {
            borderColor: theme.colors.secondary,
          },
        },
        dragAction: {
          border: `1px dotted ${theme.colors.secondary}`,
        },
        dropZoneContainerDisabled: {
          "&,:hover": {
            borderColor: theme.colors.atmo4,
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
        section: {
          "& .HvGlobalActions-wrapper": {
            backgroundColor: "transparent",
            paddingLeft: "0px",
          },
        },
        wrapper: {
          "&&": {
            padding: theme.space.xs,
            borderWidth: 0,
            borderRadius: 0,
          },
        },
        sectionName: {
          ...theme.typography.sectionTitle,
        },
      },
    },
    HvHeader: {
      classes: {
        root: {
          backgroundColor: theme.colors.atmo1,
          borderTop: `4px solid ${theme.colors.brand}`,
        },
      },
    },
    HvHeaderMenuBarBar: {
      classes: {
        active: {
          top: `calc(${theme.header.height} - 4px)`,
        },
        list: {
          "& li:hover > .HvHeader-MenuBar-hidden": {
            top: `calc(${theme.header.height} - 4px)`,
          },
          "& li:focus-within > .HvHeader-MenuBar-hidden": {
            top: `calc(${theme.header.height} - 4px)`,
          },
        },
      },
    },
    HvHeaderMenuItem: {
      classes: {
        root: {
          borderTop: "2px solid transparent",
          borderBottom: "none",
          color: theme.colors.secondary,
        },
        selected: {
          borderBottom: "none",
          color: theme.colors.brand,
          "&.HvHeader-MenuItem-menu": {
            borderTop: "2px solid transparent",
          },
          "&.HvHeader-MenuItem-menubar": {
            borderTop: "2px solid currentcolor",
          },
        },
      },
    },
    HvHorizontalScrollListItem: {
      classes: {
        root: {
          maxWidth: 180,
        },
        button: {
          height: "32px",
          borderBottom: "2px solid transparent",
          "&:hover": {
            backgroundColor: theme.colors.atmo3,

            "& .HvHorizontalScrollListItem-notSelected": {
              height: "10px",
              width: "10px",
              backgroundColor: theme.colors.atmo4,
            },
          },
        },
        text: {
          height: "32px",
          borderBottom: "2px solid transparent",
          padding: "8px 10px",
          margin: 0,
        },
        selected: {
          borderBottom: `2px solid ${theme.colors.secondary}`,
        },
        bullet: {
          display: "none",
        },
      },
    },
    HvSelect: {
      classes: {
        select: {
          ".HvButton-endIcon": {
            marginRight: theme.spacing(-1),
          },
        },
        panel: {
          borderColor: theme.colors.atmo4,
        },
      },
    },
    HvVerticalScrollListItem: {
      classes: {
        icon: {
          fontSize: "10px",
        },
        notSelected: {
          color: theme.colors.atmo4,
          fontSize: "6px",
        },
        text: {
          height: "32px",
          width: "32px",
        },
        button: {
          height: "32px",
          width: "32px",
          borderRadius: 0,
          cursor: "pointer",
          "&:hover": {
            "& .HvVerticalScrollListItem-notSelected": {
              fontSize: "10px",
              color: theme.colors.atmo4,
            },
          },
        },
      },
    },
    HvInlineEditor: {
      classes: {
        button: {
          "&,:hover": {
            border: "none",
            backgroundColor: "transparent",
          },
          ":focus,:active": {
            border: "none",
          },
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
        childGutter: { paddingBottom: 6 },
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
    HvPagination: {
      classes: {
        root: {
          [`& .HvPagination-pageSizeInput`]: {
            ...(theme.typography.label as CSSProperties),
            "&:focus": {
              padding: "unset",
            },
          },
          [`& .HvPagination-pageSizeInputContainer`]: {
            width: 40,
            minWidth: 40,
          },
          [`&& .HvPagination-pageSizeInputRoot`]: {
            height: 32,
          },
        },
        icon: {
          fontSize: 16,
        },
        pageSizeOptions: {
          height: 32,
        },
        pageSizeHeader: {
          height: "unset",
          [`& .HvBaseDropdown-arrowContainer`]: {
            marginTop: 0,
          },
        },
        pageSizeTextContainer: {
          height: 32,
          ...(theme.typography.body as CSSProperties),
        },
        pageSizeOptionsSelect: {
          ...(theme.typography.body as CSSProperties),
        },
        totalPagesTextContainer: {
          ...(theme.typography.body as CSSProperties),
        },
        pageNavigator: {
          alignItems: "stretch",
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
          "&::before": {
            left: "-42px",
          },
        },
        subRulesContainer: {
          left: "-41px",
        },
        topActionButtonContainer: {
          position: "absolute",
          bottom: `calc(-1 * ${theme.space.md} * 0.5)`,
          right: `calc(${theme.space.sm} * 1.75)`,
        },
        createConditionButton: {
          ...theme.typography.link,
          textDecoration: "underline",
        },
        createGroupButton: {
          ...theme.typography.link,
          textDecoration: "underline",
        },
      },
    },
    HvQueryBuilderRule: {
      classes: {
        root: {
          "&::before": {
            width: "21px",
            height: "36px",

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
            borderRadius: 0,
          },
        },
      },
    },
    HvScrollToHorizontal: {
      classes: {
        root: {
          backgroundColor: theme.alpha("atmo2", 0.8),
        },
      },
    },
    HvScrollToVertical: {
      classes: {
        root: {
          backgroundColor: theme.alpha("atmo2", 0.8),
        },
      },
    },
    HvSlider: {
      classes: {
        trackDragging: {
          "&& .rc-slider-track": {
            "&::before": {
              borderTop: `12px solid ${theme.colors.atmo3}`,
              borderBottom: `12px solid ${theme.colors.atmo3}`,
            },
          },
        },
        trackStandBy: {
          "&& .rc-slider-track": {
            "&:hover": {
              "&::before": {
                borderTop: `12px solid ${theme.colors.atmo3}`,
                borderBottom: `12px solid ${theme.colors.atmo3}`,
              },
            },
          },
        },
        handleContainer: {
          "&& .rc-slider-handle": {
            "&:active": {
              cursor: "grab",
              "&::before": {
                border: `9px solid ${theme.colors.secondary}`,
                opacity: "20%",
              },
            },
            "&:hover": {
              "&::before": {
                border: `9px solid ${theme.colors.secondary}`,
                opacity: "20%",
              },
            },
          },
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
            borderRadius: 0,
            "&::after": {
              height: "1px",
              backgroundColor: theme.colors.secondary_60,
            },
          },
        },
      },
    },
    HvTag: {
      classes: {
        root: {
          "--tagColor": theme.colors.neutral_20,
        },
        categorical: {
          "--tagColor": theme.alpha("cat1", 0.2),
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
            borderColor: "transparent",
            "&:hover": {
              borderColor: "transparent",
            },
          },
        },
        tagInputRoot: {
          "&::after": {
            display: "none",
          },
        },
        tagsList: {
          borderColor: theme.colors.atmo4,
          "&:hover": {
            borderColor: theme.colors.secondary,
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
        body: {
          "&.HvTableCell-sorted": {
            backgroundImage: `linear-gradient(to right, ${theme.alpha(
              "atmo1",
              0.4,
            )}, ${theme.alpha("atmo1", 0.4)})`,
          },
        },
        variantListactions: {
          borderLeft: `solid 2px ${theme.colors.atmo2}`,
        },
        variantListcheckbox: {
          borderRight: `solid 2px ${theme.colors.atmo2}`,
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
          "*:first-of-type > &": {
            borderTop: `1px solid ${theme.colors.atmo4}`,
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
        variantList: {
          borderRadius: 0,
          "& td": {
            borderTop: "1px solid transparent",
            borderBottom: "1px solid transparent",
          },
          "& td:first-of-type": {
            borderLeft: "1px solid transparent",
            borderRadius: 0,
          },
          "& td:last-of-type": {
            borderRight: "1px solid transparent",
            borderRadius: 0,
          },
          "&.HvTableRow-selected": {
            "& td": {
              borderTop: `1px solid ${theme.colors.secondary}`,
              borderBottom: `1px solid ${theme.colors.secondary}`,
            },
            "& td:first-of-type": {
              borderLeft: `1px solid ${theme.colors.secondary}`,
              borderRadius: 0,
            },
            "& td:last-of-type": {
              borderRight: `1px solid ${theme.colors.secondary}`,
              borderRadius: 0,
            },

            "&:hover": {
              "& td": {
                borderTop: `1px solid ${theme.colors.atmo4}`,
                borderBottom: `1px solid ${theme.colors.atmo4}`,
              },
              "& td:first-of-type": {
                borderLeft: `1px solid ${theme.colors.atmo4}`,
                borderRadius: 0,
              },
              "& td:last-of-type": {
                borderRight: `1px solid ${theme.colors.atmo4}`,
                borderRadius: 0,
              },
            },
          },

          "&:hover": {
            "& td": {
              borderTop: `1px solid ${theme.colors.atmo4}`,
              borderBottom: `1px solid ${theme.colors.atmo4}`,
            },
            "& td:first-of-type": {
              borderLeft: `1px solid ${theme.colors.atmo4}`,
              borderRadius: 0,
            },
            "& td:last-of-type": {
              borderRight: `1px solid ${theme.colors.atmo4}`,
              borderRadius: 0,
            },
          },
          "&.HvIsFocused": {
            borderRadius: 0,
          },
        },
      },
    },
    HvMultiButton: {
      variant: "secondaryGhost",
      classes: {
        root: {
          "& button&.HvMultiButton-button&.HvMultiButton-selected": {
            height: 32,
          },
        },
        splitDisabled: {
          backgroundColor: theme.colors.atmo3,
        },
      },
    },
    HvTooltip: {
      classes: {
        popper: {
          "& .HvTooltip-tooltip": {
            borderRadius: 0,
          },
        },
      },
    },
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
    HvVerticalNavigationSlider: {
      classes: {
        root: {
          borderLeft: `2px solid transparent`,
        },
        listItemSelected: {
          borderLeft: `2px solid ${theme.colors.brand}`,
        },
      },
    },
    HvVerticalNavigationTreeViewItem: {
      classes: {
        content: {
          borderLeft: `2px solid transparent`,
          ".HvVerticalNavigationTreeViewItem-selected>&": {
            borderLeft: `2px solid ${theme.colors.brand}`,
          },
        },
      },
    },
    HvWarningText: {
      classes: {
        warningText: {
          ...theme.typography.body,
          color: "inherit",
        },
        topGutter: { paddingTop: "8px" },
        defaultIcon: {
          fontSize: 16,
          margin: 8,
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
  } satisfies Record<string, Record<string, any> | { classes?: CSSProperties }>,
  header: {
    height: "44px",
    secondLevelHeight: "40px",
  },
  form: {
    errorColor: theme.colors.negative_120,
  },
  bulkActions: {
    actionButtonVariant: "semantic",
  },
  table: {
    rowStripedBackgroundColorEven: theme.colors.atmo1, // TODO - remove in v6
    rowStripedBackgroundColorOdd: "transparent", // TODO - remove in v6
    rowExpandBackgroundColor: theme.colors.atmo2, // TODO - remove in v6
    rowSortedColor: theme.colors.atmo1, // TODO - remove in v6
    rowSortedColorAlpha: "0.4", // TODO - remove in v6
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
  scrollTo: {
    dotSelectedSize: 10, // TODO - remove in v6
    backgroundColorOpacity: 0.8, // TODO - remove in v6
  },
  colorPicker: {
    hueDirection: "vertical",
  },
  snackbar: {
    actionButtonVariant: "semantic",
  },
}));

export default ds3;
