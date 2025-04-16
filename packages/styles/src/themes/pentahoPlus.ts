import type { CSSObject } from "@emotion/serialize";

import { colors } from "../theme/base";
import { palette } from "../theme/colors";
import { radii } from "../theme/designTokens";
import { makeTheme } from "../utils/theme";

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
        brand: palette.blue[600],
        containerBackgroundHover: theme.alpha(palette.blue[600], 0.1),
        backgroundColor: palette.slate[100],
        atmo1: palette.slate[50],
        atmo2: palette.slate[100],
        atmo3: palette.slate[200],
        atmo4: palette.slate[300],
        base_light: palette.slate[50],
        base_dark: palette.slate[700],
        primary_80: palette.blue[500],
        primary_20: theme.alpha(palette.blue[600], 0.1),
        secondary: palette.slate[700],
        secondary_80: palette.slate[500],
        secondary_60: palette.slate[400],
        secondary_20: theme.alpha(palette.slate[700], 0.1),
        positive_120: palette.green[700],
        positive_80: palette.green[400],
        neutral: palette.sky[500],
        warning_120: palette.orange[500],
        warning_140: palette.orange[700],
        negative_120: palette.red[700],
        negative_80: palette.red[400],
        catastrophic: palette.rose[800],
        negative_20: palette.red[100],
        warning_20: palette.amber[100],
        positive_20: palette.green[100],
        neutral_20: palette.sky[100],
        shadow: `0px 2px 4px -1px ${theme.alpha(palette.slate[700], 0.08)}`,
        shad1: theme.alpha(palette.slate[700], 0.08),

        primary: palette.blue[600],
        primaryStrong: palette.blue[700],
        primaryDeep: palette.blue[800],
        primarySubtle: palette.blue[200],
        primaryDimmed: palette.blue[100],
        positive: palette.emerald[600],
        positiveStrong: palette.emerald[700],
        positiveDeep: palette.emerald[800],
        positiveDimmed: palette.emerald[50],
        positiveSubtle: palette.emerald[100],
        positiveBorder: palette.emerald[200],
        warning: palette.amber[500],
        warningStrong: palette.amber[600],
        warningDeep: palette.amber[700],
        warningDimmed: palette.amber[50],
        warningSubtle: palette.amber[100],
        warningBorder: palette.amber[200],
        negative: palette.red[600],
        negativeStrong: palette.red[700],
        negativeDeep: palette.red[800],
        negativeDimmed: palette.red[50],
        negativeSubtle: palette.red[100],
        negativeBorder: palette.red[200],
        info: palette.sky[500],
        infoStrong: palette.sky[600],
        infoDeep: palette.sky[700],
        infoDimmed: palette.sky[50],
        infoSubtle: palette.sky[100],
        infoBorder: palette.sky[200],

        text: palette.slate[700],
        textSubtle: palette.slate[500],
        textDisabled: palette.neutral[400],
        textDimmed: palette.slate[400],
        textLight: palette.slate[50],
        textDark: palette.slate[700],

        border: palette.slate[300],
        borderSubtle: palette.slate[200],
        borderStrong: palette.slate[500],
        borderDisabled: palette.neutral[400],

        bgPage: palette.slate[100],
        bgContainer: palette.slate[50],
        bgPageSecondary: palette.slate[200],
        bgContainerSecondary: palette.slate[100],
        bgHover: theme.alpha(palette.blue[600], 0.2),
        bgDisabled: palette.neutral[200],
        bgOverlay: theme.alpha(palette.slate[950], 0.6),
        dimmer: "#FFFFFF",
      },
      wicked: {
        type: "dark",
        ...colors.common,
        ...colors.dark,
        brand: palette.blue[600],
        containerBackgroundHover: theme.alpha(palette.blue[500], 0.1),
        backgroundColor: palette.slate[900],
        atmo1: palette.slate[800],
        atmo2: palette.slate[900],
        atmo3: palette.slate[950],
        atmo4: palette.slate[700],
        base_light: palette.slate[50],
        base_dark: palette.slate[700],
        primary_80: palette.blue[400],
        primary_20: theme.alpha(palette.blue[500], 0.1),
        secondary: palette.slate[50],
        secondary_80: palette.slate[200],
        secondary_60: palette.slate[300],
        secondary_20: theme.alpha(palette.slate[50], 0.1),
        positive_120: palette.green[600],
        positive_80: palette.green[400],
        neutral: palette.sky[500],
        warning_120: palette.amber[600],
        warning_140: palette.orange[600],
        negative_120: palette.red[600],
        negative_80: palette.red[300],
        catastrophic: palette.pink[600],
        negative_20: palette.red[100],
        warning_20: palette.amber[100],
        positive_20: palette.green[100],
        neutral_20: palette.sky[100],
        shadow: `0px 2px 4px -1px ${theme.alpha(palette.slate[700], 0.08)}`,
        shad1: theme.alpha(palette.slate[700], 0.08),

        primary: palette.blue[500],
        primaryStrong: palette.blue[600],
        primaryDeep: palette.blue[700],
        primarySubtle: palette.blue[900],
        primaryDimmed: palette.blue[950],
        positive: palette.green[600],
        positiveStrong: palette.green[500],
        positiveDeep: palette.green[300],
        positiveDimmed: palette.green[950],
        positiveSubtle: palette.green[900],
        positiveBorder: palette.green[800],
        warning: palette.yellow[500],
        warningStrong: palette.yellow[400],
        warningDeep: palette.yellow[300],
        warningDimmed: palette.yellow[950],
        warningSubtle: palette.yellow[900],
        warningBorder: palette.yellow[800],
        negative: palette.red[600],
        negativeStrong: palette.red[500],
        negativeDeep: palette.red[300],
        negativeDimmed: palette.red[950],
        negativeSubtle: palette.red[900],
        negativeBorder: palette.red[800],
        info: palette.cyan[500],
        infoStrong: palette.cyan[400],
        infoDeep: palette.cyan[300],
        infoDimmed: palette.cyan[950],
        infoSubtle: palette.cyan[900],
        infoBorder: palette.cyan[800],

        text: palette.slate[50],
        textSubtle: palette.slate[400],
        textDisabled: palette.neutral[500],
        textDimmed: palette.slate[700],
        textLight: palette.slate[50],
        textDark: palette.slate[700],

        border: palette.slate[700], // palette.slate[800],
        borderSubtle: palette.slate[950],
        borderStrong: palette.slate[400],
        borderDisabled: palette.neutral[700],

        bgPage: palette.slate[900],
        bgContainer: palette.slate[800], // palette.slate[950]
        bgPageSecondary: palette.slate[950],
        bgContainerSecondary: palette.slate[900],
        bgHover: theme.alpha(palette.blue[600], 0.2),
        bgDisabled: palette.neutral[900],
        bgOverlay: theme.alpha(palette.slate[900], 0.4),
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
    base: "4px",
    round: "8px",
    large: "16px",
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
          alignSelf: "start",
          borderRadius: theme.radii.round,
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
    HvSnackbarProvider: {
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
    },
    HvBaseCheckBox: {
      classes: {
        root: {
          borderRadius: theme.radii.base,
        },
      },
    },
    HvCheckBoxIcon: {
      classes: {
        root: {
          borderRadius: theme.radii.base,
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
          borderRadius: theme.radii.base,
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
          borderRadius: theme.radii.base,
          "&:hover": {
            backgroundColor: theme.colors.bgHover,
          },
          "& .HvBaseSwitch-switchBase": {
            "& .HvBaseSwitch-thumb": {
              borderColor: "transparent",
              boxShadow: `0px 1px 1px 0px ${theme.alpha(palette.slate[700], 0.16)}`,
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
    HvTagsInput: {
      classes: {
        tagsList: {
          backgroundColor: inputColors.bg,
          padding: theme.space.xxs,
        },
        singleLine: {
          height: 32,
        },
      },
    },
    HvTag: {
      showSelectIcon: false,
      size: "sm",
      classes: {
        root: {
          outline: `1px solid ${theme.colors.border}`,
          outlineOffset: -1,
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
        xs: { borderRadius: theme.radii.base },
        sm: { borderRadius: theme.radii.base },
        md: { borderRadius: theme.radii.round },
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
          ":where(:not(.HvButtonBase-disabled))": {
            ":hover": { backgroundColor: theme.colors.primaryDimmed },
            ":active": { backgroundColor: theme.colors.primarySubtle },
          },
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
          borderRadius: theme.radii.large,
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
          backgroundColor: palette.slate[900],
          borderRight: `1px solid ${palette.slate[500]}`,
          "& > :not(nav:first-of-type)": {
            borderTop: `1px solid ${palette.slate[500]}`,
          },
          "& > :only-child": {
            padding: theme.space.sm,
            "& .HvVerticalNavigationSlider-listContainer": { padding: 0 },
          },
        },
        slider: {
          "& > div:first-of-type": {
            borderBottom: `1px solid ${palette.slate[500]}`,
          },
        },
      },
    },
    HvVerticalNavigationAction: {
      classes: {
        action: {
          borderRadius: theme.radii.round,
          "&:hover, &:focus": {
            backgroundColor: palette.slate[700],
          },
        },
      },
    },
    HvVerticalNavigationSlider: {
      classes: {
        root: {
          minHeight: "32px",
          borderLeft: "unset",
          borderRadius: theme.radii.round,
          "&.HvIsFocused": {
            backgroundColor: palette.slate[700],
          },
          "&.HvListItem-interactive:not(.HvListItem-disabled):not(.HvListItem-selected):hover":
            {
              backgroundColor: palette.slate[700],
            },
        },
        listItemDisabled: {
          color: palette.neutral[500],
          backgroundColor: palette.neutral[800],
          "& .HvListItem-startAdornment": { backgroundColor: "transparent" },
          "& .HvListItem-endAdornment": { backgroundColor: "transparent" },
        },
        listItemSelected: {
          background: palette.blue[950],
          borderLeft: "unset",
        },
        listItemFocus: {
          background: palette.slate[700],
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
          borderRadius: theme.radii.round,
          ".HvVerticalNavigationTreeViewItem-selected>&": {
            background: palette.blue[950],
            borderLeft: "unset",
          },
          ":not(.HvVerticalNavigationTreeViewItem-disabled>&):not(.HvVerticalNavigationTreeViewItem-selected>&)":
            {
              "&:hover, &:focus-visible, &.focus-visible": {
                background: palette.slate[700],
              },
            },
          ".HvVerticalNavigationTreeViewItem-focused>&": {
            background: palette.slate[700],
          },
        },
        disabled: {
          "& .HvVerticalNavigationTreeViewItem-label": {
            color: palette.neutral[500],
          },
          "& .HvVerticalNavigationTreeViewItem-content": {
            background: palette.neutral[800],
          },
        },
        icon: {
          "& .HvAvatar-root": {
            borderRadius: theme.radii.round,
          },
        },
      },
    },
    HvCard: {
      classes: {
        root: {
          outlineColor: theme.colors.borderSubtle,
          "--rb": theme.radii.large,
          // default non-semantic card
          "&[data-color=sema0]": {
            overflow: "hidden",
            height: "fit-content",
            "--rt": theme.radii.large,
            "& .HvCard-semanticContainer": {
              display: "none",
            },
          },
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
            outlineColor: theme.colors.bgHover,
            backgroundColor: theme.colors.primaryDimmed,
          },
        },
        selected: {
          outlineColor: theme.colors.primaryDeep,
        },
        semanticBar: {
          "--bar-height": "2px",
          borderRadius: `${theme.radii.base} ${theme.radii.base} 0 0`,
        },
      },
    },
    HvCardHeader: {
      classes: {
        root: {
          flexDirection: "row-reverse",
          padding: theme.spacing("xs", "sm"),
          gap: 0,
        },
      },
    },
    HvCardContent: {
      classes: {
        content: {
          padding: theme.spacing("xs", "sm"),
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
            backgroundColor: theme.colors.bgPageSecondary,
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
          "--r": "calc(var(--HvButton-height) / 2)",
        },
        iconSelected: {
          "&[data-color=secondary]": {
            borderColor: theme.colors.textDimmed,
          },
        },
      },
    },
    HvNumberInput: {
      classes: {
        root: {
          ".HvBaseInput-disabled .HvInput-adornmentsBox": {
            backgroundColor: theme.colors.bgDisabled,
          },
        },
        adornmentsBox: {
          backgroundColor: theme.colors.bgContainer,
          borderLeft: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radii.none,
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
