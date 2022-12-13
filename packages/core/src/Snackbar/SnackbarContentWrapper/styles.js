const styles = (theme) => ({
  root: {
    width: "310px",
    minHeight: "52px",
    maxHeight: "92px",
    padding: theme.hvSpacing("xs"),
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
  warning: {
    backgroundColor: theme.hv.palette.semantic.sema20,
  },
  message: {
    padding: 0,
    width: "100%",
  },
  messageSpan: {
    display: "flex",
    alignItems: "center",
    minHeight: "32px",
  },
  messageText: {
    ...theme.hv.typography.normalText,
    padding: theme.hvSpacing(0, "xs"),
    color: theme.hv.palette.base.base2,
    fontFamily: theme.hv.typography.fontFamily,
    maxHeight: "72px",
    wordBreak: "break-word",
  },
  action: {
    textAlign: "right",
  },
});

export default styles;
