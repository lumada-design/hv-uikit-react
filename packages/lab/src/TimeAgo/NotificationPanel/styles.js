const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    width: 320,
    overflow: "hidden",
  },
  closed: { display: "none" },
  open: {
    position: "absolute",
    right: 0,
    boxShadow: theme.hv.shadows[1],
  },
  actionBar: {
    marginTop: "auto",
  },
  panel: {
    flexGrow: 1,
    overflow: "auto",
    padding: 0,
    width: "100%",
    "&.focus-visible": {
      outline: "none",
    },
  },

  actionBarRoot: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    justifyContent: "space-between",
  },

  emptyState: {
    height: "500px",
  },
});

export default styles;
