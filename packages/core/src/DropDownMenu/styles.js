import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  root: {
    display: "inline-block"
  },
  icon: {
    position: "relative",
    boxSizing: "content-box",
    padding: 0,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.hv.palette.atmosphere.atmo3
    },
    "&:focus": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      ...outlineStyles
    },
    "&:disabled": {
      cursor: "not-allowed",
      backgroundColor: "transparent",
      pointerEvents: "auto"
    },
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  iconSelected: {
    backgroundColor: theme.palette.atmo1,
    boxShadow: theme.hv.shadows[1],
    "&:hover": {
      backgroundColor: theme.palette.atmo1
    }
  }
});

export default styles;
