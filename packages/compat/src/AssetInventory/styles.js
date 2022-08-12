const styles = (theme) => ({
  root: {},
  controlsContainer: {
    display: "flex",
    paddingBottom: theme.hv.spacing.md,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  search: {
    justifyContent: "flex-end",
  },
  rightControls: {
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  sortContainer: {
    flexWrap: "nowrap",
  },
  multiButtons: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.hvSpacing("sm"),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: `${theme.spacing(2)}px`,
    },
  },
  viewContainer: {},
  searchBoxContainer: {},
  pagination: {
    marginTop: 0,
  },
  bulkActions: {
    marginTop: 5, // 15px is already given by the grid, we just need to add 5 here
    marginBottom: 0,
  },
});

export default styles;
