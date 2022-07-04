const styles = (theme) => ({
  root: {
    padding: theme.hv.spacing.sm,
    display: "flex",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    boxShadow: theme.hv.shadows[1],
    width: "fit-content",
    zIndex: 100,
  },
  separator: {
    width: theme.hv.spacing.xs,
  },
});

export default styles;
