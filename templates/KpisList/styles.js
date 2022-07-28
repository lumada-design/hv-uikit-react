const styles = (theme) => ({
  kpiContainer: {
    padding: 20,
  },
  kpiCard: {
    cursor: "pointer",
  },
  kpiTitle: {
    margin: "10px 0",
  },
  kpiContent: {
    display: "flex",
    alignItems: "center",
  },
  kpiVariation: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  selected: {
    outline: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
  },
  kpisListContainer: {
    marginTop: 40,
  },
  kpisListControls: {
    marginTop: 40,
  },
  kpisListBulkActions: {
    marginTop: 20,
  },
  kpisListPagination: {
    marginTop: 20,
  },
});

export default styles;
