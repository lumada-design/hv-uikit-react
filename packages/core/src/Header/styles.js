const styles = (theme) => ({
  root: {
    height: 44,
  },
  backgroundColor: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: theme.hvSpacing(0, "sm"),
    boxShadow: theme.hv.shadows[1],
    "& > *:not(nav)": {
      zIndex: 2,
    },
  },
});

export default styles;
