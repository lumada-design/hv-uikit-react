import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  root: {
    padding: 0,
    margin: 0,
    border: 0,
    backgroundColor: "transparent",

    display: "inline-flex",
    cursor: "pointer",

    "&:not($disabled):hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3
    }
  },
  focus: {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    ...outlineStyles
  },
  disabled: {
    cursor: "not-allowed",
    "& svg *.color0": {
      fill: theme.hv.palette.atmosphere.atmo5
    }
  }
});

export default styles;
