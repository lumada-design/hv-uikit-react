import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  root: {
    display: "contents"
  },
  popper: {
    zIndex: theme.zIndex.tooltip
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
  },
  menuList: {
    padding: theme.spacing("sm"),
    whiteSpace: "nowrap",
    backgroundColor: theme.palette.atmo1,
    boxShadow: theme.hv.shadows[1],
    position: "relative"
  },
  inputExtensionOpen: {
    height: "10px",
    width: "32px",
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  inputExtensionLeftPosition: {
    marginLeft: "auto"
  },
  inputExtensionOpenShadow: {
    boxShadow: `0px 8px 0px ${theme.hv.palette.atmosphere.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`
  },
  inputExtensionFloatRight: {
    float: "left"
  },
  inputExtensionFloatLeft: {
    float: "right"
  }
});

export default styles;
