import { chipClasses } from "@mui/material/Chip";
import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvTag", {
  root: {
    color: theme.colors.base_dark,

    [`& .${chipClasses.avatar}`]: {
      width: 12,
      height: 12,
      marginLeft: 2,
      marginRight: 0,
    },
  },

  chipRoot: {
    [`&.${chipClasses.root}`]: {
      height: 16,
      borderRadius: 0,
      maxWidth: 180,
      fontFamily: theme.fontFamily.body,
      "&:focus-visible": {
        backgroundColor: theme.alpha("base_light", 0.3),
      },

      "&$categorical": {
        borderRadius: 8,
        "& $label": {
          color: theme.colors.secondary,
        },
      },
    },

    "&$disabled": {
      opacity: 1,
      backgroundColor: theme.colors.atmo3,
      "& $label": {
        color: theme.colors.secondary_60,
      },
    },

    [`& .${chipClasses.label}`]: {
      paddingLeft: 4,
      paddingRight: 4,
      ...(theme.typography.caption2 as React.CSSProperties),
      color: "currentcolor",
    },

    [`& .${chipClasses.deleteIcon}`]: {
      margin: 0,
      width: 16,
      height: 16,
      padding: 0,
      color: "currentColor",
      "& svg .color0": {
        fill: "currentcolor",
      },
      "&:hover": {
        backgroundColor: theme.colors.containerBackgroundHover,
        color: "unset",
      },
      "&:focus": {
        ...outlineStyles,
        borderRadius: 0,
      },
      "&:focus:not(:focus-visible)": {
        outline: "0 !important",
        boxShadow: "none !important",
      },
    },
  },

  disabled: {},

  clickable: {
    cursor: "pointer",
    "&:focus-visible": {
      ...outlineStyles,
    },
  },

  categorical: {},

  label: {},

  deleteIcon: {},

  // TODO: redundant - use deleteIcon. remove in v6
  button: {},
  tagButton: {},
  // TODO: redundant - use $clickable or :not($disabled). remove in v6
  focusVisible: {},
  disabledDeleteIcon: {},
  categoricalFocus: {},
  categoricalDisabled: {},
});
