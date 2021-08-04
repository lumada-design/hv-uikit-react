import fade from "../utils/hexToRgbA";

const styles = (theme) => ({
  root: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    padding: 0,
    margin: "-1px 0 0 0",
  },
  formContainer: {
    background: fade(theme.hv.palette.atmosphere.atmo2, 1),
    marginLeft: "auto",
    maxWidth: 500,
    height: "100%",
  },
});

export default styles;
