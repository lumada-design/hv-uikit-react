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

const semaColors = ["positive", "warning", "negative", "info"] as const;

const notificationMap = {
  success: "positive",
  warning: "warning",
  error: "negative",
  default: "info",
  info: "info",
  accent: "accent",
} as const;

const inputColors = {
  bg: ld("#FFFFFF", "#020617"),
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
        containerBackgroundHover: theme.alpha(blue[600], 0.1),
        backgroundColor: slate[100],
        atmo1: slate[50],
        atmo2: slate[100],
        atmo3: slate[200],
        atmo4: slate[300],
        base_light: slate[50],
        base_dark: slate[700],
        primary_80: blue[500],
        primary_20: theme.alpha(blue[600], 0.1),
        secondary: slate[700],
        secondary_80: slate[500],
        secondary_60: slate[400],
        secondary_20: theme.alpha(slate[700], 0.1),
        positive_120: green[700],
        positive_80: green[400],
        neutral: sky[500],
        warning_120: orange[500],
        warning_140: orange[700],
        negative_120: red[700],
        negative_80: red[400],
        catastrophic: rose[800],
        negative_20: red[100],
        warning_20: amber[100],
        positive_20: green[100],
        neutral_20: sky[100],
        shadow: `0px 2px 4px -1px ${theme.alpha(slate[700], 0.08)}`,
        shad1: theme.alpha(slate[700], 0.08),

        primary: blue[600],
        primaryStrong: blue[700],
        primaryDeep: blue[800],
        primarySubtle: blue[200],
        primaryDimmed: blue[100],
        positive: emerald[600],
        positiveStrong: emerald[700],
        positiveDeep: emerald[800],
        positiveDimmed: emerald[50],
        positiveSubtle: emerald[100],
        positiveBorder: emerald[200],
        warning: amber[500],
        warningStrong: amber[600],
        warningDeep: amber[700],
        warningDimmed: amber[50],
        warningSubtle: amber[100],
        warningBorder: amber[200],
        negative: red[600],
        negativeStrong: red[700],
        negativeDeep: red[800],
        negativeDimmed: red[50],
        negativeSubtle: red[100],
        negativeBorder: red[200],
        info: sky[500],
        infoStrong: sky[600],
        infoDeep: sky[700],
        infoDimmed: sky[50],
        infoSubtle: sky[100],
        infoBorder: sky[200],

        text: slate[700],
        textSubtle: slate[500],
        textDisabled: neutral[400],
        textDimmed: slate[400],
        textLight: slate[50],
        textDark: slate[700],

        border: slate[300],
        borderSubtle: slate[200],
        borderStrong: slate[500],
        borderDisabled: neutral[400],

        bgPage: slate[100],
        bgContainer: slate[50],
        bgPageSecondary: slate[200],
        bgContainerSecondary: slate[100],
        bgHover: theme.alpha(blue[600], 0.2),
        bgDisabled: neutral[200],
        bgOverlay: theme.alpha(slate[950], 0.6),
        dimmer: "#FFFFFF",
      },
      wicked: {
        type: "dark",
        ...colors.common,
        ...colors.dark,
        brand: blue[600],
        containerBackgroundHover: theme.alpha(blue[500], 0.1),
        backgroundColor: slate[900],
        atmo1: slate[800],
        atmo2: slate[900],
        atmo3: slate[950],
        atmo4: slate[700],
        base_light: slate[50],
        base_dark: slate[700],
        primary_80: blue[400],
        primary_20: theme.alpha(blue[500], 0.1),
        secondary: slate[50],
        secondary_80: slate[200],
        secondary_60: slate[300],
        secondary_20: theme.alpha(slate[50], 0.1),
        positive_120: green[600],
        positive_80: green[400],
        neutral: sky[500],
        warning_120: amber[600],
        warning_140: orange[600],
        negative_120: red[600],
        negative_80: red[300],
        catastrophic: pink[600],
        negative_20: red[100],
        warning_20: amber[100],
        positive_20: green[100],
        neutral_20: sky[100],
        shadow: `0px 2px 4px -1px ${theme.alpha(slate[700], 0.08)}`,
        shad1: theme.alpha(slate[700], 0.08),

        primary: blue[500],
        primaryStrong: blue[600],
        primaryDeep: blue[700],
        primarySubtle: blue[900],
        primaryDimmed: blue[950],
        positive: green[600],
        positiveStrong: green[500],
        positiveDeep: green[300],
        positiveDimmed: green[950],
        positiveSubtle: green[900],
        positiveBorder: green[800],
        warning: yellow[500],
        warningStrong: yellow[400],
        warningDeep: yellow[300],
        warningDimmed: yellow[950],
        warningSubtle: yellow[900],
        warningBorder: yellow[800],
        negative: red[600],
        negativeStrong: red[500],
        negativeDeep: red[300],
        negativeDimmed: red[950],
        negativeSubtle: red[900],
        negativeBorder: red[800],
        info: cyan[500],
        infoStrong: cyan[400],
        infoDeep: cyan[300],
        infoDimmed: cyan[950],
        infoSubtle: cyan[900],
        infoBorder: cyan[800],

        text: slate[50],
        textSubtle: slate[400],
        textDisabled: neutral[500],
        textDimmed: slate[700],
        textLight: slate[50],
        textDark: slate[700],

        border: slate[700], // slate[800],
        borderSubtle: slate[950],
        borderStrong: slate[400],
        borderDisabled: neutral[700],

        bgPage: slate[900],
        bgContainer: slate[800], // slate[950]
        bgPageSecondary: slate[950],
        bgContainerSecondary: slate[900],
        bgHover: theme.alpha(blue[600], 0.2),
        bgDisabled: neutral[900],
        bgOverlay: theme.alpha(slate[900], 0.4),
        dimmer: "#000000",
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
    sm: "40px",
    md: "48px",
    lg: "56px",
    xl: "64px",
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
    HvCallout: {
      classes: {
        root: { outline: "1px solid var(--icolor, currentcolor)" },
        ...Object.fromEntries(
          Object.entries(notificationMap).map(([variant, color]) => [
            variant,
            {
              backgroundColor: theme.colors[`${color}Dimmed`],
              "--icolor": theme.colors[color],
              "--outline": theme.colors[`${color}Border`],
              "--bg": theme.colors[`${color}Subtle`],
              "--title": theme.colors[`${color}Deep`],
            },
          ]),
        ),
        message: {
          "&&": {
            color: theme.colors.secondary,
          },
        },
        messageIcon: {
          borderRadius: 8,
          color: "var(--icolor)",
          outline: `1px solid var(--outline)`,
          backgroundColor: "var(--bg)",
        },
        messageTitle: {
          color: "var(--title)",
        },
        actionClose: {
          color: theme.colors.secondary,
        },
      },
    },
    HvBannerContent: {
      classes: {
        root: { borderRadius: theme.radii.round },
      },
    },
    HvSnackbar: {
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
    },
    HvBaseCheckBox: {
      classes: {
        root: {
          borderRadius: "4px",
        },
      },
    },
    HvCheckBoxIcon: {
      classes: {
        root: {
          borderRadius: "4px",
        },
        checked: {
          backgroundColor: theme.colors.primary,
          color: theme.colors.atmo1,
        },
      },
    },
    HvBaseRadio: {
      classes: {
        root: {
          borderRadius: "4px",
        },
      },
    },
    HvRadioIcon: {
      classes: {
        checked: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
    HvBaseSwitch: {
      classes: {
        root: {
          borderRadius: 4,
          "&:hover": {
            backgroundColor: theme.colors.bgHover,
          },
          "& .HvBaseSwitch-switchBase": {
            "& .HvBaseSwitch-thumb": {
              borderColor: "transparent",
              boxShadow: `0px 1px 1px 0px ${theme.alpha(slate[700], 0.16)}`,
            },
            "+.HvBaseSwitch-track": {
              height: 14,
              backgroundColor: theme.colors.textDimmed,
              borderColor: theme.colors.textSubtle,
            },
            "&.HvBaseSwitch-checked": {
              "& .HvBaseSwitch-thumb": {
                border: `1px solid ${theme.colors.bgContainer}`,
              },
              "+.HvBaseSwitch-track": {
                borderColor: theme.colors.primaryStrong,
              },
            },
            "&.HvBaseSwitch-disabled": {
              "& .HvBaseSwitch-thumb": {
                backgroundColor: theme.colors.borderDisabled,
                borderColor: theme.colors.borderDisabled,
              },
              "+.HvBaseSwitch-track": {
                borderColor: theme.colors.borderDisabled,
                backgroundColor: theme.colors.bgDisabled,
              },
            },
          },
        },
      },
    },
    HvSelect: {
      classes: {
        root: {
          "&& .HvButton-secondarySubtle": {
            borderColor: theme.colors.textDimmed,
            backgroundColor: inputColors.bg,
          },
        },
        select: {
          borderRadius: theme.radii.base,
        },
        panel: {
          borderColor: theme.colors.textDimmed,
        },
      },
    },
    HvSuggestions: {
      classes: {
        list: {
          borderColor: theme.colors.textDimmed,
        },
      },
    },
    HvTag: {
      showSelectIcon: false,
      classes: {
        root: {
          outline: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radii.round,
          ":where(:not([data-color],.HvTag-disabled))": {
            color: theme.colors.text,
            "--tagColor": theme.colors.bgContainer,
          },

          ":where([data-color]:not(.HvTag-disabled))": {
            ":not([data-color$=_20],[data-color^=cat])": {
              color: "var(--tagColor)",
              backgroundColor: theme.mix("var(--tagColor)", "8%", "white"),
              outlineColor: theme.mix("var(--tagColor)", "30%", "white"),
              "&.HvTag-clickable:is(:hover,:focus-visible)": {
                backgroundColor: theme.mix("var(--tagColor)", "20%", "white"),
              },
            },

            ...Object.fromEntries(
              semaColors.map((color) => [
                [`&[data-color=${color}]`],
                {
                  color: theme.colors[`${color}Strong`],
                  backgroundColor: theme.colors[`${color}Dimmed`],
                  outlineColor: theme.colors[`${color}Border`],
                  "&.HvTag-clickable:has(:hover,:focus-visible)": {
                    backgroundColor: theme.colors[`${color}Subtle`],
                  },
                },
              ]),
            ),
          },
        },
        hasIcon: {
          paddingLeft: theme.space.xs,
        },
        xs: { borderRadius: 4 },
        sm: { borderRadius: 6 },
        md: { borderRadius: 8 },
        label: {
          paddingLeft: 8,
          paddingRight: 8,
        },
        deleteIcon: {
          borderRadius: "inherit",
          marginRight: 4,
        },
        clickable: {
          ":hover": {
            backgroundColor: theme.colors.bgHover,
          },
        },
        selected: {
          "&&": {
            outlineColor: "currentcolor",
          },
        },
        disabled: {
          color: theme.colors.textDisabled,
          outlineColor: "transparent",
          "&,:hover": {
            backgroundColor: theme.colors.bgDisabled,
          },
        },
      },
    },
    HvIconContainer: {
      classes: {
        root: {
          padding: 0,
        },
        xs: {
          fontSize: 16,
          padding: 0,
        },
        sm: {
          fontSize: 20,
          padding: 2,
        },
        md: {
          fontSize: 26,
          padding: 3,
        },
        lg: {
          fontSize: 36,
          padding: 6,
        },
        xl: {
          fontSize: 48,
          padding: 8,
        },
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
    HvButtonBase: {
      classes: {
        root: {
          ":hover": { backgroundColor: theme.colors.primaryDimmed },
          ":active": { backgroundColor: theme.colors.primarySubtle },
        },
      },
    },
    HvButton: {
      classes: {
        root: {
          "--radius": theme.radii.full,
          ":where(:not(.HvButton-disabled,.HvButton-contained))": {
            "&[data-color=positive]": { color: theme.colors.positive },
            "&[data-color=warning]": { color: theme.colors.warning },
            "&[data-color=negative]": { color: theme.colors.negative },
            ":hover": { backgroundColor: theme.colors.primaryDimmed },
            ":active": { backgroundColor: theme.colors.primarySubtle },
          },
        },
        contained: {
          ":where(:not(.HvButton-disabled))": {
            color: "#FFFFFF",
            "&[data-color=primary]": {
              backgroundColor: theme.colors.primary,
              ":hover": { backgroundColor: theme.colors.primaryStrong },
              ":active": { backgroundColor: theme.colors.primaryDeep },
            },
            "&[data-color=positive]": {
              ":hover": { backgroundColor: theme.colors.positiveDeep },
              ":active": { backgroundColor: theme.colors.positiveStrong },
            },
            "&[data-color=warning]": {
              ":hover": { backgroundColor: theme.colors.warningDeep },
              ":active": { backgroundColor: theme.colors.warningStrong },
            },
            "&[data-color=negative]": {
              ":hover": { backgroundColor: theme.colors.negativeDeep },
              ":active": { backgroundColor: theme.colors.negativeStrong },
            },
          },
        },
        subtle: {
          borderColor: theme.alpha("currentcolor", 0.4),
          ":where(:not(.HvButton-disabled))": {
            "&[data-color=primary]": {
              borderColor: theme.colors.primarySubtle,
              backgroundColor: theme.colors.primaryDimmed,
            },
            "&[data-color=secondary]": {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.bgContainerSecondary,
            },
            ":hover": {
              backgroundColor: theme.colors.primaryDimmed,
            },
            ":active": {
              borderColor: "transparent",
              backgroundColor: theme.colors.primarySubtle,
            },
            "&[data-color=positive]": {
              borderColor: theme.colors.positiveBorder,
              backgroundColor: theme.colors.positiveDimmed,
              ":hover": { backgroundColor: theme.colors.positiveSubtle },
              ":active": {
                backgroundColor: theme.colors.positiveBorder,
              },
            },
            "&[data-color=warning]": {
              borderColor: theme.colors.warningBorder,
              backgroundColor: theme.colors.warningDimmed,
              ":hover": { backgroundColor: theme.colors.warningSubtle },
              ":active": { backgroundColor: theme.colors.warningBorder },
            },
            "&[data-color=negative]": {
              borderColor: theme.colors.negativeBorder,
              backgroundColor: theme.colors.negativeDimmed,
              ":hover": { backgroundColor: theme.colors.negativeSubtle },
              ":active": {
                backgroundColor: theme.colors.negativeBorder,
              },
            },
          },
        },
        ghost: {
          ":where(:not(.HvButton-disabled))": {
            "&[data-color=positive]": {
              ":hover": { backgroundColor: theme.colors.positiveDimmed },
              ":active": { backgroundColor: theme.colors.positiveSubtle },
            },
            "&[data-color=warning]": {
              ":hover": { backgroundColor: theme.colors.warningDimmed },
              ":active": { backgroundColor: theme.colors.warningSubtle },
            },
            "&[data-color=negative]": {
              ":hover": { backgroundColor: theme.colors.negativeDimmed },
              ":active": { backgroundColor: theme.colors.negativeSubtle },
            },
          },
        },
        disabled: {
          color: theme.colors.textDisabled,
          ":not(.HvButton-ghost)": {
            borderColor: "transparent",
            "&,:hover,:active": {
              backgroundColor: theme.colors.bgDisabled,
            },
          },
        },
      },
    },
    HvMultiButton: {
      classes: {
        multiple: {
          borderRadius: theme.radii.full,
          borderColor: theme.colors.border,
          "& .HvMultiButton-button": {
            borderColor: "inherit",
            ...theme.typography.body,
            "&.HvMultiButton-selected": {
              color: theme.colors.primary,
              backgroundColor: theme.colors.primaryDimmed,
            },
            "&:not(.HvMultiButton-firstButton, .HvMultiButton-lastButton)": {
              borderRadius: 0,
            },
          },
        },
        vertical: {
          borderRadius: 16,
          borderColor: theme.colors.border,
        },
      },
    },
    HvDropdownButton: {
      classes: {
        disabled: {
          backgroundColor: theme.colors.bgDisabled,
          borderColor: theme.colors.bgDisabled,
          "&.HvButton-subtle": {
            borderColor: theme.colors.bgDisabled,
            "&,:hover": {
              backgroundColor: theme.colors.bgDisabled,
            },
          },
          "&.HvButton-ghost": {
            borderColor: theme.colors.bgDisabled,
            "&,:hover": {
              backgroundColor: theme.colors.bgDisabled,
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
          width: 280,
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
          outline: `1px solid ${theme.colors.borderSubtle}`,
          overflow: "hidden",
          height: "fit-content",
          borderRadius: 16,
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
            backgroundColor: theme.colors.primaryDimmed,
          },
        },
        semanticContainer: {
          display: "none",
        },
        selected: {
          outline: `1px solid ${theme.colors.primaryDeep}`,
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
            backgroundColor: theme.colors.bgContainer,
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: theme.radii.full,
          },
          "& .HvTabs-flexContainer": {
            display: "inline-flex",
            backgroundColor: theme.colors.bgContainerSecondary,
            borderRadius: theme.radii.full,
            marginLeft: 0,
          },
        },
      },
    },
    HvLabel: {
      classes: {
        root: {
          "& span[aria-hidden]": {
            color: theme.form.errorColor,
          },
        },
      },
    },
    HvBaseInput: {
      classes: {
        root: {
          borderColor: theme.colors.textDimmed,
          backgroundColor: inputColors.bg,
        },
        disabled: {
          backgroundColor: theme.colors.bgDisabled,
        },
      },
    },
    HvInput: {
      classes: {
        label: {
          "& span[aria-hidden]::before": {
            content: '" "',
          },
        },
        inputRoot: {
          ":has([type=search])": {
            borderRadius: theme.radii.full,
          },
        },
      },
    },
    HvBaseDropdown: {
      classes: {
        header: {
          borderColor: theme.colors.textDimmed,
          backgroundColor: inputColors.bg,
        },
        headerOpen: {
          "&,:hover": {
            borderColor: theme.colors.textDimmed,
          },
        },
        panel: {
          borderColor: theme.colors.textDimmed,
        },
      },
    },
    HvDropDownMenu: {
      classes: {
        root: {
          "--r": theme.radii.full,
        },
        iconSelected: {
          "&[data-color=secondary]": {
            borderColor: theme.colors.textDimmed,
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
  form: {
    errorColor: theme.colors.negative,
  },
  bulkActions: {
    actionButtonVariant: "primaryGhost",
  },
  table: {
    rowStripedBackgroundColorEven: theme.colors.atmo1, // TODO - remove in v6
    rowStripedBackgroundColorOdd: "transparent", // TODO - remove in v6
    rowExpandBackgroundColor: theme.colors.atmo2, // TODO - remove in v6
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
    actionButtonVariant: "secondaryGhost",
  },
}));

export default pentahoPlus;
