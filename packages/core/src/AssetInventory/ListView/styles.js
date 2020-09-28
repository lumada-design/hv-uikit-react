const styles = (theme) => ({
  root: {
    borderSpacing: `0 ${theme.hv.spacing.xs}px`,
    width: "100%",
    display: "table",
  },
  listFocusContainer: {
    background: theme.hv.palette.atmosphere.atmo1,
    display: "table-row",
  },
  tableBody: {
    display: "table-row-group",
  },
  tableHead: {
    display: "table-header-group",
  },
});

export default styles;
