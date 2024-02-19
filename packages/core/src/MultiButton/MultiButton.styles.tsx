import { theme } from "@hitachivantara/uikit-styles";

import { dropDownMenuClasses } from "../DropDownMenu";

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
      "&$firstButton": {
        borderLeft: `solid 1px ${theme.colors.atmo4}`,
        borderTopLeftRadius: theme.radii.base,
        borderBottomLeftRadius: theme.radii.base,
        "&:disabled": {
          borderLeft: `solid 1px ${theme.colors.atmo4}`,
        },
      },
      "&$lastButton": {
        borderRight: `solid 1px ${theme.colors.atmo4}`,
        borderTopRightRadius: theme.radii.base,
        borderBottomRightRadius: theme.radii.base,
        "&:disabled": {
          borderRight: `solid 1px ${theme.colors.atmo4}`,
        },
        "&:disabled:hover": {
          borderRight: `solid 1px ${theme.colors.atmo4} !important`,
        },
      },
      "&:not($firstButton)": {
        marginLeft: "-1px",
      },
      "&$selected": {
        background: theme.colors.atmo1,
        ...theme.typography.label,
        borderRadius: theme.radii.base,
        border: `solid 1px ${theme.colors.secondary}`,
        zIndex: 2,
        "&:hover": {
          background: theme.colors.atmo3,
          "&:not(:disabled)": {
            border: `solid 1px ${theme.colors.secondary}`,
          },
          "&:disabled": {
            border: `solid 1px ${theme.colors.atmo4}`,
          },
        },
        // prevent the focus ring to be hidden by sibling hover background
        // even when selected
        "&.HvIsFocusVisible": {
          zIndex: 5,
        },
        "&:disabled": {
          zIndex: 1,
          color: theme.colors.secondary_60,
          background: theme.colors.atmo1,
          border: `solid 1px ${theme.colors.secondary}`,
        },
      },
    },
    // dropdown menu styles
    "& $button": {
      [`& .${dropDownMenuClasses.icon}`]: {
        borderTop: `solid 1px ${theme.colors.atmo4}`,
        borderBottom: `solid 1px ${theme.colors.atmo4}`,
        borderLeft: "solid 1px transparent",
        borderRight: "solid 1px transparent",
        borderRadius: 0,
        "&:disabled": {
          borderTop: `solid 1px ${theme.colors.atmo4}`,
          borderBottom: `solid 1px ${theme.colors.atmo4}`,
          "&:hover": {
            borderTop: `solid 1px ${theme.colors.atmo4}`,
            borderBottom: `solid 1px ${theme.colors.atmo4}`,
            borderLeft: "solid 1px transparent",
            borderRight: "solid 1px transparent",
          },
        },
      },
      [`& .${dropDownMenuClasses.iconSelected}`]: {
        border: `solid 1px ${theme.colors.secondary}`,
      },
      "&$firstButton": {
        [`& .${dropDownMenuClasses.icon}`]: {
          borderLeft: `solid 1px ${theme.colors.atmo4}`,
          borderTopLeftRadius: theme.radii.base,
          borderBottomLeftRadius: theme.radii.base,
          "&:disabled": {
            borderLeft: `solid 1px ${theme.colors.atmo4}`,
          },
        },
        [`& .${dropDownMenuClasses.iconSelected}`]: {
          border: `solid 1px ${theme.colors.secondary}`,
        },
      },
      "&$lastButton": {
        [`& .${dropDownMenuClasses.icon}`]: {
          borderRight: `solid 1px ${theme.colors.atmo4}`,
          borderTopRightRadius: theme.radii.base,
          borderBottomRightRadius: theme.radii.base,
          "&:disabled": {
            borderRight: `solid 1px ${theme.colors.atmo4}`,
          },
          "&:disabled:hover": {
            borderRight: `solid 1px ${theme.colors.atmo4} !important`,
          },
        },
        [`& .${dropDownMenuClasses.iconSelected}`]: {
          border: `solid 1px ${theme.colors.secondary}`,
        },
      },
      "&:not($firstButton) > button": {
        marginLeft: "-1px",
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
      "&$firstButton": {
        borderTop: `solid 1px ${theme.colors.atmo4}`,
        borderTopLeftRadius: theme.radii.base,
        borderTopRightRadius: theme.radii.base,
      },
      "&$lastButton": {
        borderBottom: `solid 1px ${theme.colors.atmo4}`,
        borderBottomLeftRadius: theme.radii.base,
        borderBottomRightRadius: theme.radii.base,
        "&:disabled:hover": {
          borderBottom: `solid 1px ${theme.colors.atmo4} !important`,
        },
      },
      "&:not($firstButton)": {
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
  primary: {
    "& button$button": {
      borderTop: "none",
      borderBottom: "none",

      "&$firstButton": {
        borderLeft: "none",
      },
      "&$lastButton": {
        borderRight: "none",
      },
      "&$selected": {
        border: `solid 1px ${theme.colors.secondary}`,
      },
    },

    // dropdown menu styles
    "& $button": {
      [`& .${dropDownMenuClasses.icon}`]: {
        borderTop: "none",
        borderBottom: "none",
      },
      "&$firstButton": {
        [`& .${dropDownMenuClasses.icon}`]: {
          borderLeft: "none",
        },
        [`& .${dropDownMenuClasses.iconSelected}`]: {
          border: `solid 1px ${theme.colors.secondary}`,
        },
      },
      "&$lastButton": {
        [`& .${dropDownMenuClasses.icon}`]: {
          borderRight: "none",
        },
        [`& .${dropDownMenuClasses.iconSelected}`]: {
          border: `solid 1px ${theme.colors.secondary}`,
        },
      },
    },
  },
  primarySubtle: {
    "& button$button": {
      borderTop: `solid 1px ${theme.colors.primary}`,
      borderBottom: `solid 1px ${theme.colors.primary}`,
      "&$firstButton": {
        borderLeft: `solid 1px ${theme.colors.primary}`,
      },
      "&$lastButton": {
        borderRight: `solid 1px ${theme.colors.primary}`,
      },
    },
    // dropdown menu styles
    "& $button": {
      [`& .${dropDownMenuClasses.icon}`]: {
        borderTop: `solid 1px ${theme.colors.primary}`,
        borderBottom: `solid 1px ${theme.colors.primary}`,
      },
      "&$firstButton": {
        [`& .${dropDownMenuClasses.icon}`]: {
          borderLeft: `solid 1px ${theme.colors.primary}`,
        },
        [`& .${dropDownMenuClasses.iconSelected}`]: {
          border: `solid 1px ${theme.colors.secondary}`,
        },
      },
      "&$lastButton": {
        [`& .${dropDownMenuClasses.icon}`]: {
          borderRight: `solid 1px ${theme.colors.primary}`,
        },
        [`& .${dropDownMenuClasses.iconSelected}`]: {
          border: `solid 1px ${theme.colors.secondary}`,
        },
      },
    },
  },
  primaryGhost: {},
  secondary: {},
  secondarySubtle: {},
  secondaryGhost: {},
  firstButton: {},
  lastButton: {},
});
