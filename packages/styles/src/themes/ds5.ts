import type { CSSProperties } from "react";

import { makeColors, makeTheme } from "../makeTheme";

const ds5 = makeTheme((theme) => ({
  name: "ds5",
  colors: makeColors({}),
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
  components: {
    HvAvatar: {
      classes: {
        square: {
          borderRadius: theme.radii.round,
        },
      },
    },
    HvBannerContent: {
      classes: {
        root: {
          borderRadius: 0,
        },
      },
    },
    HvBaseDropdown: {
      classes: {
        headerOpen: {
          "--r": theme.radii.round,
          "&[data-popper-placement*='top']": {
            borderRadius: "0 0 var(--r) var(--r)",
          },
          "&[data-popper-placement*='bottom']": {
            borderRadius: "var(--r) var(--r) 0 0",
          },
        },
        panel: {
          "--r": theme.radii.round,
          "&[data-popper-placement*='top']": {
            top: 1,
            borderRadius: "var(--r) var(--r) 0 0",
          },
          "&[data-popper-placement*='bottom']": {
            top: -1,
            borderRadius: "0 0 var(--r) var(--r)",
          },
        },
      },
    },
    HvButton: {
      radius: "round",
      classes: {
        root: {
          ":where(:not(.HvButton-disabled,.HvButton-contained))": {
            "&[data-color=warning]": { color: theme.colors.warning_140 },
          },
        },
        contained: {
          ":where([data-color=primary]:not(.HvButton-disabled))": {
            ":hover, &:focus-visible": {
              backgroundColor: theme.colors.primary_80,
              borderColor: theme.colors.primary_80,
            },
          },
          ":where([data-color=positive]:not(.HvButton-disabled))": {
            ":hover, &:focus-visible": {
              backgroundColor: theme.colors.positive_80,
              borderColor: theme.colors.positive_80,
            },
          },
          ":where([data-color=warning]:not(.HvButton-disabled))": {
            backgroundColor: theme.colors.warning_120,
            ":hover, &:focus-visible": {
              backgroundColor: theme.colors.warning_140,
              borderColor: theme.colors.warning_140,
            },
          },
          ":where([data-color=negative]:not(.HvButton-disabled))": {
            ":hover, &:focus-visible": {
              backgroundColor: theme.colors.negative_80,
              borderColor: theme.colors.negative_80,
            },
          },
        },
      },
    },
    HvDropdownButton: {
      classes: {
        open: {
          "&[data-popper-placement*='top']": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
          "&[data-popper-placement*='bottom']": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
    },
    HvMultiButton: {
      classes: {
        splitGroup: {
          // NEXT5 subtle multi-buttons have a custom background
          "& .HvButton-subtle": {
            backgroundColor: theme.colors.atmo1,
          },
          "&& .HvButton-disabled": {
            backgroundColor: theme.colors.atmo3,
          },
        },
      },
    },
    HvSelect: {
      classes: {
        popper: {
          "--r": theme.radii.round,
          "&[data-popper-placement*='top'] .HvSelect-panel": {
            borderRadius: "var(--r) var(--r) 0 0",
          },
          "&[data-popper-placement*='bottom'] .HvSelect-panel": {
            borderRadius: "0 0 var(--r) var(--r)",
          },
        },
      },
    },
    HvTab: {
      classes: {
        root: {
          "&.HvTab-selected": {
            color: theme.colors.secondary,
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
  } satisfies Record<string, Record<string, any> | { classes?: CSSProperties }>,
  header: {
    height: "64px",
    secondLevelHeight: "56px",
  },
  form: {
    errorColor: theme.colors.negative_120,
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
    actionButtonVariant: "semantic",
  },
}));

export default ds5;
