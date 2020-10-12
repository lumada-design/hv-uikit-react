const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: theme.hvSpacing(0, "sm"),
    height: 40,
    bottom: 0,
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.atmo1,
    boxShadow: `0 -1px 0 ${theme.palette.atmo5}`,
    [theme.breakpoints.only("xs")]: {
      height: "unset",
      flexDirection: "column",
      padding: theme.hvSpacing("sm"),
    },
  },
  name: {
    [theme.breakpoints.only("xs")]: {
      marginBottom: theme.hvSpacing("xs"),
    },
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "auto",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      textAlign: "center",
      marginLeft: "unset",
    },
  },
  copyright: {
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      marginBottom: theme.hvSpacing("xs"),
    },
  },
  separator: {
    width: 1,
    height: 16,
    backgroundColor: theme.palette.acce1,
    margin: theme.hvSpacing(0, "xs"),
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  links: {},
});

export default styles;
