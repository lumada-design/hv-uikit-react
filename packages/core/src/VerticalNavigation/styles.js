const styles = theme => ({
  root: {
    width: "320px",
    "& > :only-child": {
      padding: `${theme.hv.spacing.sm}px`
    },
    "& > :not(:first-child)": {
      borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
      padding: `${theme.hv.spacing.xs}px ${theme.hv.spacing.sm}px ${theme.hv.spacing.sm}px ${theme.hv.spacing.sm}px`
    },
    "& > :first-child:not(:last-child)": {
      padding: `${theme.hv.spacing.sm}px  ${theme.hv.spacing.sm}px  ${theme.hv.spacing.xs}px ${theme.hv.spacing.sm}px `
    }
  },
  noCollapse: {}
});

export default styles;
