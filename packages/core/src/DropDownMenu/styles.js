import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    display: "inline-block",
    width: "auto",
    "&.focus-visible $icon": {
      ...outlineStyles,
    },
  },
  container: {
    width: 32,
  },
  baseContainer: {},
  icon: {
    position: "relative",
    boxSizing: "content-box",
    padding: 0,
    borderRadius: 0,
  },
  iconSelected: {
    backgroundColor: theme.palette.atmo1,
    boxShadow: theme.hv.shadows[1],
    "&:hover": {
      backgroundColor: theme.palette.atmo1,
    },
    "& svg .color0": {
      fill: theme.palette.acce1,
    },
    borderRadius: "2px 2px 0px 0px",
  },
  menuList: {},
});

export default styles;
