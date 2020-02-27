const styles = theme => ({
  root: {
    padding: `${theme.hv.spacing.sm}px 0 0 ${theme.hv.spacing.sm}px`,
    margin: 0
  },
  messageContainer: {
    display: "flex",
    alignItems: "center"
  },
  textWithIcon: {},
  icon: {
    marginRight: `${theme.hv.spacing.xs}px`,
    width: 48,
    height: 48
  }
});

export default styles;
