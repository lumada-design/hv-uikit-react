const styles = (theme) => ({
  list: {
    margin: 0,
    padding: 0,
    marginTop: theme.hv.spacing.sm,
    "& li": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      background: theme.hv.palette.atmosphere.atmo1,
      "&:not(:last-child)": {
        marginBottom: theme.hv.spacing.xs,
      },
      height: 72,
    },
  },
});

export default styles;
