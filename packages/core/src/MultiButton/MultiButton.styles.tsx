import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { HvButtonSize } from "../Button";
import { getColoringStyle, getSizeStyles } from "../Button/Button.styles";
import { dropDownMenuClasses } from "../DropDownMenu";

export const { staticClasses, useClasses } = createClasses("HvMultiButton", {
  root: {
    display: "flex",
    alignItems: "center",
    transition: "none",
    position: "relative",
    zIndex: 0,
  },
  multiple: {
    background: theme.colors.bgPage,

    // prevent the focus ring to be hidden by sibling hover background
    "&>.HvIsFocusVisible": {
      zIndex: 5,
    },

    "& button$button": {
      minWidth: "unset",
      width: "100%",
      maxWidth: 200,
      padding: 0,
      transition: "none",
      flex: "1 0 0px",
      borderTop: `solid 1px ${theme.colors.divider}`,
      borderBottom: `solid 1px ${theme.colors.divider}`,
      borderLeft: "solid 1px transparent",
      borderRight: "solid 1px transparent",
      borderRadius: 0,
      fontWeight: theme.typography.body.fontWeight,
      fontSize: theme.typography.body.fontSize,
      "&:disabled": {
        color: theme.colors.textDisabled,
        borderTop: `solid 1px ${theme.colors.divider}`,
        borderBottom: `solid 1px ${theme.colors.divider}`,
        "&:hover": {
          borderTop: `solid 1px ${theme.colors.divider}`,
          borderBottom: `solid 1px ${theme.colors.divider}`,
          borderLeft: "solid 1px transparent",
          borderRight: "solid 1px transparent",
        },
      },
      "&$firstButton": {
        borderLeft: `solid 1px ${theme.colors.divider}`,
        borderTopLeftRadius: theme.radii.base,
        borderBottomLeftRadius: theme.radii.base,
        "&:disabled": {
          borderLeft: `solid 1px ${theme.colors.divider}`,
        },
      },
      "&$lastButton": {
        borderRight: `solid 1px ${theme.colors.divider}`,
        borderTopRightRadius: theme.radii.base,
        borderBottomRightRadius: theme.radii.base,
        "&:disabled": {
          borderRight: `solid 1px ${theme.colors.divider}`,
        },
        "&:disabled:hover": {
          borderRight: `solid 1px ${theme.colors.divider}`,
        },
      },
      "&:not($firstButton)": {
        marginLeft: "-1px",
      },
      "&$selected": {
        background: theme.colors.bgSurface,
        ...theme.typography.label,
        borderRadius: theme.radii.base,
        border: `solid 1px ${theme.colors.text}`,
        zIndex: 2,
        "&:hover": {
          background: theme.colors.bgActive,
          "&:not(:disabled)": {
            border: `solid 1px ${theme.colors.text}`,
          },
          "&:disabled": {
            border: `solid 1px ${theme.colors.divider}`,
          },
        },
        // prevent the focus ring to be hidden by sibling hover background
        // even when selected
        "&.HvIsFocusVisible": {
          zIndex: 5,
        },
        "&:disabled": {
          zIndex: 1,
          color: theme.colors.textDisabled,
          background: theme.colors.bgSurface,
          border: `solid 1px ${theme.colors.divider}`,
        },
      },
    },
  },
  splitGroup: {
    width: "fit-content",
    background: theme.colors.bgSurface,

    // Button
    "& button$button": {
      "&$firstButton": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        "& + div$splitContainer": {
          marginLeft: -1,
        },
      },
      "&$lastButton": {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },

    // Dropdown Menu
    [`& .${dropDownMenuClasses.root}`]: {
      "&:has($firstButton)": {
        "& + div$splitContainer": {
          marginRight: -1,
        },
      },
    },
    "& $button$firstButton > button": {
      marginRight: -1.5,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    "& $button$lastButton > button": {
      marginLeft: -1.5,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    [`& .${dropDownMenuClasses.iconSelected}`]: {
      zIndex: 2,
    },
  },
  splitGroupDisabled: { background: theme.colors.bgDisabled },
  button: {},
  selected: {},
  vertical: {
    flexDirection: "column",
    height: "auto",
    "& button$button": {
      minWidth: 32,
      width: "100%",
      borderLeft: `solid 1px ${theme.colors.divider}`,
      borderRight: `solid 1px ${theme.colors.divider}`,
      borderTop: "solid 1px transparent",
      borderBottom: "solid 1px transparent",
      "&:disabled": {
        color: theme.colors.textDisabled,
        borderLeft: `solid 1px ${theme.colors.divider}`,
        borderRight: `solid 1px ${theme.colors.divider}`,
        borderTop: "solid 1px transparent",
        borderBottom: "solid 1px transparent",
        "&:hover": {
          borderLeft: `solid 1px ${theme.colors.divider}`,
          borderRight: `solid 1px ${theme.colors.divider}`,
          borderTop: "solid 1px transparent",
          borderBottom: "solid 1px transparent",
        },
      },
      "&$firstButton": {
        borderTop: `solid 1px ${theme.colors.divider}`,
        borderTopLeftRadius: theme.radii.base,
        borderTopRightRadius: theme.radii.base,
      },
      "&$lastButton": {
        borderBottom: `solid 1px ${theme.colors.divider}`,
        borderBottomLeftRadius: theme.radii.base,
        borderBottomRightRadius: theme.radii.base,
        "&:disabled:hover": {
          borderBottom: `solid 1px ${theme.colors.divider}`,
        },
      },
      "&:not($firstButton)": {
        marginLeft: 0,
        marginTop: -1,
      },
      "&$selected": {
        height: 32,
        width: `calc(100% + 2px) !important`,
        background: theme.colors.bgSurface,
        ...theme.typography.label,
        borderRadius: theme.radii.base,
        border: `solid 1px ${theme.colors.text}`,
        zIndex: 2,
        "&:hover, &:focus": {
          background: theme.colors.bgActive,
        },
        "&:disabled": {
          zIndex: 1,
          color: theme.colors.textDisabled,
          background: theme.colors.bgSurface,
          border: `solid 1px ${theme.colors.divider}`,
        },
      },
    },
  },
  split: {
    width: 1,
    height: "100%",
    background: "currentColor",
  },
  splitContainer: {
    display: "flex",
    justifyContent: "center",
    zIndex: 1,
    width: 2,
    paddingTop: 4,
    paddingBottom: 4,
    height: "calc(32px - 2px)",
  },
  splitDisabled: {
    color: theme.colors.textDisabled,
  },
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

export const getSplitContainerColor = (
  color: string,
  type?: string,
  disabled?: boolean,
) => ({
  color: getColoringStyle(color, type).color,
  backgroundColor: disabled
    ? theme.colors.bgDisabled
    : type === "subtle"
      ? theme.colors.bgSurface
      : "transparent",
});

export const getSplitContainerHeight = (size: HvButtonSize) => ({
  height: `calc(${getSizeStyles(size).height} - 2px)`,
});
