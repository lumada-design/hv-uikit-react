import type { CSSProperties } from "react";

import { makeTheme } from "../makeTheme";
import { radii } from "../tokens";
import { colors } from "../tokens/colors";
import {
  amber,
  blue,
  green,
  orange,
  pink,
  red,
  rose,
  sky,
  slate,
} from "../tokens/colorsPalette";

const pentahoPlus = makeTheme((theme) => ({
  name: "pentahoPlus",
  colors: {
    modes: {
      dawn: {
        type: "light",
        ...colors.common,
        ...colors.light,
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
          borderColor: "transparent",
          backgroundColor: theme.colors.atmo1,
          boxShadow: theme.colors.shadow,
          "&.HvButton-disabled": {
            backgroundColor: theme.colors.atmo3,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: theme.colors.atmo3,
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
          borderRadius: theme.radii.full,
          "& button.HvMultiButton-button": {
            borderColor: "transparent",
            "&.HvMultiButton-firstButton": {
              borderColor: "transparent",
              borderRadius: `${theme.radii.full} 0 0 ${theme.radii.full}`,
              "&:disabled": {
                borderColor: "transparent",
                "&:hover": {
                  borderColor: "transparent",
                },
              },
            },
            "&.HvMultiButton-lastButton": {
              borderColor: "transparent",
              borderRadius: `0 ${theme.radii.full} ${theme.radii.full} 0`,
              "&:disabled": {
                borderColor: "transparent",
                "&:hover": {
                  borderColor: "transparent",
                },
              },
            },
            "&.HvMultiButton-selected": {
              borderRadius: theme.radii.full,
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
          },
        },
        vertical: {
          borderRadius: theme.radii.full,
          "& button.HvMultiButton-button": {
            borderRadius: theme.radii.full,
            borderColor: "transparent",
            "&.HvMultiButton-firstButton": {
              borderRadius: theme.radii.full,
              borderColor: "transparent",
              "&:disabled": {
                borderColor: "transparent",
                "&:hover": { borderColor: "transparent" },
              },
            },
            "&.HvMultiButton-lastButton": {
              borderRadius: theme.radii.full,
              borderColor: "transparent",
              "&:disabled": {
                borderColor: "transparent",
                "&:hover": { borderColor: "transparent" },
              },
            },
            "&.HvMultiButton-selected": {
              borderRadius: theme.radii.full,
              borderColor: "transparent",
              color: theme.colors.primary,
              backgroundColor: theme.colors.atmo1,
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
