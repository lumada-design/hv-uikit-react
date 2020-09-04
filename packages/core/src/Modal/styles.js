import { fade, hexToRgb } from "@material-ui/core";

const styles = theme => ({
  background: {
    background: fade(hexToRgb(theme.hv.palette.atmosphere.atmo4), 0.8)
  },
  paper: {
    background: `${theme.hv.palette.atmosphere.atmo1}`,
    padding: "0px",
    overflow: "auto",
    boxShadow: theme.hv.shadows[1]
  },
  closeButton: {
    padding: 0,
    minWidth: "unset",
    position: "absolute",
    top: theme.spacing("sm"),
    right: theme.spacing("sm")
  }
});

export default styles;
