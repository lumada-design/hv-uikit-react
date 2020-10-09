const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: 10,
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      left: "50%",
      transform: "translate(-50%, 0)",
    },
  },
  separator: {
    width: 1,
    height: theme.hv.spacing.sm,
    margin: theme.hvSpacing(0, "xs"),
    backgroundColor: theme.hv.palette.accent.acce1,
  },
});

export default styles;
