const styles = (theme) => ({
  root: {},
  controlsContainer: {
    display: "flex",
    paddingBottom: `${theme.hv.spacing.md}px`,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  search: {
    justifyContent: "flex-end",
  },
  rightControls: {
    display: "flex",
    alignItems: "flex-end",
  },
  multiButtons: {
    paddingLeft: `${theme.hv.spacing.md}px`,
  },
  viewContainer: {
    padding: theme.hvSpacing("sm", 0),
    width: "100%",
  },
  sortContainer: {},
  searchBoxContainer: {
    width: "250px",
  },
  pagination: {
    marginTop: 0,
  },
  bulkActions: {
    marginBottom: 0,
  },
});

export default styles;
