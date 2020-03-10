const muiToolbar = theme => ({
  root: {
    alignItems: "center",
    "@media (min-width: 600px)": {
      minHeight: "46px"
    }
  },
  gutters: {
    paddingLeft: theme.spacing("sm"),
    paddingRight: theme.spacing("sm"),
    "@media (min-width:600px)": {
      paddingLeft: theme.spacing("sm"),
      paddingRight: theme.spacing("sm")
    }
  },
  dense: {
    minHeight: "46px"
  }
});

export default muiToolbar;
