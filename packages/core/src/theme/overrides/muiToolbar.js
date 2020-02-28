const muiToolbar = theme => ({
  root: {
    alignItems: "center",
    "@media (min-width: 600px)": {
      minHeight: "46px"
    }
  },
  gutters: {
    paddingLeft: `${theme.spacing.sm}px`,
    paddingRight: `${theme.spacing.sm}px`,
    "@media (min-width:600px)": {
      paddingLeft: `${theme.spacing.sm}px`,
      paddingRight: `${theme.spacing.sm}px`
    }
  },
  dense: {
    minHeight: "46px"
  }
});

export default muiToolbar;
