const styles = (theme) => ({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: theme.hvSpacing("xs"),
    margin: 0,
    padding: 0,
    marginTop: theme.hv.spacing.sm,
  },
  listItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: theme.palette.atmo1,
    padding: theme.hvSpacing("xs", 0),
  },
});

export default styles;
