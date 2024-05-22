import type { CSSProperties } from "react";

import { makeTheme } from "../makeTheme";
import { radii } from "../tokens";
import { colors } from "../tokens/colors";

const pentahoPlus = makeTheme((theme) => ({
  name: "pentahoPlus",
  colors: {
    modes: {
      dawn: {
        type: "light",
        ...colors.common,
        ...colors.light,
        containerBackgroundHover: "#3358D419",
        backgroundColor: "#F1F5F9",
        atmo1: "#F8FAFC",
        atmo2: "#F1F5F9",
        atmo3: "#E2E8F0",
        atmo4: "#CBD5E1",
        base_light: "#F8FAFC",
        primary: "#3358D4",
        primary_80: "#2E3F9F",
        secondary: "#334155",
        secondary_80: "#475569",
        secondary_60: "#64748B",
        primary_20: "rgba(51, 88, 212, 0.1)",
        positive: "#16A34A",
        positive_120: "#166534",
        positive_80: "#4ADE80",
        neutral: "#06B6D4",
        warning: "#EAB308",
        warning_120: "#D97706",
        warning_140: "#EA580C",
        negative: "#DC2626",
        negative_120: "#991b1b",
        negative_80: "#f87171",
        catastrophic: "#6B21A8",
        negative_20: "#fef2f2",
        warning_20: "#fefce8",
        positive_20: "#F0FDF4",
        neutral_20: "#ecfeff",
        shadow: "0px 2px 4px -1px rgba(51, 65, 85, 0.08)",
        shad1: "rgba(51, 65, 85, 0.08)",
      },
      wicked: {
        type: "dark",
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
    HvButton: {
      classes: {
        root: {
          borderRadius: theme.radii.full,
          padding: theme.spacing(0, "sm"),
          "&:active": {
            boxShadow: `inset 0 1px 2px 0 #00000033`, // 33 = 20% opacity
          },
        },
        disabled: {
          backgroundColor: "#E2E8F0",
          "&:hover": {
            backgroundColor: "#E2E8F0",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
        primary: {
          "&:hover": {
            backgroundColor: theme.colors.primary_80,
          },
          "&:active": {
            backgroundColor: theme.colors.primary_80,
            boxShadow: `inset 0 1px 2px 0 #0000004D`, // 4D = 30% opacity
          },
        },
        subtle: {
          border: "none",
          backgroundColor: theme.colors.atmo1,
          boxShadow: theme.colors.shadow,
          "&.HvButton-disabled": {
            backgroundColor: "#E2E8F0",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#E2E8F0",
            },
            "&:active": {
              boxShadow: "none",
            },
          },
        },
      },
    },
    HvMultiButton: {
      classes: {
        multiple: {
          backgroundColor: "#EEEEEE",
          color: "#999999",
          borderRadius: 20,
          "& button.HvMultiButton-button": {
            border: "none",
            backgroundColor: "transparent",
            "&.HvMultiButton-firstButton": {
              borderRadius: "20px 0 0 20px",
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: "0 20px 20px 0",
            },
            "&.HvMultiButton-selected": {
              borderRadius: 20,
              border: "none",
              color: theme.colors.primary,
              backgroundColor: theme.colors.atmo1,
            },
            "&:disabled": {
              border: "none",
              "&:hover": {
                border: "none",
                backgroundColor: "transparent",
              },
            },
          },
        },
        vertical: {
          backgroundColor: "#EEEEEE",
          color: "#999999",
          borderRadius: 20,
          "& button.HvMultiButton-button": {
            border: "none",
            backgroundColor: "transparent",
            "&.HvMultiButton-firstButton": {
              borderRadius: "20px 0 0 20px",
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: "0 20px 20px 0",
            },
            "&.HvMultiButton-selected": {
              borderRadius: 20,
              border: "none",
              color: theme.colors.primary,
              backgroundColor: theme.colors.atmo1,
            },
            "&:disabled": {
              border: "none",
            },
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
