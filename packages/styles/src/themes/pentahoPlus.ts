import type { CSSProperties } from "react";

import { colors } from "../tokens/colors";
import { makeTheme } from "../makeTheme";
import { radii } from "../tokens";

const pentahoPlus = makeTheme((theme) => ({
  name: "pentahoPlus",
  colors: {
    modes: {
      dawn: {
        type: "light",
        containerBackgroundHover: colors.light.primary_20,
        ...colors.common,
        ...colors.light,
        backgroundColor: "#F5F7F9",
        atmo1: "#FCFCFD",
        atmo2: "#F5F7F9",
        atmo3: "#ECEFF1",
        atmo4: "#D7DFE3",
        base_light: "#FCFCFD",
        primary: "#2563EB",
        primary_80: "#1E40AF",
        secondary: "#37474F",
        secondary_80: "#546E7A",
        secondary_60: "#78909C",
        primary_20: "#2563EB",
        positive: "#10b981",
        positive_120: "#047857",
        positive_80: "#6ee7b7",
        neutral: "#06b6d4",
        warning: "#eab308",
        warning_120: "#d97706",
        warning_140: "#ea580c",
        negative: "#dc2626",
        negative_120: "#991b1b",
        negative_80: "#f87171",
        catastrophic: "#6d28d9",
        negative_20: "#fef2f2",
        warning_20: "#fefce8",
        positive_20: "#ecfdf5",
        neutral_20: "#ecfeff",
      },
      wicked: {
        type: "dark",
        backgroundColor: colors.dark.atmo2,
        containerBackgroundHover: colors.dark.primary_20,
        ...colors.common,
        ...colors.dark,
      },
    },
  },
  fontFamily: {
    body: "Inter",
  },
  typography: {
    display: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl4,
      lineHeight: theme.lineHeights.xl4,
    },
    title1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl3,
      lineHeight: theme.lineHeights.xl3,
    },
    title2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl2,
      lineHeight: theme.lineHeights.xl2,
    },
    title3: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.xl,
      lineHeight: theme.lineHeights.xl,
    },
    title4: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.lg,
      lineHeight: theme.lineHeights.lg,
    },
    label: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    },
    body: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.base,
      lineHeight: theme.lineHeights.base,
    },
    captionLabel: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    },
    caption1: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    },
    caption2: {
      color: theme.colors.secondary,
      fontWeight: theme.fontWeights.normal,
      fontSize: theme.fontSizes.xs,
      lineHeight: theme.lineHeights.xs,
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
