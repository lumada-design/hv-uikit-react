const styles = theme => ({
  root: {
    minHeight: 0
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      width: "100%",
      backgroundColor: `${theme.hv.palette.accent.acce1}`
    },
    height: 2
  },
  scroller: {},
  flexContainer: {
    "& button:first-child": {
      marginLeft: "3px"
    }
  }
});

export default styles;
