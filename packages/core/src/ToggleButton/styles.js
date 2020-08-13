import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  root: {
    padding: 0,
    margin: 0,
    border: 0,
    backgroundColor: "transparent",

    display: "inline-flex",
    cursor: "pointer",

    "&:focus": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      ...outlineStyles
    },
    "&:not($disabled):hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    }
  },
  icon: {},
  disabled: {
    cursor: "not-allowed",
    "& svg *.color0": {
      fill: theme.hv.palette.atmosphere.atmo6
    }
  }
});

export default styles;
