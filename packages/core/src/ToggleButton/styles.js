const styles = theme => ({
  root: {
    display: "inline-flex"
  },
  icon: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    }
  },
  disabled: {
    pointerEvents: "none",
    backgroundColor: theme.hv.palette.atmosphere.atmo4
  }
});

export default styles;
