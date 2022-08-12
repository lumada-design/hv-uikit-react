const styles = (theme) => ({
  root: {
    borderSpacing: theme.hvSpacing(0, "xs"),
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
