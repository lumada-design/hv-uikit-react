import { fade, hexToRgb } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "100%",
    width: "100%",
    height: "100%",
    padding: 0,
    margin: "-1px 0 0 0",
  },
  formContainer: {
    background: fade(hexToRgb(theme.hv.palette.atmosphere.atmo2), 1),
    marginLeft: "auto",
    maxWidth: 500,
    height: "100%",
  },
});

export default styles;
