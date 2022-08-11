const styles = (theme) => ({
  root: {},
  notificationsIndicator: {
    height: 32,
    backgroundColor: theme.hv.palette.semantic.sema7,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `0 0 0 ${theme.hv.spacing.sm}px`,
    "& button": {
      margin: `0 0 0 ${theme.hv.spacing.xs}px`,
      borderRadius: 0,
    },
  },

  semanticColoring: {
    color: theme.hv.palette.base.base2,
  },
});

export default styles;
