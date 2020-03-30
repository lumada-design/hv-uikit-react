const styles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 15px ${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    "&:last-child": {
      paddingBottom: `${theme.hv.spacing.sm}px` // Overrides MUI padding
    }
  }
});

export default styles;
