import mapValues from "lodash/mapValues";

const styles = theme => {
  const semantics = mapValues(theme.hv.palette.semantic, value => ({
    position: "absolute",
    backgroundColor: value,
    width: "100%",
    height: "2px",
    top: -1,
    right: 0,
    zIndex: 1
  }));

  return {
    root: {},
    cardContentWrapper: {
      position: "relative",
      marginTop: 5,
      backgroundColor: theme.hv.palette.accent.acce0
    },
    cardContainer: {
      boxSizing: "content-box",
      position: "relative",
      marginTop: "-4px"
    },
    sema0: {
      position: "absolute",
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      width: "100%",
      height: "2px",
      top: -1,
      right: 0,
      zIndex: 1
    },
    ...semantics,
    semanticSelected: {
      height: "4px"
    },
    semanticContainer: {
      width: "100%",
      position: "absolute"
    },
    cardOutLine: {
      width: "98%",
      height: "98%",
      position: "absolute",
      zIndex: "1",
      border: `2px solid Highlight`,
      top: 0,
      left: "0.5%",
      backgroundColor: "transparent",
      display: "none"
    },
    upperAreaReference: {
      position: "relative"
    },
    upperAreaSelectable: {
      cursor: "pointer"
    },
    selectable: {
      "&:hover": {
        outline: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
      }
    },
    selected: {
      outline: `1px solid ${theme.hv.palette.accent.acce1}`,
      "&:hover": {
        outline: `1px solid ${theme.hv.palette.accent.acce1}`
      }
    }
  };
};

export default styles;
