import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  root: {
    display: "inline-flex",
    "&:focus": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      ...outlineStyles
    }
  },
  icon: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    }
  },
  disabled: {
    pointerEvents: "none",
    backgroundColor: theme.hv.palette.atmosphere.atmo4
  }
});

export default styles;
