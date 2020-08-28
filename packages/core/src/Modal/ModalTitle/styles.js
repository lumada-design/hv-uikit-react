const styles = theme => ({
  root: {
    padding: theme.spacing("sm"),
    margin: 0,
    display: "flex",
    justifyContent: "space-between"
  },
  messageContainer: {
    display: "flex",
    alignItems: "center"
  },
  textWithIcon: {
    marginLeft: theme.spacing("xs")
  },
  icon: {
    marginRight: `${theme.hv.spacing.md}px`,
    width: 48,
    height: 48
  }
});

export default styles;
