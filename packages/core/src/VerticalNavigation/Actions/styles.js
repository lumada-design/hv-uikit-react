import { outlineStyles } from "../../Focus/styles";

const hover = (theme) => ({
  background: theme.hv.palette.atmosphere.atmo3,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo3,
  },
});

const styles = (theme) => ({
  root: {
    display: "block",
    background: theme.hv.palette.atmosphere.atmo1,

    "& :not(:last-child)": {
      marginBottom: "8px",
    },
  },

  action: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    color: theme.hv.palette.atmosphere.acce1,

    // hover
    "&:hover": hover(theme),

    "&:focus": {
      outline: "none",
      ...hover(theme),
    },

    "&.focus-visible": {
      ...outlineStyles,
    },

    // cursor
    cursor: "pointer",
    "& *": {
      cursor: "pointer",
    },
  },
  noIcon: {
    paddingLeft: theme.hv.spacing.xs,
  },
});

export default styles;
