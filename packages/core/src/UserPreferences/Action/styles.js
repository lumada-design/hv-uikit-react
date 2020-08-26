import { outlineStyles } from "../../Focus/styles";

const hover = theme => ({
  backgroundColor: theme.hv.palette.atmosphere.atmo4
});

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    color: theme.hv.palette.atmosphere.acce1,

    "&:hover": hover(theme),

    "&:focus": {
      ...hover(theme),
      ...outlineStyles
    },

    cursor: "pointer"
  }
});

export default styles;
