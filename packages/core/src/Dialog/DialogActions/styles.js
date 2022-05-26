const styles = (theme) => ({
  root: {
    margin: "0",
    padding: theme.hv.spacing.sm,
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    height: 100,
    flex: 1,
  },
  spacing: {
    "& > :not(:first-child)": {
      marginLeft: theme.hv.spacing.xs,
    },
  },
  fullscreen: {
    position: "fixed",
    width: "100%",
    bottom: 0,
    left: 0,
  },
});

export default styles;
