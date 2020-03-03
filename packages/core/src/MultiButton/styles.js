const styles = theme => ({
  root: {
    display: "flex",
    height: 32,
    alignItems: "center",
    transition: "none",
    boxShadow: `-1px 1px 0px 0px ${theme.hv.palette.atmosphere.atmo6}, 1px 1px 0px 0px ${theme.hv.palette.atmosphere.atmo6}, -1px -1px 0px 0px ${theme.hv.palette.atmosphere.atmo6}, 1px -1px 0px 0px ${theme.hv.palette.atmosphere.atmo6}`
  },
  button: {
    width: "100%",
    minWidth: 32,
    maxWidth: 200,
    padding: 0,
    border: "none",
    transition: "none",
    flex: "1 0 0px",
    "&:hover": {
      border: "none !important"
    },
    "&:focus": {
      zIndex: 1
    },
    "&:active": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`
    }
  },
  labelText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  isSelected: {
    zIndex: 1,
    background: theme.hv.palette.atmosphere.atmo1,
    height: 34,
    cursor: "default",
    ...theme.hv.typography.highlightText,
    boxShadow: `1px -1px 0px 0px ${theme.hv.palette.accent.acce1}, 1px 0px 0px 0px ${theme.hv.palette.accent.acce1}, 0px 0px 0px 1px ${theme.hv.palette.accent.acce1}, 0px 0px 0px 0px ${theme.hv.palette.accent.acce1}`
  },
  isUnselected: {
    minWidth: "32px !important",
    background: theme.hv.palette.atmosphere.atmo2,
    ...theme.hv.typography.normalText,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo4
    }
  },
  icon: {
    width: "unset",
    height: "unset",
    marginRight: 8
  },
  // vertical button display Styling
  vertical: {
    flexDirection: "column",
    height: "auto",
    btnSecondary: {
      flex: "1 1 20px"
    },
    "& $btnBase": {
      width: "100%"
    },
    "& $isSelected": {
      height: 32,
      width: `calc(100% + 2px) !important`
    }
  }
});

export default styles;
