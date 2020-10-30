const styles = (theme) => ({
  root: {
    minWidth: "100%",
    position: "relative",
    display: "flex",
    flexWrap: "nowrap",
  },
  message: {
    display: "flex",
    alignItems: "center",
    padding: theme.hvSpacing("xs", 0),
    paddingLeft: theme.hv.spacing.sm,
  },
  action: {
    padding: theme.hvSpacing("xs"),
    marginRight: 0,
    flex: "0 0 auto",
    placeSelf: "stretch",
  },
  baseVariant: {
    padding: 0,
  },
  success: {
    backgroundColor: theme.hv.palette.semantic.sema8,
  },
  warning: {
    backgroundColor: theme.hv.palette.semantic.sema20,
  },
  error: {
    backgroundColor: theme.hv.palette.semantic.sema9,
  },
  default: {
    backgroundColor: theme.hv.palette.semantic.sema7,
  },
  outContainer: {
    width: "100%",
    position: "relative",
  },
});

export default styles;
