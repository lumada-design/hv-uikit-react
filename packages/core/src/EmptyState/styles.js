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
      marginLeft: "16px",
      paddingLeft: "4px",
    },
    "& a": {
      ...theme.hv.typography.link,
      textDecoration: "none",
    },
  },
  titleContainer: {
    marginTop: 5,
    marginBottom: theme.spacing("xs"),
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing("sm"),
    },
  },
  messageContainer: {},
  actionContainer: {
    marginTop: theme.spacing("sm"),
  },
});

export default styles;
