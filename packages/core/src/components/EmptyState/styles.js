const styles = (theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  },
  containerMessageOnly: {
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "row",
    },
    "& $textContainer": {
      marginLeft: 0,
    },
  },
  iconContainer: {},
  textContainer: {
    background: "transparent",
    maxWidth: "510px",
    overflow: "hidden",
    fontFamily: theme.hv.typography.fontFamily,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.hvSpacing("xs"),
    },
    "& a": {
      ...theme.hv.typography.link,
      textDecoration: "none",
    },
  },
  titleContainer: {
    marginTop: 2,
    marginBottom: theme.hv.spacing.sm,
  },
  messageContainer: {},
  actionContainer: {
    marginTop: theme.hvSpacing("sm"),
  },
});

export default styles;
