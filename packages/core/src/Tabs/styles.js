const styles = theme => ({
  root: {
    overflow: "visible"
  },
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
    // fixes inline style included in material ui tab in https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tabs/Tabs.js#L125
    overflow: "visible !important",
    "& $flexContainer": {
      borderTop: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`
    }
  },
  flexContainer: {}
});

export default styles;
