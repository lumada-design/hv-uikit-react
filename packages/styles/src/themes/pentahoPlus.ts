import type { CSSObject } from "@emotion/serialize";

import { makeTheme } from "../makeTheme";
import { radii } from "../tokens";
import { colors } from "../tokens/colors";
import {
  amber,
  blue,
  cyan,
  emerald,
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

/** light-dark alias */
const ld = (c1: string, c2: string) => `light-dark(${c1}, ${c2})`;

/** custom button using `light-dark` theming scheme */
const buttonColors = {
  primary: {
    subtleBg: ld(blue[50], blue[950]),
    subtleBorder: ld(blue[200], blue[800]),
  },
  secondary: {
    subtleBg: ld(slate[100], slate[800]),
    subtleBorder: ld(slate[300], slate[700]),
  },
  success: {
    subtleBorder: ld(green[200], green[800]),
    subtleBg: ld(emerald[100], green[900]),
  },
  warning: {
    subtleBorder: ld(amber[200], amber[800]),
    subtleBg: ld(amber[100], amber[900]),
  },
  error: {
    subtleBorder: ld(red[200], red[800]),
    subtleBg: ld(red[100], red[900]),
  },
};

const inputColors = {
  bg: ld("white", "black"),
  border: ld(slate[400], slate[600]),
  borderHover: ld(blue[600], blue[600]),
  borderActive: ld(slate[700], slate[300]),
};

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

          borderDisabled: neutral[400],
        },
      },
      wicked: {
        type: "dark",
        ...colors.common,
        ...colors.dark,
        brand: blue[600],
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
          textSubtle: slate[400],
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

          borderDisabled: neutral[700],
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
            border: `1px solid ${theme.colors.pp.textSubtle}`,
          },
          "&:hover": {
            backgroundColor: theme.colors.pp.bgHover,
          },
        },
        checked: {
          "& svg": {
            border: `1px solid ${theme.colors.primary}`,
            backgroundColor: theme.colors.primary,
            color: theme.colors.atmo1,
          },
          "&.HvBaseCheckBox-disabled": {
            "& svg": {
              color: theme.colors.pp.textDisabled,
            },
          },
        },
        disabled: {
          "&.HvBaseCheckBox-root": {
            "& svg": {
              border: `1px solid ${theme.colors.pp.textDisabled}`,
              backgroundColor: theme.colors.pp.bgDisabled,
            },
          },
        },
        indeterminate: {
          "& svg": {
            backgroundColor: theme.colors.pp.bgSurface,
            border: `1px solid ${theme.colors.pp.textSubtle}`,
            color: theme.colors.pp.textSubtle,
          },
          "&.HvBaseCheckBox-disabled": {
            "& svg": {
              color: theme.colors.pp.textDisabled,
            },
          },
        },
      },
    },
    HvBaseRadio: {
      classes: {
        root: {
          "& svg": {
            backgroundColor: theme.colors.pp.bgSurface,
            borderColor: theme.colors.pp.textSubtle,
          },
          "&:hover": {
            backgroundColor: theme.colors.pp.bgHover,
          },
        },
        checked: {
          "& svg": {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary,
          },
          "&.HvBaseRadio-disabled": {
            "& svg": {
              borderColor: theme.colors.pp.textDisabled,
              backgroundColor: theme.colors.pp.textDisabled,
              color: theme.colors.pp.bgDisabled,
            },
          },
        },
        disabled: {
          "& svg": {
            border: `1px solid ${theme.colors.pp.textDisabled}`,
            backgroundColor: theme.colors.pp.bgDisabled,
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
          "&:hover": {
            backgroundColor: theme.colors.pp.bgHover,
          },
          "& .HvBaseSwitch-switchBase": {
            "& .HvBaseSwitch-thumb": {
              backgroundColor: theme.colors.pp.bgSurface,
              borderColor: theme.colors.pp.bgSurface,
              boxShadow: `0px 1px 1px 0px color-mix(in srgb, ${slate[700]} 16%, transparent)`,
            },
            "+.HvBaseSwitch-track": {
              height: 14,
              backgroundColor: theme.colors.pp.textDimmed,
              borderColor: theme.colors.pp.textSubtle,
            },
            "&.HvBaseSwitch-checked": {
              "& .HvBaseSwitch-thumb": {
                border: `1px solid ${theme.colors.pp.bgSurface}`,
              },
              "+.HvBaseSwitch-track": {
                backgroundColor: theme.colors.pp.primary,
                borderColor: theme.colors.pp.primaryStrong,
              },
            },
            "&.HvBaseSwitch-disabled": {
              "& .HvBaseSwitch-thumb": {
                backgroundColor: theme.colors.pp.borderDisabled,
                borderColor: theme.colors.pp.borderDisabled,
              },
              "+.HvBaseSwitch-track": {
                borderColor: theme.colors.pp.borderDisabled,
                backgroundColor: theme.colors.pp.bgDisabled,
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
    HvSelect: {
      classes: {
        root: {
          "&& .HvButton-secondarySubtle": {
            borderColor: inputColors.border,
            backgroundColor: inputColors.bg,
          },
          "&& .HvDropdownButton-openUp": {
            borderRadius: `0 0 ${theme.radii.base} ${theme.radii.base}`,
          },
          "&& .HvDropdownButton-openDown": {
            borderRadius: `${theme.radii.base} ${theme.radii.base} 0 0`,
          },
        },
        select: {
          borderRadius: theme.radii.base,
        },
        panel: {
          borderColor: inputColors.border,
        },
      },
    },
    HvSuggestions: {
      classes: {
        list: {
          borderColor: inputColors.border,
        },
      },
    },
    HvTag: {
      classes: {
        root: {
          borderRadius: theme.radii.full,
          padding: theme.spacing("2px", 0),
        },
        label: {
          paddingLeft: 8,
          paddingRight: 8,
        },
        icon: {
          marginLeft: theme.space.xs,
        },
        deleteIcon: {
          borderRadius: "inherit",
          paddingRight: 4,
        },
        selected: {},
      },
    },
    HvInlineEditor: {
      classes: {
        button: {
          borderRadius: 2,
          "&:focus": {
            borderColor: theme.colors.secondary,
          },
        },
        inputRoot: {
          borderRadius: 2,
        },
      },
    },
    HvButton: {
      classes: {
        root: {
          "--radius": theme.radii.full,
          ":where(:not(.HvButton-disabled,.HvButton-contained))": {
            "&[data-color=positive]": { color: theme.colors.pp.success },
            "&[data-color=warning]": { color: theme.colors.pp.warning },
            "&[data-color=negative]": { color: theme.colors.pp.error },
            ":hover": { backgroundColor: theme.colors.pp.primaryDimmed },
            ":active": { backgroundColor: theme.colors.pp.primarySubtle },
          },
        },
        contained: {
          ":where(:not(.HvButton-disabled))": {
            color: "#FFFFFF",
            "&[data-color=primary]": {
              backgroundColor: blue[600],
              ":hover": { backgroundColor: blue[700] },
              ":active": { backgroundColor: blue[800] },
            },
            "&[data-color=positive]": {
              ":hover": { backgroundColor: theme.colors.pp.successAction },
              ":active": { backgroundColor: theme.colors.pp.successStrong },
            },
            "&[data-color=warning]": {
              ":hover": { backgroundColor: theme.colors.pp.warningAction },
              ":active": { backgroundColor: theme.colors.pp.warningStrong },
            },
            "&[data-color=negative]": {
              ":hover": { backgroundColor: theme.colors.pp.errorAction },
              ":active": { backgroundColor: theme.colors.pp.errorStrong },
            },
          },
        },
        subtle: {
          borderColor: "color-mix(in srgb, currentcolor, transparent 60%)",
          ":where(:not(.HvButton-disabled))": {
            "&[data-color=primary]": {
              borderColor: buttonColors.primary.subtleBorder,
              backgroundColor: buttonColors.primary.subtleBg,
            },
            "&[data-color=secondary]": {
              borderColor: buttonColors.secondary.subtleBorder,
              backgroundColor: buttonColors.secondary.subtleBg,
            },
            ":hover": {
              backgroundColor: theme.colors.pp.primaryDimmed,
            },
            ":active": {
              borderColor: "transparent",
              backgroundColor: theme.colors.pp.primarySubtle,
            },
            "&[data-color=positive]": {
              borderColor: buttonColors.success.subtleBorder,
              backgroundColor: theme.colors.pp.successDimmed,
              ":hover": { backgroundColor: buttonColors.success.subtleBg },
              ":active": { backgroundColor: buttonColors.success.subtleBorder },
            },
            "&[data-color=warning]": {
              borderColor: buttonColors.warning.subtleBorder,
              backgroundColor: theme.colors.pp.warningDimmed,
              ":hover": { backgroundColor: buttonColors.warning.subtleBg },
              ":active": { backgroundColor: buttonColors.warning.subtleBorder },
            },
            "&[data-color=negative]": {
              borderColor: buttonColors.error.subtleBorder,
              backgroundColor: theme.colors.pp.errorDimmed,
              ":hover": { backgroundColor: buttonColors.error.subtleBg },
              ":active": { backgroundColor: buttonColors.error.subtleBorder },
            },
          },
        },
        ghost: {
          ":where(:not(.HvButton-disabled))": {
            "&[data-color=positive]": {
              ":hover": { backgroundColor: theme.colors.pp.successDimmed },
              ":active": { backgroundColor: buttonColors.success.subtleBg },
            },
            "&[data-color=warning]": {
              ":hover": { backgroundColor: theme.colors.pp.warningDimmed },
              ":active": { backgroundColor: buttonColors.warning.subtleBg },
            },
            "&[data-color=negative]": {
              ":hover": { backgroundColor: theme.colors.pp.errorDimmed },
              ":active": { backgroundColor: buttonColors.error.subtleBg },
            },
          },
        },

        semantic: {},

        disabled: {
          color: theme.colors.pp.textDisabled,
          ":not(.HvButton-ghost)": {
            borderColor: "transparent",
            backgroundColor: theme.colors.pp.bgDisabled,
            "&:hover, &:active": {
              backgroundColor: theme.colors.pp.bgDisabled,
            },
          },
        },
      },
    },
    HvMultiButton: {
      classes: {
        multiple: {
          borderRadius: theme.radii.full,
          borderColor: buttonColors.secondary.subtleBorder,
          "& .HvMultiButton-button": {
            borderColor: "inherit",
            ...theme.typography.body,
            "&.HvMultiButton-firstButton": {
              borderRadius: `${theme.radii.full} 0 0 ${theme.radii.full}`,
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: `0 ${theme.radii.full} ${theme.radii.full} 0`,
            },
            "&.HvMultiButton-selected": {
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
              backgroundColor: theme.colors.pp.primaryDimmed,
            },
            "&:not(.HvMultiButton-firstButton, .HvMultiButton-lastButton)": {
              borderRadius: 0,
            },
          },
        },
        vertical: {
          borderColor: buttonColors.secondary.subtleBorder,
          "& .HvMultiButton-button": {
            borderColor: "inherit",
            "&.HvMultiButton-firstButton": {
              borderRadius: "16px 16px 0 0",
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: "0 0 16px 16px",
            },
            "&.HvMultiButton-selected": {
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
              backgroundColor: theme.colors.pp.primaryDimmed,
            },
          },
        },
        splitGroup: {},
        splitGroupDisabled: {},
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
          outline: `1px solid ${theme.colors.pp.dividerSubtle}`,
          overflow: "hidden",
          height: "fit-content",
          borderRadius: theme.space.sm,
          "& > :last-child:not(.HvCardMedia-root)": {
            paddingBottom: theme.space.sm,
          },
          "& .HvActionBar-root": {
            padding: theme.spacing("xs", "sm"),
            borderTop: "none",
          },
        },
        selectable: {
          ":hover": {
            outline: `1px solid ${theme.colors.primary_20}`,
            backgroundColor: theme.colors.pp.primaryDimmed,
          },
        },
        semanticContainer: {
          display: "none",
        },
        selected: {
          outline: `1px solid ${theme.colors.pp.primaryAction}`,
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
    HvTabs: {
      classes: {
        floating: {
          "& .HvTab-root": {
            marginTop: 0,
            zIndex: 1,
            "&:is(.HvTab-selected)": {
              borderColor: "transparent",
              backgroundColor: "transparent",
            },
            "&:hover": {
              borderRadius: theme.radii.full,
            },
            "::after": {
              display: "none",
            },
          },
          "& .HvTabs-indicator": {
            height: "100%",
            backgroundColor: theme.colors.pp.bgSurface,
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: theme.radii.full,
          },
          "& .HvTabs-flexContainer": {
            display: "inline-flex",
            backgroundColor: theme.colors.pp.bgActive,
            borderRadius: theme.radii.full,
            marginLeft: 0,
          },
        },
      },
    },
    HvBaseInput: {
      classes: {
        root: {
          borderColor: inputColors.border,
          backgroundColor: inputColors.bg,
        },
      },
    },
    HvBaseDropdown: {
      classes: {
        header: {
          borderColor: inputColors.border,
          backgroundColor: inputColors.bg,
        },
        headerOpen: {
          borderColor: inputColors.border,
          "&:hover": {
            borderColor: inputColors.border,
          },
        },
        panel: {
          borderColor: inputColors.border,
        },
      },
    },
    HvDropDownMenu: {
      classes: {
        iconSelected: {
          "&[data-color=secondary]": {
            borderColor: inputColors.border,
          },
        },
      },
    },
  } satisfies Record<
    string,
    Record<string, any> & { classes?: Record<string, CSSObject> }
  >,
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
