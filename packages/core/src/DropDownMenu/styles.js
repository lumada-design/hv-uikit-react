import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  root: {
    display: "contents"
  },
  icon: {
    position: "relative",
    boxSizing: "content-box",
    padding: 0,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    },
    "&:focus": {
      ...outlineStyles
    },
    "&:disabled": {
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  iconSelected: {
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: `0 2px 12px rgba(65,65,65,.12)`,
    "&:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`
    }
  },
  menuList: {
    padding: theme.spacing("sm"),
    whiteSpace: "nowrap",
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: `0 2px 12px rgba(65,65,65,.12)`
  }
});

export default styles;
