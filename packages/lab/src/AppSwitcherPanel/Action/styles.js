const selected = (theme) => ({
  background: theme.hv.palette.accent.acce1,
  color: theme.hv.palette.atmosphere.atmo1,
  cursor: "default",
  "& *": {
    background: theme.hv.palette.accent.acce1,
    color: theme.hv.palette.atmosphere.atmo1,
    cursor: "default",
  },
  "& svg *.color0": {
    fill: theme.hv.palette.atmosphere.atmo1,
  },
  // hover
  "&:hover": {
    background: theme.hv.palette.accent.acce1,
    color: theme.hv.palette.atmosphere.atmo1,
    "& *": {
      background: theme.hv.palette.accent.acce1,
      color: theme.hv.palette.atmosphere.atmo1,
    },
  },
});

const hover = (theme) => ({
  background: theme.hv.palette.atmosphere.atmo4,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo4,
  },
});

const styles = (theme) => ({
  typography: {
    display: "flex",
    background: theme.hv.palette.atmosphere.atmo1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    color: theme.hv.palette.atmosphere.acce1,
    marginBottom: "8px",

    // hover
    "&:hover": hover(theme),

    // cursor
    cursor: "pointer",
    "& *": {
      cursor: "pointer",
    },

    "& span": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "calc(100% - 64px)", // The with of both icons, 32px each.
    },
  },
  selected: selected(theme),

  dummyImage: {
    width: "8px",
  },

  link: {
    color: "inherit",
    textDecoration: "inherit",
  },

  iconInfo: {
    width: "32px",
    height: "32px",
    marginLeft: "auto",
  },

  iconUrl: {
    width: "16px",
    height: "16px",
    margin: "8px",
  },
});

export default styles;
