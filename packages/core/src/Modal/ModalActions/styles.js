const styles = theme => ({
  root: {
    margin: "0",
    padding: `${theme.hv.spacing.sm}px`,
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`
  },
  spacing: {
    "& > :not(:first-child)": {
      marginLeft: `${theme.hv.spacing.xs}px`
    }
  }
});

export default styles;
