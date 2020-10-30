import mapValues from "lodash/mapValues";

const semantics = (theme) =>
  mapValues(theme.hv.palette.semantic, (value) => ({
    backgroundColor: value,
  }));

const styles = (theme) => ({
  root: {
    overflow: "visible",
  },
  sema0: {
    backgroundColor: theme.palette.atmo4,
  },
  ...semantics(theme),
  semanticContainer: {
    position: "relative",
    backgroundColor: theme.hv.palette.accent.acce0,
    "& > *": {
      position: "absolute",
      zIndex: 1,
    },
  },
  semanticBar: {
    width: "100%",
    height: 2,
    top: -1,
    right: 0,
  },

  icon: {
    top: 0,
    right: 0,
    transform: "translate(50%, -50%)",
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
    display: "none",
  },
  upperAreaReference: {
    position: "relative",
  },
  upperAreaSelectable: {
    cursor: "pointer",
  },
  selectable: {
    "&:hover": {
      outline: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    },
  },
  selected: {
    outline: `1px solid ${theme.hv.palette.accent.acce1}`,
    "&:hover": {
      outline: `1px solid ${theme.hv.palette.accent.acce1}`,
    },
    "& $semanticBar": {
      height: 4,
    },
    "& $sema0": {
      backgroundColor: theme.palette.acce1,
    },
  },
});

export default styles;
