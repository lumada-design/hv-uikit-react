import { outlineStyles } from "../../Focus/styles";

const hover = theme => ({
  background: theme.hv.palette.atmosphere.atmo4,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo4
  }
});

const selected = theme => ({
  background: theme.hv.palette.accent.acce1,
  color: theme.hv.palette.atmosphere.atmo1,
  "& *": {
    background: theme.hv.palette.accent.acce1,
    color: theme.hv.palette.atmosphere.atmo1
  },
  "& svg *.color0": {
    fill: theme.hv.palette.atmosphere.atmo1
  }
});

const styles = theme => ({
  optionsRoot: {},
  root: {
    display: "block",
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
    paddingTop: `${theme.hv.spacing.md}px`,
    background: theme.hv.palette.atmosphere.atmo1,
    "& :not(:last-child)": {
      marginBottom: "8px"
    }
  },
  action: {
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
    cursor: "pointer",
    "& *": {
      cursor: "pointer"
    }
  },
  noIcon: {
    paddingLeft: `${theme.hv.spacing.xs}px`
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
