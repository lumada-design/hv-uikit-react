const styles = (theme) => ({
  root: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    width: "fit-content",
    boxShadow: theme.hv.shadows[1],
    zIndex: 100,
  },
  title: {
    padding: theme.hvSpacing("15px", "sm"),
    borderBottom: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
  },
  valuesContainer: {
    padding: theme.hv.spacing.sm,
  },
  values: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.hv.spacing.sm,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  valueNameWrapper: {
    display: "flex",
    alignItems: "center",
  },
  color: {
    width: theme.hv.spacing.xs,
    height: theme.hv.spacing.xs,
  },
  separator: {
    width: theme.hv.spacing.xs,
  },
  separatorColor: {
    width: "5px",
  },
});

export default styles;
