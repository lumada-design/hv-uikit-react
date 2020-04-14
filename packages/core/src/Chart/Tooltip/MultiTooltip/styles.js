const styles = theme => ({
  root: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    width: "fit-content",
    boxShadow: "0 2px 12px rgba(65,65,65,.12)",
    zIndex: 100
  },
  title: {
    padding: `${theme.hv.spacing.sm}px ${theme.hv.spacing.sm}px ${theme.hv.spacing.xs}px ${theme.hv.spacing.sm}px`,
    borderBottom: `3px solid ${theme.hv.palette.atmosphere.atmo2}`
  },
  valuesContainer: {
    padding: `${theme.hv.spacing.sm}px`
  },
  values: {
    display: "flex",
    alignItems: "center",
    paddingBottom: `${theme.hv.spacing.sm}px`,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  color: {
    width: `${theme.hv.spacing.xs}px`,
    height: `${theme.hv.spacing.xs}px`
  },
  separator: {
    width: `${theme.hv.spacing.xs}px`
  },
  separatorColor: {
    width: "5px"
  }
});

export default styles;
