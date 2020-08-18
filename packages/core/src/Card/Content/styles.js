const styles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 15px ${theme.hv.spacing.sm}px`,
    "&:last-child": {
      paddingBottom: theme.hv.spacing.sm // Overrides MUI padding
    }
  }
});

export default styles;
