const styles = theme => ({
  root: {
    padding: `${theme.hv.spacing.sm}px ${theme.hv.spacing.xs}px`,
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  leftContainer: {
    alignSelf: "flex-start",
    marginRight: "auto"
  },
  rightContainer: {
    alignSelf: "flex-end",
    marginLeft: "auto"
  }
});

export default styles;
