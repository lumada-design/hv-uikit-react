const styles = (theme) => ({
  content: {
    padding: theme.hvSpacing(0, "sm", "15px", "sm"),
    "&:last-child": {
      paddingBottom: theme.hv.spacing.sm, // Overrides MUI padding
    },
  },
});

export default styles;
