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
      paddingLeft: `${theme.spacing(4)}px`,
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
    margin: theme.hvSpacing("sm", 0, 0),
  },
});

export default styles;
