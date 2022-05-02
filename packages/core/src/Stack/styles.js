const styles = (theme) => ({
  root: {
    display: "flex",
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  xs: {
    gap: theme.hvSpacing("xs"),
  },
  sm: {
    gap: theme.hvSpacing("sm"),
  },
  md: {
    gap: theme.hvSpacing("md"),
  },
  lg: {
    gap: theme.hvSpacing("lg"),
  },
  xl: {
    gap: theme.hvSpacing("xl"),
  },
});

export default styles;
