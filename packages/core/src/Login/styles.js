import { fade, hexToRgb } from "@material-ui/core";

const styles = (theme) => ({
  container: {
    background: `0 / auto`,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
  },
  root: {},
  rightContainer: {
    background: fade(hexToRgb(theme.hv.palette.atmosphere.atmo2), 1),
    position: "relative",
    maxWidth: 500,
  },
  panelPosition: {
    position: "absolute",
  },
});

export default styles;
