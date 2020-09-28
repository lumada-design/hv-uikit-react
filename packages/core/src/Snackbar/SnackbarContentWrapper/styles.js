const styles = (theme) => ({
  root: {
    width: "310px",
    minHeight: "52px",
    maxHeight: "92px",
    padding: theme.spacing("xs"),
  },
  success: {
    backgroundColor: theme.hv.palette.semantic.sema8,
  },
  error: {
    backgroundColor: theme.hv.palette.semantic.sema9,
  },
  default: {
    backgroundColor: theme.hv.palette.semantic.sema7,
  },
  message: {
    padding: 0,
  },
  messageSpan: {
    display: "table",
    minHeight: "32px",
    "& > *": {
      display: "table-cell",
      verticalAlign: "middle",
    },
  },
  messageText: {
    ...theme.hv.typography.normalText,
    padding: `0 ${theme.hv.spacing.xs}px`,
    color: theme.hv.palette.base.base2,
    fontFamily: theme.hv.typography.fontFamily,
    maxHeight: "72px",
  },
  action: {
    textAlign: "right",
  },
});

export default styles;
