import { outlineStyles } from "../../Focus/styles";

const hover = theme => ({
  backgroundColor: theme.palette.atmo3
});

const selected = theme => ({
  backgroundColor: theme.palette.acce1,
  color: theme.palette.atmo1,
  "& *": {
    backgroundColor: theme.palette.acce1,
    color: theme.palette.atmo1
  },
  "& svg *.color0": {
    fill: theme.palette.atmo1
  }
});

const styles = theme => ({
  root: {},
  action: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    color: theme.hv.palette.atmosphere.acce1,
    paddingLeft: 8,
    borderRadius: 0,
    "&:hover": hover(theme),
    "&:focus": {
      ...hover(theme),
      ...outlineStyles
    },
    cursor: "pointer",
    "& *": {
      cursor: "pointer"
    }
  },
  li: {
    listStyle: "none"
  },
  selected: {
    ...selected(theme),
    "&:hover": selected(theme),
    "&:focus": {
      ...selected(theme),
      ...outlineStyles
    }
  }
});

export default styles;
