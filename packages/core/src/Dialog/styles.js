import fade from "../utils/hexToRgbA";

const styles = (theme) => ({
  background: {
    background: fade(theme.hv.palette.atmosphere.atmo4, 0.8),
  },
  paper: {
    background: `${theme.hv.palette.atmosphere.atmo1}`,
    padding: "0px",
    overflow: "auto",
    boxShadow: theme.hv.shadows[1],
  },
  closeButton: {
    padding: 0,
    minWidth: "inherit",
    position: "absolute",
    top: theme.hvSpacing("sm"),
    right: theme.hvSpacing("sm"),
  },
});

export default styles;
