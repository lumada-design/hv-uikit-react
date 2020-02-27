const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  },
  containerMessageOnly: {
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "row"
    },
    "& $textContainer": {
      marginLeft: 0
    }
  },
  iconContainer: {},
  textContainer: {
    background: "transparent",
    maxWidth: "510px",
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      marginLeft: `${theme.hv.spacing.sm}px`
    }
  },
  titleContainer: {
    marginTop: `${theme.hv.spacing.xs}px`,
    marginBottom: `${theme.hv.spacing.xs}px`,
    [theme.breakpoints.only("xs")]: {
      marginTop: `${theme.hv.spacing.sm}px`
    }
  },
  messageContainer: {},
  actionContainer: {
    marginTop: `${theme.hv.spacing.md}px`,
    "& a": {
      ...theme.hv.typography.inlineLink,
      textDecoration: "none"
    }
  }
});

export default styles;
