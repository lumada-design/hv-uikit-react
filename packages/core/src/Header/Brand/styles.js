const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  separator: {
    width: 1,
    height: theme.hv.spacing.sm,
    margin: theme.hvSpacing(0, "xs"),
    backgroundColor: theme.hv.palette.accent.acce1,
  },
});

export default styles;
