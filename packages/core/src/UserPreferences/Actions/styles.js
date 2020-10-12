import { outlineStyles } from "../../Focus/styles";

const hover = (theme) => ({
  background: theme.hv.palette.atmosphere.atmo4,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo4,
  },
});

const styles = (theme) => ({
  root: {
    display: "block",
    padding: theme.hvSpacing("xs", "sm", 0, "sm"),
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
    padding: 0,
    color: theme.hv.palette.atmosphere.acce1,

    "&:hover": hover(theme),

    "&:focus": {
      ...hover(theme),
      ...outlineStyles,
    },

    cursor: "pointer",
    "& *": {
      cursor: "pointer",
    },
  },
  noIcon: {
    paddingLeft: `${theme.hv.spacing.xs}px`,
  },
});

export default styles;
