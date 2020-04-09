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
    },
    "& a": {
      ...theme.hv.typography.inlineLink,
      textDecoration: "none"
    }
  },
  titleContainer: {
    margin: "5px 0",
    [theme.breakpoints.only("xs")]: {
      marginTop: `${theme.hv.spacing.sm}px`
    }
  },
  messageContainer: {},
  actionContainer: {
    marginTop: `${theme.hv.spacing.sm}px`
  }
});

export default styles;
