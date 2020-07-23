const styles = theme => ({
  root: {},
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      width: "100%",
      backgroundColor: `${theme.hv.palette.accent.acce1}`
    },
    height: 2,
    top: 0
  },
  scroller: {
    "& $flexContainer": {
      borderTop: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`
    }
  },
  flexContainer: {}
});

export default styles;
