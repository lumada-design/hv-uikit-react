const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      left: "50%",
      transform: "translate(-50%, 0)"
    }
  },
  separator: {
    width: 1,
    height: `${theme.hv.spacing.sm}px`,
    margin: `0 ${theme.hv.spacing.xs}px`,
    backgroundColor: theme.hv.palette.accent.acce1
  }
});

export default styles;
