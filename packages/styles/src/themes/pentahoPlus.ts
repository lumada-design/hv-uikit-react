import type { CSSProperties } from "react";

import { makeTheme } from "../makeTheme";
import { radii } from "../tokens";
import { colors } from "../tokens/colors";
import {
  amber,
  blue,
  cyan,
  green,
  neutral,
  orange,
  pink,
  red,
  rose,
  sky,
  slate,
  yellow,
} from "../tokens/colorsPalette";

const pentahoPlus = makeTheme((theme) => ({
  name: "pentahoPlus",
  colors: {
    modes: {
      dawn: {
        type: "light",
        ...colors.common,
        ...colors.light,
        brand: blue[600],
        containerBackgroundHover: `color-mix(in srgb, ${blue[600]} 10%, transparent)`,
        backgroundColor: slate[100],
        atmo1: slate[50],
        atmo2: slate[100],
        atmo3: slate[200],
        atmo4: slate[300],
        base_light: slate[50],
        base_dark: slate[700],
        primary: blue[600],
        primary_80: blue[500],
        primary_20: `color-mix(in srgb, ${blue[600]} 10%, transparent)`,
        secondary: slate[700],
        secondary_80: slate[500],
        secondary_60: slate[400],
        secondary_20: `color-mix(in srgb, ${slate[700]} 10%, transparent)`, // 🆕
        positive: green[600],
        positive_120: green[700],
        positive_80: green[400],
        neutral: sky[500],
        warning: amber[500],
        warning_120: orange[500],
        warning_140: orange[700],
        negative: red[600],
        negative_120: red[700],
        negative_80: red[400],
        catastrophic: rose[800],
        negative_20: red[100],
        warning_20: amber[100],
        positive_20: green[100],
        neutral_20: sky[100],
        shadow: `0px 2px 4px -1px color-mix(in srgb, ${slate[700]} 8%, transparent)`,
        shad1: `color-mix(in srgb, ${slate[700]} 8%, transparent)`,

        pp: {
          primary: blue[600],
          primaryAction: blue[700],
          primaryStrong: blue[800],
          primarySubtle: blue[200],
          primaryDimmed: blue[100],
          success: green[600],
          successAction: green[700],
          successStrong: green[800],
          successDimmed: green[50],
          warning: amber[500],
          warningAction: amber[600],
          warningStrong: amber[700],
          warningDimmed: amber[50],
          error: red[600],
          errorAction: red[700],
          errorStrong: red[800],
          errorDimmed: red[50],
          neutral: cyan[500],
          neutralAction: cyan[600],
          neutralStrong: cyan[700],
          neutralDimmed: cyan[50],

          text: slate[700],
          textSubtle: slate[500],
          textDisabled: neutral[400],
          textDimmed: slate[300],
          link: blue[600],
          linkActive: blue[700],

          divider: slate[300],
          dividerSubtle: slate[200],
          dividerDimmed: slate[400],
          bgPage: slate[100],
          bgSurface: slate[50],
          bgActive: slate[200],
          bgHover: blue[100],
          bgDisabled: neutral[200],
          bgOverlay: `color-mix(in srgb, ${slate[900]} 60%, transparent)`,
          dimmer: "#FFFFFF",
        },
      },
      wicked: {
        type: "dark",
        ...colors.common,
        ...colors.dark,
        containerBackgroundHover: `color-mix(in srgb, ${blue[500]} 10%, transparent)`,
        backgroundColor: slate[900],
        atmo1: slate[800],
        atmo2: slate[900],
        atmo3: slate[950],
        atmo4: slate[700],
        base_light: slate[50],
        base_dark: slate[700],
        primary: blue[500],
        primary_80: blue[400],
        primary_20: `color-mix(in srgb, ${blue[500]} 10%, transparent)`,
        secondary: slate[50],
        secondary_80: slate[200],
        secondary_60: slate[300],
        secondary_20: `color-mix(in srgb, ${slate[50]} 10%, transparent)`, // 🆕
        positive: green[500],
        positive_120: green[600],
        positive_80: green[400],
        neutral: sky[500],
        warning: amber[500],
        warning_120: amber[600],
        warning_140: orange[600],
        negative: red[500],
        negative_120: red[600],
        negative_80: red[300],
        catastrophic: pink[600],
        negative_20: red[100],
        warning_20: amber[100],
        positive_20: green[100],
        neutral_20: sky[100],
        shadow: `0px 2px 4px -1px color-mix(in srgb, ${slate[700]} 8%, transparent)`,
        shad1: `color-mix(in srgb, ${slate[700]} 8%, transparent)`,

        pp: {
          primary: blue[400],
          primaryAction: blue[300],
          primaryStrong: blue[200],
          primarySubtle: blue[900],
          primaryDimmed: blue[950],
          success: green[600],
          successAction: green[500],
          successStrong: green[300],
          successDimmed: green[950],
          warning: yellow[500],
          warningAction: yellow[400],
          warningStrong: yellow[300],
          warningDimmed: yellow[950],
          error: red[600],
          errorAction: red[500],
          errorStrong: red[300],
          errorDimmed: red[950],
          neutral: cyan[500],
          neutralAction: cyan[400],
          neutralStrong: cyan[300],
          neutralDimmed: cyan[950],

          text: slate[50],
          textSubtle: slate[300],
          textDisabled: neutral[500],
          textDimmed: slate[700],
          link: blue[400],
          linkActive: blue[300],

          divider: slate[700],
          dividerSubtle: slate[700],
          dividerDimmed: slate[500],
          bgPage: slate[950],
          bgSurface: slate[900],
          bgActive: slate[900],
          bgHover: blue[950],
          bgDisabled: neutral[900],
          bgOverlay: `color-mix(in srgb, ${slate[900]} 40%, transparent)`,
          dimmer: "#000000",
        },
      },
    },
  },
  fontFamily: {
    body: "Inter, Arial, Helvetica, sans-serif",
  },
  typography: {
    display: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl4,
      lineHeight: theme.lineHeights.xl4,
      letterSpacing: "0.00504em",
    },
    title1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl3,
      lineHeight: theme.lineHeights.xl3,
      letterSpacing: "0.00384em",
    },
    title2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl2,
      lineHeight: theme.lineHeights.xl2,
      letterSpacing: "0.00288em",
    },
    title3: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl,
      lineHeight: theme.lineHeights.xl,
      letterSpacing: "0.0024em",
    },
    title4: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
      letterSpacing: "0.00192em",
    },
    label: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
      letterSpacing: "0.00168em",
    },
    body: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
      letterSpacing: "0.00168em",
    },
    captionLabel: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      letterSpacing: 0,
    },
    caption1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      letterSpacing: "0.00144em",
    },
    caption2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.xs,
      letterSpacing: "0.0012em",
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
  sizes: {
    xs: "32px",
    md: "48px",
    lg: "56px",
    xl: "64px",
    sm: "40px",
  },
  radii: {
    ...radii,
    base: "6px",
  },
  components: {
    HvLoading: {
      classes: {
        loadingBar: {
          borderRadius: 1,
        },
      },
    },
    HvBadge: {
      classes: {
        badgePosition: {
          color: theme.colors.base_light,
          backgroundColor: "#334155",
        },
      },
    },
    HvBaseCheckBox: {
      classes: {
        root: {
          "& svg": {
            width: 16,
            height: 16,
            borderRadius: "3px",
            border: `1px solid ${theme.colors.secondary}`,
          },
        },
        checked: {
          "& svg": {
            border: `1px solid ${theme.colors.primary}`,
            backgroundColor: theme.colors.primary,
            color: theme.colors.atmo1,
          },
        },
      },
    },
    HvBaseRadio: {
      classes: {
        root: {
          "& svg": {
            width: 16,
            height: 16,
            border: `1px solid ${theme.colors.secondary}`,
          },
        },
        checked: {
          "& svg": {
            border: `1px solid ${theme.colors.primary}`,
            backgroundColor: theme.colors.atmo1,
            color: theme.colors.primary,
          },
          "&.HvBaseRadio-disabled": {
            "& svg": {
              border: `1px solid ${theme.colors.secondary_60}`,
              backgroundColor: theme.colors.atmo3,
              color: theme.colors.secondary_60,
            },
          },
        },
      },
    },
    HvDotPagination: {
      classes: {
        radio: {
          width: 16,
          minWidth: 16,
        },
      },
    },
    HvBaseSwitch: {
      classes: {
        root: {
          "& .HvBaseSwitch-switchBase": {
            "&.HvBaseSwitch-checked": {
              "& .HvBaseSwitch-thumb": {
                border: `1px solid ${theme.colors.primary}`,
              },
              "+.HvBaseSwitch-track": {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.primary,
              },
            },
          },
        },
        thumb: {
          height: 10,
          width: 10,
        },
      },
    },
    HvTag: {
      classes: {
        root: {
          "&.MuiButtonBase-root.MuiChip-root": {
            borderRadius: theme.radii.full,
            padding: theme.spacing("2px", 0),
            "& .MuiChip-label": {
              paddingLeft: 8,
              paddingRight: 8,
            },
            "& .MuiChip-avatar": {
              marginLeft: theme.space.xs,
            },
          },
          "&& .MuiChip-deleteIcon": {
            borderRadius: `0 ${theme.radii.full} ${theme.radii.full} 0`,
            paddingRight: 4,
          },
        },
      },
    },
    HvInlineEditor: {
      classes: {
        root: {
          "& .HvButton-root": {
            borderRadius: "2px",

            "&:focus": {
              borderColor: theme.colors.secondary,
            },
          },
          "& .HvBaseInput-inputRoot": {
            borderRadius: "2px",
          },
        },
      },
    },
    HvButton: {
      classes: {
        root: {
          border: "none",
          borderRadius: theme.radii.full,
          padding: theme.spacing(0, "sm"),
          [`&[data-color="positive"]`]: {
            "&:hover": {
              backgroundColor: theme.colors.pp.successAction,
            },
            "&:active": {
              backgroundColor: theme.colors.pp.successStrong,
            },
          },
          [`&[data-color="negative"]`]: {
            "&:hover": {
              backgroundColor: theme.colors.pp.errorAction,
            },
            "&:active": {
              backgroundColor: theme.colors.pp.errorStrong,
            },
          },
          [`&[data-color="warning"]`]: {
            "&:hover": {
              backgroundColor: theme.colors.pp.warningAction,
            },
            "&:active": {
              backgroundColor: theme.colors.pp.warningStrong,
            },
          },
        },
        primary: {
          "&:hover": {
            backgroundColor: theme.colors.pp.primaryAction,
          },
          "&:active": {
            backgroundColor: theme.colors.pp.primaryStrong,
          },
        },
        subtle: {
          borderTop: `1px solid ${theme.colors.atmo1}`,
          borderBottom: `1px solid ${theme.colors.atmo4}`,
          backgroundColor: theme.colors.atmo1,
          "&:hover": {
            backgroundColor: theme.colors.pp.bgHover,
          },
          "&:active": {
            backgroundColor: theme.colors.pp.primarySubtle,
            borderTop: `1px solid ${theme.colors.pp.primarySubtle}`,
            borderBottom: `1px solid ${theme.colors.pp.primarySubtle}`,
            border: "none",
          },
          "&.HvButton-disabled": {
            backgroundColor: theme.colors.pp.bgDisabled,
            "&:hover": {
              backgroundColor: theme.colors.pp.bgDisabled,
            },
          },
          "&[data-color=positive]": {
            "&:hover,&:active": {
              backgroundColor: theme.colors.pp.successDimmed,
            },
          },
          [`&[data-color="negative"]`]: {
            color: theme.colors.negative_120,
            "&:hover,&:active": {
              backgroundColor: theme.colors.pp.errorDimmed,
            },
          },
          [`&[data-color="warning"]`]: {
            color: theme.colors.warning_120,
            "&:hover,&:active": {
              backgroundColor: theme.colors.pp.warningDimmed,
            },
          },
          "&:HvButton-disabled": {
            backgroundColor: theme.colors.pp.bgDisabled,
            borderColor: theme.colors.pp.bgDisabled,
          },
        },
        ghost: {
          "&:hover": {
            backgroundColor: theme.colors.pp.primaryDimmed,
          },
          "&:active": {
            backgroundColor: theme.colors.pp.primarySubtle,
            borderBottom: `1px solid ${theme.colors.pp.primarySubtle}`,
            border: "none",
          },
          [`&[data-color="positive"]`]: {
            "&:hover,&:active": {
              backgroundColor: theme.colors.pp.successDimmed,
            },
          },
          [`&[data-color="negative"]`]: {
            color: theme.colors.negative_120,
            "&:hover,&:active": {
              backgroundColor: theme.colors.pp.errorDimmed,
            },
          },
          [`&[data-color="warning"]`]: {
            color: theme.colors.warning_120,
            "&:hover,&:active": {
              backgroundColor: theme.colors.pp.warningDimmed,
            },
          },
        },

        semantic: {
          "&:hover": {
            backgroundColor: theme.colors.pp.primaryDimmed,
          },
          "&:active": {
            backgroundColor: theme.colors.pp.primarySubtle,
            borderBottom: `1px solid ${theme.colors.pp.primarySubtle}`,
            border: "none",
          },
        },

        disabled: {
          border: "none",
          backgroundColor: theme.colors.pp.bgDisabled,
          color: theme.colors.pp.textDisabled,
          "&:hover": {
            backgroundColor: theme.colors.pp.bgDisabled,
          },
          "&[data-color=positive],&[data-color=warning],&[data-color=negative]":
            {
              color: theme.colors.pp.textDisabled,
              "&:hover,&:active": {
                backgroundColor: theme.colors.pp.bgDisabled,
              },
              "&.HvButton-ghost": {
                backgroundColor: "transparent",
              },
            },
        },
      },
    },
    HvMultiButton: {
      classes: {
        multiple: {
          "& button.HvMultiButton-button": {
            borderColor: "transparent",
            "&.HvMultiButton-firstButton": {
              borderColor: "transparent",
              borderRadius: `${theme.radii.base} 0 0 ${theme.radii.base}`,
              "&:disabled": {
                borderColor: "transparent",
                "&:hover": {
                  borderColor: "transparent",
                },
              },
            },
            "&.HvMultiButton-lastButton": {
              borderColor: "transparent",
              borderRadius: `0 ${theme.radii.base} ${theme.radii.base} 0`,
              "&:disabled": {
                borderColor: "transparent",
                "&:hover": {
                  borderColor: "transparent",
                },
              },
            },
            "&.HvMultiButton-selected": {
              borderColor: "transparent",
              color: theme.colors.primary,
              backgroundColor: theme.colors.atmo1,
              "&:hover": {
                "&:not(:disabled)": {
                  borderColor: "transparent",
                },
                "&:disabled": {
                  borderColor: "transparent",
                },
              },
              "&:disabled": {
                borderColor: "transparent",
              },
            },
            "&:disabled": {
              borderColor: "transparent",
              "&:hover": {
                borderColor: "transparent",
              },
            },
            "&:not(.HvMultiButton-firstButton)": {
              marginLeft: 0,
            },
            "&:not(.HvMultiButton-firstButton, .HvMultiButton-lastButton)": {
              borderRadius: theme.radii.none,
            },
            "&:not(&.HvMultiButton-selected)": {
              boxShadow: "none",
            },
          },
        },
        vertical: {
          "& button.HvMultiButton-button": {
            borderColor: "transparent",
            "&.HvMultiButton-selected": {
              borderRadius: theme.radii.none,
              borderColor: "transparent",
              color: theme.colors.primary,
              backgroundColor: theme.colors.atmo1,
              "&:disabled": {
                borderColor: "transparent",
                "&:hover": { borderColor: "transparent" },
              },
            },
            "&.HvMultiButton-firstButton": {
              borderRadius: `${theme.radii.base} ${theme.radii.base} 0px 0px`,
              borderColor: "transparent",
              "&:disabled": {
                borderColor: "transparent",
                "&:hover": { borderColor: "transparent" },
              },
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: `0px 0px ${theme.radii.base} ${theme.radii.base}`,
              borderColor: "transparent",
              "&:disabled": {
                borderColor: "transparent",
                "&:hover": { borderColor: "transparent" },
              },
            },
            "&:disabled": {
              borderColor: "transparent",
              "&:hover": { borderColor: "transparent" },
            },
            "&:not(.HvMultiButton-firstButton)": {
              marginTop: 0,
            },
          },
        },
        splitGroup: {
          backgroundColor: "transparent",
          // Button
          "& button.HvMultiButton-button": {
            "&.HvMultiButton-firstButton": {
              "& + div.HvMultiButton-splitContainer": {
                marginLeft: 0,
              },
            },
          },
          // Dropdown Menu
          "& .HvDropDownMenu-root": {
            "&:has(.HvMultiButton-firstButton)": {
              "& + div.HvMultiButton-splitContainer": {
                marginRight: -1,
              },
            },
          },
          "& .HvMultiButton-button.HvMultiButton-firstButton > button": {
            marginRight: -1,
          },
          "& .HvMultiButton-button.HvMultiButton-lastButton > button": {
            marginLeft: -1,
          },
        },
        splitGroupDisabled: { backgroundColor: "transparent" },
        splitContainer: {
          width: 1,
          zIndex: theme.zIndices.docked,
          "&&": { backgroundColor: "transparent" },
        },
      },
    },
    HvDropdownButton: {
      classes: {
        openUp: {
          borderRadius:
            "0px 0px calc(var(--HvButton-height) / 2) calc(var(--HvButton-height) / 2)",
        },
        openDown: {
          borderRadius:
            "calc(var(--HvButton-height) / 2) calc(var(--HvButton-height) / 2) 0px 0px",
        },
        disabled: {
          backgroundColor: theme.colors.pp.bgDisabled,
          borderColor: theme.colors.pp.bgDisabled,
          "&.HvButton-subtle": {
            backgroundColor: theme.colors.pp.bgDisabled,
            borderColor: theme.colors.pp.bgDisabled,
            "&:hover": {
              backgroundColor: theme.colors.pp.bgDisabled,
            },
          },
          "&.HvButton-ghost": {
            backgroundColor: theme.colors.pp.bgDisabled,
            borderColor: theme.colors.pp.bgDisabled,
            "&:hover": {
              backgroundColor: theme.colors.pp.bgDisabled,
            },
          },
        },
      },
    },
    HvHeader: {
      classes: {
        root: {
          borderBottom: `1px solid ${theme.colors.atmo3}`,
          boxShadow: "none",
        },
      },
    },
    HvHeaderBrand: {
      classes: {
        separator: {
          backgroundColor: theme.colors.atmo4,
          margin: theme.spacing(0, "md"),
          height: 32,
        },
      },
    },
    HvHeaderMenuBarBar: {
      classes: {
        active: {
          boxShadow: "none",
          borderBottom: `1px solid ${theme.colors.atmo3}`,
        },
        list: {
          "& li:hover > .HvHeader-MenuBar-hidden": {
            boxShadow: "none",
            borderBottom: `1px solid ${theme.colors.atmo3}`,
          },
          "& li:focus-within > .HvHeader-MenuBar-hidden": {
            boxShadow: "none",
            borderBottom: `1px solid ${theme.colors.atmo3}`,
          },
        },
      },
    },
    HvVerticalNavigation: {
      classes: {
        root: {
          color: theme.colors.base_light,
          backgroundColor: slate[900],
          borderRight: `1px solid ${slate[500]}`,
          "& > :not(nav:first-of-type)": {
            borderTop: `1px solid ${slate[500]}`,
          },
          "& > :only-child": {
            padding: theme.space.sm,
            "& .HvVerticalNavigationSlider-listContainer": { padding: 0 },
          },
        },
        slider: {
          "& > div:first-of-type": {
            borderBottom: `1px solid ${slate[500]}`,
          },
        },
      },
    },
    HvVerticalNavigationAction: {
      classes: {
        action: {
          borderRadius: "8px",
          "&:hover, &:focus": {
            backgroundColor: slate[700],
          },
        },
      },
    },
    HvVerticalNavigationSlider: {
      classes: {
        root: {
          minHeight: "32px",
          borderLeft: "unset",
          borderRadius: "8px",
          "&.HvIsFocused": {
            backgroundColor: slate[700],
          },
          "&.HvListItem-interactive:not(.HvListItem-disabled):not(.HvListItem-selected):hover":
            {
              backgroundColor: slate[700],
            },
        },
        listItemDisabled: {
          color: neutral[500],
          backgroundColor: neutral[800],
          "& .HvListItem-startAdornment": { backgroundColor: "transparent" },
          "& .HvListItem-endAdornment": { backgroundColor: "transparent" },
        },
        listItemSelected: {
          background: blue[950],
          borderLeft: "unset",
        },
        listItemFocus: {
          background: slate[700],
        },
        listContainer: {
          padding: theme.space.sm,
        },
      },
    },
    HvVerticalNavigationTreeViewItem: {
      classes: {
        content: {
          borderLeft: "unset",
          borderRadius: "8px",
          ".HvVerticalNavigationTreeViewItem-selected>&": {
            background: blue[950],
            borderLeft: "unset",
          },
          ":not(.HvVerticalNavigationTreeViewItem-disabled>&):not(.HvVerticalNavigationTreeViewItem-selected>&)":
            {
              "&:hover, &:focus-visible, &.focus-visible": {
                background: slate[700],
              },
            },
          ".HvVerticalNavigationTreeViewItem-focused>&": {
            background: slate[700],
          },
        },
        disabled: {
          "& .HvVerticalNavigationTreeViewItem-label": {
            color: neutral[500],
          },
          "& .HvVerticalNavigationTreeViewItem-content": {
            background: neutral[800],
          },
        },
        icon: {
          "& .HvAvatar-root": {
            borderRadius: "8px",
          },
        },
      },
    },
    HvCard: {
      classes: {
        root: {
          // TODO: replace with a color from `theme.colors`
          outline: `1px solid ${theme.palette.slate[200]}`,
          overflow: "hidden",
          height: "fit-content",
          borderRadius: theme.space.sm,
          "&.HvCard-selectable:hover": {
            // TODO: replace with a color from `theme.colors`
            backgroundColor: theme.palette.blue[100],
            borderColor: theme.colors.primary_20,
          },
          "& > :last-child:not(.HvCardMedia-root)": {
            paddingBottom: theme.space.sm,
          },
          "& .HvCard-semanticContainer": {
            display: "none",
          },
          "&.HvCard-selected": {
            // TODO: replace with a color from `theme.colors`
            outline: `1px solid ${theme.palette.blue[600]}`,
            "&:focus": {},
          },
          "&.HvCard-selectable": {
            "&:hover": {
              outline: `1px solid ${theme.colors.primary_20}`,
            },
          },
          "& .HvActionBar-root": {
            padding: `${theme.space.xs} ${theme.space.sm}`,
            borderTop: "none",
          },
        },
      },
    },
    HvCardHeader: {
      classes: {
        root: {
          flexDirection: "row-reverse",
          padding: `${theme.space.xs} ${theme.space.sm}`,
        },
        action: {
          paddingLeft: 0,
        },
      },
    },
    HvCardContent: {
      classes: {
        content: {
          padding: `${theme.space.xs} ${theme.space.sm}`,
          "&:last-child": {
            paddingBottom: theme.space.xs,
          },
        },
      },
    },
    HvFooter: {
      name: "Pentaho+",
    },
  } satisfies Record<string, Record<string, any> | { classes?: CSSProperties }>,
  header: {
    height: "64px",
    secondLevelHeight: "56px",
  },
  bulkActions: {
    actionButtonVariant: "primaryGhost",
  },
  table: {
    rowStripedBackgroundColorEven: theme.colors.atmo1, // TODO - remove in v6
    rowStripedBackgroundColorOdd: "transparent", // TODO - remove in v6
    rowExpandBackgroundColor: theme.colors.atmo2,
    rowSortedColor: theme.colors.primary, // TODO - remove in v6
    rowSortedColorAlpha: "0.1", // TODO - remove in v6
  },
  stepNavigation: {
    separatorMargin: "4px",
    defaultSeparatorHeight: 1,
    simpleSeparatorHeight: 1,
  },
  filterGroup: {
    applyButtonVariant: "primary",
    cancelButtonVariant: "secondarySubtle",
  },
  scrollTo: {
    dotSelectedSize: 6,
    backgroundColorOpacity: 0.9, // TODO - remove in v6
  },
  colorPicker: {
    hueDirection: "horizontal",
  },
  snackbar: {
    actionButtonVariant: "secondarySubtle",
  },
}));

export default pentahoPlus;
