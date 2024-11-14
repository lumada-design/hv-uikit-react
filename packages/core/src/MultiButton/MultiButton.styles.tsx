import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { dropDownMenuClasses } from "../DropDownMenu";

export const { staticClasses, useClasses } = createClasses("HvMultiButton", {
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  multiple: {
    backgroundColor: theme.colors.atmo2,

    borderWidth: 0,
    borderColor: `${theme.colors.atmo4} transparent`,
    borderRadius: theme.radii.base,

    "& $button": {
      minWidth: 32,
      width: "100%",
      maxWidth: 200,
      padding: 0,
      flex: "1 1 auto",
      borderColor: "inherit",
      borderRadius: 0,
      fontWeight: theme.typography.body.fontWeight,
      "&:disabled": {
        color: theme.colors.secondary_60,
        borderColor: "inherit",
      },
      "&:hover": {
        borderColor: "inherit",
      },
      "&$firstButton": {
        borderLeftColor: theme.colors.atmo4,
        borderTopLeftRadius: "inherit",
        borderBottomLeftRadius: "inherit",
        "&:disabled": {
          borderLeftColor: theme.colors.atmo4,
        },
      },
      "&$lastButton": {
        borderRightColor: theme.colors.atmo4,
        borderTopRightRadius: "inherit",
        borderBottomRightRadius: "inherit",
        "&:disabled": {
          borderRightColor: theme.colors.atmo4,
        },
      },
      "&:not($firstButton)": {
        marginLeft: "-1px",
      },
      "&$selected": {
        backgroundColor: theme.colors.atmo1,
        fontWeight: theme.typography.label.fontWeight,
        borderRadius: "inherit",
        borderColor: theme.colors.secondary,
        zIndex: 2,
        "&:hover:not(:disabled),&:focus-visible": {
          backgroundColor: theme.colors.containerBackgroundHover,
        },
        "&:disabled": {
          zIndex: 1,
          borderColor: theme.colors.atmo4,
        },
      },
    },
  },
  splitGroup: {
    width: "fit-content",

    "& $button:not($firstButton)": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      "&:not([aria-controls])": {
        borderLeftWidth: 0,
      },
    },
    "& $button:not($lastButton)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      "&:not([aria-controls])": {
        borderRightWidth: 0,
      },

      "&::after": {
        content: "''",
        position: "absolute",
        inset: "4px -1px 4px auto",
        width: 1,
        zIndex: 1,
        height: "auto",
        backgroundColor: "currentcolor",
      },
    },
  },
  splitGroupDisabled: {},
  button: {
    position: "relative",
    // prevent the focus ring to be hidden by sibling hover background
    [`&:focus-visible, &.${dropDownMenuClasses.iconSelected}`]: {
      zIndex: 5,
    },
  },
  selected: {},
  vertical: {
    flexDirection: "column",
    height: "auto",
    borderColor: `transparent ${theme.colors.atmo4}`,
    "& $button": {
      minWidth: 32,
      width: "100%",
      "&$firstButton": {
        borderTopColor: theme.colors.atmo4,
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: "inherit",
      },
      "&$lastButton": {
        borderBottomColor: theme.colors.atmo4,
        borderBottomLeftRadius: "inherit",
        borderBottomRightRadius: "inherit",
      },
      "&:not($firstButton)": {
        marginLeft: 0,
        marginTop: -1,
      },
      "&$selected": {
        height: 32,
        width: "calc(100% + 2px)",
        borderColor: theme.colors.secondary,
      },
    },
  },

  // TODO - review the need for these classes in v6 (use :first-child and :last-child instead)
  firstButton: {},
  lastButton: {},

  // TODO - review the need for these classes in v6
  primary: {},
  primarySubtle: {},
  primaryGhost: {},
  secondary: {},
  secondarySubtle: {},
  secondaryGhost: {},
});
