const hover = (theme) => ({
  backgroundColor: theme.hv.palette.atmosphere.atmo3,
});

const styles = (theme) => ({
  root: {
    color: theme.hv.palette.accent.acce1,
    ...theme.hv.typography.normalText,
    padding: 0,

    display: "flex",
    justifyContent: "space-between",
    height: "32px",
    lineHeight: "32px",

    listStyleType: "none",

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    position: "relative",

    "&:not(:last-child)": {
      marginBottom: "8px",
    },
    "&$condensed": {
      marginBottom: 0,
    },
  },

  gutters: {
    padding: theme.hvSpacing(0, "xs"),

    "&$withStartAdornment": {
      paddingLeft: 0,
    },
    "&$withEndAdornment": {
      paddingRight: 0,
    },
  },

  interactive: {
    cursor: "pointer",
    "&:not($disabled):not($selected):hover": hover(theme),
    "&$disabled": {
      cursor: "not-allowed",
    },
  },

  selected: {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
  },
  disabled: {
    color: theme.hv.palette.atmosphere.atmo5,
  },

  condensed: {},

  withStartAdornment: {},
  withEndAdornment: {},
  startAdornment: {
    float: "left",

    "& svg": {
      boxShadow: "none !important",
      outline: "none !important",
    },
    "$disabled>& svg *.color0": {
      fill: theme.hv.palette.atmosphere.atmo5,
    },
  },
  endAdornment: {
    float: "right",

    "& svg": {
      boxShadow: "none !important",
      outline: "none !important",
    },
    "$disabled>& svg *.color0": {
      fill: theme.hv.palette.atmosphere.atmo5,
    },
  },

  focus: {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    zIndex: 2,
  },
});

export default styles;
