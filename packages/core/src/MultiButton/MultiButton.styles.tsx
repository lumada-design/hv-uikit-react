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
          borderRight: `solid 1px ${theme.colors.atmo4}`,
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
            borderRight: `solid 1px ${theme.colors.atmo4}`,
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
  splitGroup: {
    background: theme.colors.atmo1,
    "& button$button": {
      "&:disabled": {
        borderTop: "none",
        borderBottom: "none",
        "&:hover": {
          borderTop: "none",
          borderBottom: "none",
        },
      },
      "&$firstButton": {
        "&:not($selected):disabled": {
          borderLeft: "none",
          "&:hover": {
            borderLeft: "none",
          },
        },
      },
      "&$lastButton": {
        "&:not($selected):disabled": {
          borderRight: "none",
          "&:hover": {
            borderRight: "none",
          },
        },
      },
      "&:not($firstButton)": {
        marginLeft: 0,
      },
    },
    // dropdown menu styles
    "& $button": {
      [`& .${dropDownMenuClasses.icon}`]: {
        "&:disabled": {
          borderTop: "none",
          borderBottom: "none",
          "&:hover": {
            borderTop: "none",
            borderBottom: "none",
          },
        },
      },
      "&$firstButton": {
        [`& .${dropDownMenuClasses.icon}`]: {
          "&:disabled": {
            borderLeft: "none",
            "&:hover": {
              borderLeft: "none",
            },
          },
        },
      },
      "&$lastButton": {
        [`& .${dropDownMenuClasses.icon}`]: {
          "&:disabled": {
            borderRight: "none",
            "&:hover": {
              borderRight: "none",
            },
          },
        },
      },
      "&:not($firstButton) > button": {
        marginLeft: 0,
      },
    },
    "&$secondarySubtle": {
      "& button$button": {
        borderTop: `solid 1px ${theme.colors.secondary}`,
        borderBottom: `solid 1px ${theme.colors.secondary}`,
        "&$firstButton": {
          borderLeft: `solid 1px ${theme.colors.secondary}`,
        },
        "&$lastButton": {
          borderRight: `solid 1px ${theme.colors.secondary}`,
        },
        "&:not($selected):disabled": {
          borderTop: "none",
          borderBottom: "none",
          "&:hover": {
            borderTop: "none",
            borderBottom: "none",
          },
          "&$firstButton": {
            "&:not($selected):disabled": {
              borderLeft: "none",
              "&:hover": {
                borderLeft: "none",
              },
            },
          },
          "&$lastButton": {
            "&:not($selected):disabled": {
              borderRight: "none",
              "&:hover": {
                borderRight: "none",
              },
            },
          },
        },
      },
      "& $button": {
        [`& .${dropDownMenuClasses.icon}`]: {
          borderTop: `solid 1px ${theme.colors.secondary}`,
          borderBottom: `solid 1px ${theme.colors.secondary}`,
          "&:disabled": {
            borderTop: "none",
            borderBottom: "none",
            "&:hover": {
              borderTop: "none",
              borderBottom: "none",
            },
          },
        },
        "&$firstButton": {
          [`& .${dropDownMenuClasses.icon}`]: {
            borderLeft: `solid 1px ${theme.colors.secondary}`,
            "&:disabled": {
              borderLeft: "none",
              "&:hover": {
                borderLeft: "none",
              },
            },
          },
        },
        "&$lastButton": {
          [`& .${dropDownMenuClasses.icon}`]: {
            borderRight: `solid 1px ${theme.colors.secondary}`,
            "&$lastButton": {
              [`& .${dropDownMenuClasses.icon}`]: {
                "&:disabled": {
                  borderRight: "none",
                  "&:hover": {
                    borderRight: "none",
                  },
                },
              },
            },
          },
        },
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
          borderBottom: `solid 1px ${theme.colors.atmo4}`,
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
  split: {
    width: 1,
    height: "100%",
    background: "currentColor",
  },
  splitContainer: {
    marginLeft: 0,
    width: 1,
    height: "100%",
    paddingTop: 4,
    paddingBottom: 4,
    color: theme.colors.secondary,
    borderTop: `1px solid ${theme.colors.atmo4}`,
    borderBottom: `1px solid ${theme.colors.atmo4}`,
    "&$primary": {
      color: theme.colors.atmo1,
      backgroundColor: theme.colors.primary,
      borderTop: `1px solid ${theme.colors.primary}`,
      borderBottom: `1px solid ${theme.colors.primary}`,
    },
    "&$primarySubtle": {
      color: theme.colors.primary,
      borderTop: `1px solid ${theme.colors.primary}`,
      borderBottom: `1px solid ${theme.colors.primary}`,
    },
    "&$primaryGhost": {
      color: theme.colors.primary,
      borderTop: `1px solid ${theme.colors.primary}`,
      borderBottom: `1px solid ${theme.colors.primary}`,
    },
    "&$secondarySubtle": {
      color: theme.colors.secondary,
      borderTop: `1px solid ${theme.colors.secondary}`,
      borderBottom: `1px solid ${theme.colors.secondary}`,
    },
    "&$secondaryGhost": {
      color: theme.colors.secondary,
      borderTop: `1px solid ${theme.colors.secondary}`,
      borderBottom: `1px solid ${theme.colors.secondary}`,
    },
    "&$splitDisabled": {
      background: theme.colors.atmo3,
      color: theme.colors.secondary_60,
      borderTop: "none",
      borderBottom: "none",
    },
  },
  splitDisabled: {},
});
