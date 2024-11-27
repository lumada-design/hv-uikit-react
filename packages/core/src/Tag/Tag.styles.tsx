import { chipClasses } from "@mui/material/Chip";
import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvTag", {
  root: {
    color: theme.colors.base_dark,
    backgroundColor: "var(--bgColor)",

    [`& .${chipClasses.avatar}`]: {
      width: 12,
      height: 12,
      marginLeft: 2,
      marginRight: 0,
    },

    [`&.${chipClasses.root}`]: {
      height: 16,
      borderRadius: 0,
      maxWidth: 180,
      fontFamily: theme.fontFamily.body,
      ":hover, :focus": {
        backgroundColor: "var(--bgColor)",
      },
      ":focus-visible": {
        ...outlineStyles,
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
      ...theme.typography.caption2,
      color: "currentcolor",
    },

    [`& .${chipClasses.deleteIcon}`]: {
      margin: 0,
      width: 16,
      height: 16,
      padding: 0,
      color: "currentColor",
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
  selected: {},
  clickable: {
    cursor: "pointer",
    "&:focus-visible": {
      ...outlineStyles,
    },
  },

  categorical: {},
  label: {},
  deleteIcon: {},

  /** @deprecated use `root` instead */
  chipRoot: {},
  /** @deprecated unused */
  // TODO: redundant - use deleteIcon. remove in v6
  /** @deprecated */
  button: {},
  /** @deprecated */
  tagButton: {},
  // TODO: redundant - use $clickable or :not($disabled). remove in v6
  /** @deprecated */
  focusVisible: {},
  /** @deprecated */
  disabledDeleteIcon: {},
  /** @deprecated */
  categoricalFocus: {},
  /** @deprecated */
  categoricalDisabled: {},
});
