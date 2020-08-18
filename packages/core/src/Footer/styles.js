const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: theme.spacing(0, "sm"),
    height: 40,
    bottom: 0,
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.atmo1,
    boxShadow: `0 -1px 0 ${theme.palette.atmo4}`,
    [theme.breakpoints.down("sm")]: {
      height: "unset",
      flexDirection: "column",
      padding: theme.spacing("sm")
    }
  },
  name: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing("xs")
    }
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
      marginLeft: "unset"
    }
  },
  copyright: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      marginBottom: theme.spacing("xs")
    }
  },
  separator: {
    width: 1,
    height: 16,
    backgroundColor: theme.palette.acce1,
    margin: theme.spacing(0, "xs"),
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  links: {}
});

export default styles;
