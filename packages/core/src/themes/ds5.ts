import {
  ds5 as ds5Base,
  mergeTheme,
  theme,
} from "@hitachivantara/uikit-styles";

export const ds5 = mergeTheme(ds5Base, {
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
    HvStatusIcon: {
      type: "simple",
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
  } satisfies Record<
    string,
    Record<string, any> | { classes?: React.CSSProperties }
  >,
});
