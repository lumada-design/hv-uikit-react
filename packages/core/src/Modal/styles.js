import { fade, hexToRgb } from "@material-ui/core";

const styles = theme => ({
  background: {
    background: fade(hexToRgb(theme.hv.palette.atmosphere.atmo5), 0.8)
  },
  paper: {
    background: `${theme.hv.palette.atmosphere.atmo1}`,
    padding: "0px",
    overflow: "auto",
    boxShadow: theme.hv.shadows[1]
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 0,
    margin: `${theme.hv.spacing.xs}px`,
    minWidth: "unset"
  }
});

export default styles;
