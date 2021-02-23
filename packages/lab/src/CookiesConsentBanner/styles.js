const styles = (theme) => ({
  root: {
    display: "flex",
    padding: theme.hv.spacing.sm,

    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    boxShadow: theme.hv.shadows[1],
  },
  content: {
    marginRight: theme.hv.spacing.sm,
  },
  title: {
    paddingBottom: theme.hv.spacing.xs,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      "&:first-child": {
        marginRight: theme.hv.spacing.xs,
      },
    },
  },
});

export default styles;
