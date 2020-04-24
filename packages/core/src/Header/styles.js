const styles = theme => ({
  root: {
    height: 50
  },
  backgroundColor: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: `0 ${theme.hv.spacing.sm}px`,
    boxShadow: theme.hv.shadows[1],
    "& > *:not(nav)": {
      zIndex: 2
    }
  }
});

export default styles;
