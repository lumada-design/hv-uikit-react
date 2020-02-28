import { fade, hexToRgb } from "@material-ui/core";

const styles = theme => ({
  background: {
    background: fade(hexToRgb(theme.hv.palette.atmosphere.atmo5), 0.8)
  },
  paper: {
    background: `${theme.hv.palette.atmosphere.atmo1}`,
    padding: "0px",
    overflow: "hidden",
    filter: `drop-shadow(0px 2px 12px ${fade(
      hexToRgb(theme.hv.palette.accent.acce1),
      0.12
    )})`
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 0,
    margin: `${theme.hv.spacing.xs}px`,
    minWidth: "unset"
  },
  iconContainer: {
    width: "32px",
    height: "32px"
  }
});

export default styles;
