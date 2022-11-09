import fade from "../utils/hexToRgbA";

const styles = (theme) => ({
  background: {
    background: fade(theme.hv.palette.atmosphere.atmo4, 0.8),
  },
  paper: {
    background: theme.hv.palette.atmosphere.atmo1,
    padding: 0,
    overflow: "auto",
    boxShadow: theme.hv.shadows[1],
    maxHeight: "calc(100% - 200px)",
    "@media (max-height:720px)": {
      maxHeight: "calc(100% - 40px)", // "sm" margin
    },
    "&$fullscreen": {
      maxHeight: "none",
    },
  },
  fullscreen: {},
  closeButton: {
    padding: 0,
    minWidth: "inherit",
    position: "absolute",
    top: theme.hvSpacing("sm"),
    right: theme.hvSpacing("sm"),
  },
});

export default styles;
