import type { CSSObject } from "@emotion/serialize";
import {
  blue,
  mergeTheme,
  neutral,
  pentahoPlus as pentahoPlusBase,
  slate,
  theme,
} from "@hitachivantara/uikit-styles";

import type { HvSectionProps } from "../Section";

type CSSClasses<Props extends Record<string, any>> = Omit<Props, "classes"> & {
  classes?: Record<string, CSSObject>;
};

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

const popperStyles = {
  backgroundColor: theme.colors.bgContainer,
  border: `1px solid ${theme.colors.borderSubtle}`,
  borderRadius: theme.radii.large,
  boxShadow: `0px 0px 6px 0px rgba(65, 65, 65, 0.08)`,
};

export const pentahoPlus = mergeTheme(pentahoPlusBase, {
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
          color: ld(theme.colors.textLight, theme.colors.textDark),
          "&[data-color='textSubtle']:not(.HvBadge-badgePosition:empty)": {
            color: theme.colors.textSubtle,
            backgroundColor: theme.colors.bgPageSecondary,
          },
          "&[data-color='primary']:not(.HvBadge-badgePosition:empty)": {
            color: theme.colors.primary,
            backgroundColor: theme.colors.primaryDimmed,
          },
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
              backgroundColor: theme.mix(`${color}Dimmed`, 0.5, "dimmer"),
              "--icolor": theme.colors[color],
              "--title": theme.colors[`${color}Deep`],
            },
          ]),
        ),
        message: {
          "&&": {
            color: theme.colors.text,
          },
        },
        messageIcon: {
          alignSelf: "start",
        },
        messageTitle: {
          color: "var(--title)",
        },
        actionClose: {
          color: theme.colors.text,
        },
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
          "--bg-color": theme.colors.primary,
          color: theme.colors.bgContainer,
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
          "--bg-color": theme.colors.primary,
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
    HvSection: {
      classes: {
        content: {
          backgroundColor: theme.colors.bgPage, // = bgContainerSecondary
        },
      },
    } satisfies CSSClasses<HvSectionProps>,
    HvSelect: {
      classes: {
        root: {
          borderRadius: theme.radii.round,
          "&& .HvButton-secondarySubtle": {
            borderColor: theme.colors.textDimmed,
            backgroundColor: inputColors.bg,
          },
        },
        select: {
          borderRadius: theme.radii.round,
        },
        panel: {
          ...popperStyles,
        },
        popper: {
          "&[data-popper-placement*='bottom'] .HvSelect-panel": {
            borderRadius: theme.radii.large,
            top: 1,
          },
          "&[data-popper-placement*='top'] .HvSelect-panel": {
            borderRadius: theme.radii.large,
            top: -1,
          },
        },
      },
    },
    HvSuggestions: {
      classes: {
        list: {
          ...popperStyles,
        },
      },
    },
    HvTagsInput: {
      classes: {
        tagsList: {
          backgroundColor: inputColors.bg,
          padding: theme.space.xxs,
          borderColor: theme.colors.textDimmed,
        },
        singleLine: {
          height: 32,
        },
        disabled: {
          "& .HvTagsInput-tagsList": {
            backgroundColor: theme.colors.bgDisabled,
            "&,:hover": {
              borderColor: theme.colors.textDisabled,
            },
          },
          "& .HvTagsInput-chipRoot": {
            outlineColor: theme.colors.textDisabled,
          },
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
        xs: { fontSize: 16, padding: 0 },
        sm: { fontSize: 20, padding: 2 },
        md: { fontSize: 26, padding: 3 },
        lg: { fontSize: 36, padding: 6 },
        xl: { fontSize: 48, padding: 5 },
      },
    },
    HvInlineEditor: {
      classes: {
        button: {
          borderRadius: 2,
          "&:focus": {
            borderColor: theme.colors.text,
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
      radius: "full",
      classes: {
        root: {
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
    HvDialog: {
      classes: {
        paper: {
          borderRadius: theme.radii.large,
        },
        statusBar: {
          border: "none",
          borderTopLeftRadius: theme.radii.large,
          borderTopRightRadius: theme.radii.large,
        },
      },
    },
    HvDialogActions: {
      classes: {
        root: {
          borderTop: "none",
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
          borderBottom: `1px solid ${theme.colors.borderSubtle}`,
          boxShadow: "none",
        },
      },
    },
    HvHeaderBrand: {
      classes: {
        separator: {
          backgroundColor: theme.colors.border,
          margin: theme.spacing(0, "md"),
          height: 32,
        },
      },
    },
    HvHeaderMenuBarBar: {
      classes: {
        active: {
          boxShadow: "none",
          borderBottom: `1px solid ${theme.colors.borderSubtle}`,
        },
        list: {
          "& li:hover > .HvHeader-MenuBar-hidden": {
            boxShadow: "none",
            borderBottom: `1px solid ${theme.colors.borderSubtle}`,
          },
          "& li:focus-within > .HvHeader-MenuBar-hidden": {
            boxShadow: "none",
            borderBottom: `1px solid ${theme.colors.borderSubtle}`,
          },
        },
      },
    },
    HvVerticalNavigation: {
      classes: {
        root: {
          width: 280,
          color: theme.colors.textLight,
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
          borderRadius: theme.radii.round,
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
          borderRadius: theme.radii.round,
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
          background: blue[800],
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
          borderRadius: theme.radii.round,
          ".HvVerticalNavigationTreeViewItem-selected>&": {
            background: blue[800],
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
            outlineColor: theme.colors.primarySubtle,
            backgroundColor: theme.colors.bgHover,
          },
        },
        selected: {
          "&,&:hover,&:focus": {
            outlineColor: theme.colors.primary,
          },
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
        },
        subheader: {
          color: theme.colors.textSubtle,
        },
        action: {
          alignSelf: "center",
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
      name: "Pentaho",
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
        inputExtension: {
          backgroundColor: "transparent",
          height: 0,
          boxShadow: "none",
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
          "&[data-popper-placement*='top'],&[data-popper-placement*='bottom']":
            {
              ...popperStyles,
            },
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
});
