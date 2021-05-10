const styles = (theme) => ({
  root: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  label: {
    marginBottom: theme.hv.spacing.xs,
  },

  switchContainer: {
    height: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderBottom: `1px solid transparent`,
  },

  invalidSwitch: {
    borderBottom: `1px solid ${theme.hv.palette.semantic.sema4}`,
  },

  error: {},
});

export default styles;
