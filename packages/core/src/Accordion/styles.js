import { outlineStyles } from "../Focus/styles";

const hover = (theme) => ({
  background: theme.hv.palette.atmosphere.atmo3,
});

const styles = (theme) => ({
  root: {
    "& + $root": {
      paddingTop: 8,
    },
  },
  nav: {},
  container: {
    paddingTop: 8,
    height: "auto",
  },
  hidden: {
    height: 0,
    display: "none",
  },
  label: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",

    // hover
    ":not($disabled)&:hover": hover(theme),

    // focus
    ":not($disabled)&:focus": hover(theme),

    "&[disabled], &:active": {
      outline: "none",
    },

    "&:focus": {
      outline: "none",
    },

    "&.focus-visible": {
      ...outlineStyles,
    },

    // cursor
    cursor: "pointer",
    "&$disabled": {
      cursor: "not-allowed",
      color: theme.hv.palette.atmosphere.atmo5,
    },
  },
  disabled: {},
});

export default styles;
