const styles = (theme) => ({
  root: {
    display: "flex",
    height: 32,
    alignItems: "center",
    transition: "none",
    background: theme.hv.palette.atmosphere.atmo2,
    position: "relative",
    zIndex: 0,

    // prevent the focus ring to be hidden by sibling hover background
    "&>.HvIsFocusVisible": {
      zIndex: 5,
    },

    "& button$button": {
      height: 32,
      width: "100%",
      minWidth: 32,
      maxWidth: 200,
      padding: 0,
      transition: "none",
      flex: "1 0 0px",
      borderTop: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
      borderBottom: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
      borderLeft: "solid 1px transparent",
      borderRight: "solid 1px transparent",
      borderRadius: 0,
      ...theme.hv.typography.normalText,
      "&:active": {
        backgroundColor: `${theme.hv.palette.atmosphere.atmo3}`,
      },
      "&:disabled": {
        color: theme.hv.palette.atmosphere.atmo5,
        borderTop: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        borderBottom: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        "&:hover": {
          borderTop: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
          borderBottom: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
          borderLeft: "solid 1px transparent",
          borderRight: "solid 1px transparent",
        },
      },
      "&:first-child": {
        borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        borderTopLeftRadius: "2px",
        borderBottomLeftRadius: "2px",
      },
      "&:last-child": {
        borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        borderTopRightRadius: "2px",
        borderBottomRightRadius: "2px",
        "&:disabled:hover": {
          borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4} !important`,
        },
      },
      "&:not(:first-child)": {
        marginLeft: "-1px",
      },
      "&$selected": {
        "&:hover": {
          "&:not(:disabled)": {
            border: `solid 1px ${theme.hv.palette.accent.acce1}`,
          },
          "&:disabled": {
            border: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
          },
        },
        "&:disabled": {
          zIndex: 1,
          color: theme.hv.palette.atmosphere.atmo5,
          background: theme.hv.palette.atmosphere.atmo1,
          border: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        },
      },
    },
    "& button$button$selected": {
      background: theme.hv.palette.atmosphere.atmo1,
      height: 34,
      ...theme.hv.typography.highlightText,
      borderRadius: "2px",
      border: `solid 1px ${theme.hv.palette.accent.acce1}`,
      zIndex: 2,
      "&:hover": {
        background: theme.hv.palette.atmosphere.atmo3,
      },
      "&:first-child, &:last-child": {
        border: `solid 1px ${theme.hv.palette.accent.acce1}`,
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
      borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
      borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
      borderTop: "solid 1px transparent",
      borderBottom: "solid 1px transparent",
      "&:disabled": {
        color: theme.hv.palette.atmosphere.atmo5,
        borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        borderTop: "solid 1px transparent",
        borderBottom: "solid 1px transparent",
        "&:hover": {
          borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
          borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
          borderTop: "solid 1px transparent",
          borderBottom: "solid 1px transparent",
        },
      },
      "&:first-child": {
        borderTop: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        borderTopLeftRadius: "2px",
        borderTopRightRadius: "2px",
      },
      "&:last-child": {
        borderBottom: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        borderBottomLeftRadius: "2px",
        borderBottomRightRadius: "2px",
        "&:disabled:hover": {
          borderBottom: `solid 1px ${theme.hv.palette.atmosphere.atmo4} !important`,
        },
      },
      "&:not(:first-child)": {
        marginLeft: 0,
        marginTop: -1,
      },
      "&$selected": {
        height: 32,
        width: `calc(100% + 2px) !important`,
        background: theme.hv.palette.atmosphere.atmo1,
        ...theme.hv.typography.highlightText,
        borderRadius: "2px",
        border: `solid 1px ${theme.hv.palette.accent.acce1}`,
        zIndex: 2,
        "&:hover, &:focus": {
          background: theme.hv.palette.atmosphere.atmo3,
        },
        "&:disabled": {
          zIndex: 1,
          color: theme.hv.palette.atmosphere.atmo5,
          background: theme.hv.palette.atmosphere.atmo1,
          border: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
        },
      },
    },
  },
});

export default styles;
