import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvMultiButton", {
  root: {
    display: "flex",
    alignItems: "center",
    transition: "none",
    background: theme.colors.atmo2,
    position: "relative",
    zIndex: 0,

    // prevent the focus ring to be hidden by sibling hover background
    "&>.HvIsFocusVisible": {
      zIndex: 5,
    },

    "& button$button": {
      width: "100%",
      minWidth: 32,
      maxWidth: 200,
      padding: 0,
      transition: "none",
      flex: "1 0 0px",
      borderTop: `solid 1px ${theme.colors.atmo4}`,
      borderBottom: `solid 1px ${theme.colors.atmo4}`,
      borderLeft: "solid 1px transparent",
      borderRight: "solid 1px transparent",
      borderRadius: 0,
      fontWeight: theme.typography.body.fontWeight,
      fontSize: theme.typography.body.fontSize,
      "&:active": {
        backgroundColor: `${theme.colors.atmo3}`,
      },
      "&:disabled": {
        color: theme.colors.secondary_60,
        borderTop: `solid 1px ${theme.colors.atmo4}`,
        borderBottom: `solid 1px ${theme.colors.atmo4}`,
        "&:hover": {
          borderTop: `solid 1px ${theme.colors.atmo4}`,
          borderBottom: `solid 1px ${theme.colors.atmo4}`,
          borderLeft: "solid 1px transparent",
          borderRight: "solid 1px transparent",
        },
      },
      "&:first-of-type": {
        borderLeft: `solid 1px ${theme.colors.atmo4}`,
        borderTopLeftRadius: theme.radii.base,
        borderBottomLeftRadius: theme.radii.base,
      },
      "&:last-of-type": {
        borderRight: `solid 1px ${theme.colors.atmo4}`,
        borderTopRightRadius: theme.radii.base,
        borderBottomRightRadius: theme.radii.base,
        "&:disabled:hover": {
          borderRight: `solid 1px ${theme.colors.atmo4} !important`,
        },
      },
      "&:not(:first-of-type)": {
        marginLeft: "-1px",
      },
      "&$selected": {
        "&:hover": {
          "&:not(:disabled)": {
            border: `solid 1px ${theme.colors.secondary}`,
          },
          "&:disabled": {
            border: `solid 1px ${theme.colors.atmo4}`,
          },
        },
        "&:disabled": {
          zIndex: 1,
          color: theme.colors.secondary_60,
          background: theme.colors.atmo1,
          border: `solid 1px ${theme.colors.atmo4}`,
        },
      },
    },
    "& button$button$selected": {
      background: theme.colors.atmo1,
      ...theme.typography.label,
      borderRadius: theme.radii.base,
      border: `solid 1px ${theme.colors.secondary}`,
      zIndex: 2,
      "&:hover": {
        background: theme.colors.atmo3,
      },
      "&:first-of-type, &:last-of-type": {
        border: `solid 1px ${theme.colors.secondary}`,
      },

      // prevent the focus ring to be hidden by sibling hover background
      // even when selected
      "&.HvIsFocusVisible": {
        zIndex: 5,
      },
    },
  },
  button: {},
  selected: {},
  // vertical button display Styling
  vertical: {
    flexDirection: "column",
    height: "auto",
    btnSecondary: {
      flex: "1 1 20px",
    },
    "& button$button": {
      width: "100%",
      borderLeft: `solid 1px ${theme.colors.atmo4}`,
      borderRight: `solid 1px ${theme.colors.atmo4}`,
      borderTop: "solid 1px transparent",
      borderBottom: "solid 1px transparent",
      "&:disabled": {
        color: theme.colors.secondary_60,
        borderLeft: `solid 1px ${theme.colors.atmo4}`,
        borderRight: `solid 1px ${theme.colors.atmo4}`,
        borderTop: "solid 1px transparent",
        borderBottom: "solid 1px transparent",
        "&:hover": {
          borderLeft: `solid 1px ${theme.colors.atmo4}`,
          borderRight: `solid 1px ${theme.colors.atmo4}`,
          borderTop: "solid 1px transparent",
          borderBottom: "solid 1px transparent",
        },
      },
      "&:first-of-type": {
        borderTop: `solid 1px ${theme.colors.atmo4}`,
        borderTopLeftRadius: theme.radii.base,
        borderTopRightRadius: theme.radii.base,
      },
      "&:last-of-type": {
        borderBottom: `solid 1px ${theme.colors.atmo4}`,
        borderBottomLeftRadius: theme.radii.base,
        borderBottomRightRadius: theme.radii.base,
        "&:disabled:hover": {
          borderBottom: `solid 1px ${theme.colors.atmo4} !important`,
        },
      },
      "&:not(:first-of-type)": {
        marginLeft: 0,
        marginTop: -1,
      },
      "&$selected": {
        height: 32,
        width: `calc(100% + 2px) !important`,
        background: theme.colors.atmo1,
        ...theme.typography.label,
        borderRadius: theme.radii.base,
        border: `solid 1px ${theme.colors.secondary}`,
        zIndex: 2,
        "&:hover, &:focus": {
          background: theme.colors.atmo3,
        },
        "&:disabled": {
          zIndex: 1,
          color: theme.colors.secondary_60,
          background: theme.colors.atmo1,
          border: `solid 1px ${theme.colors.atmo4}`,
        },
      },
    },
  },
});
