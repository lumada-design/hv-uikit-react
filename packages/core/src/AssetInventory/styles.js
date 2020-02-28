const styles = theme => ({
  controlsContainer: {
    display: "flex",
    paddingBottom: `${theme.hv.spacing.md}px`,
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  search: {
    justifyContent: "flex-end"
  },
  rightControls: {
    display: "flex",
    alignItems: "flex-end"
  },
  multiButtons: {
    paddingLeft: `${theme.hv.spacing.md}px`
  },
  viewContainer: {
    overflow: "auto",
    padding: `${theme.hv.spacing.md}px 0`,
    width: "100%"
  },
  sortContainer: {},
  searchBoxContainer: {
    width: "250px"
  },
  pagination: {
    marginTop: 0
  }
});

export default styles;
