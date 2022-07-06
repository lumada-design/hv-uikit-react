const styles = (theme) => ({
  root: {
    padding: theme.hvSpacing("sm"),
    margin: 0,
    "&:not(.fullscreen)": {
      flex: 1,
    },
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
