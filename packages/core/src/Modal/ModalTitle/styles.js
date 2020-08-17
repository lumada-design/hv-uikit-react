const styles = theme => ({
  root: {
    padding: `${theme.hv.spacing.sm}px 0 0 ${theme.hv.spacing.sm}px`,
    margin: 0
  },
  messageContainer: {
    display: "flex",
    alignItems: "center"
  },
  textWithIcon: {
    marginLeft: 20
  },
  icon: {
    marginRight: `${theme.hv.spacing.md}px`,
    width: 48,
    height: 48
  }
});

export default styles;
