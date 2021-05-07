const styles = (theme) => ({
  root: {
    padding: theme.hvSpacing("sm"),
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
  },
  messageContainer: {
    display: "flex",
    alignItems: "center",
  },
  textWithIcon: {
    marginLeft: theme.hvSpacing("xs"),
    // 32px is the icon width
    marginRight: `calc(32px + ${theme.hvSpacing("xs")})`,
  },
  icon: {
    marginRight: theme.hv.spacing.md,
    width: 48,
    height: 48,
  },
});

export default styles;
