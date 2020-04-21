const styles = theme => ({
  root: {
    borderSpacing: `0 ${theme.hv.spacing.xs}px`,
    width: "100%",
    display: "table"
  },
  tableBody: {
    display: "table-row-group"
  },
  tableHead: {
    display: "table-header-group"
  }
});

export default styles;
