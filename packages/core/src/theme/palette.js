import createPalette from "@material-ui/core/styles/createPalette";

const palette = theme =>
  createPalette({
    primary: {
      main: theme.palette.accent.acce2,
      light: theme.palette.accent.acce2h
    },
    secondary: {
      main: theme.palette.accent.acce1,
      light: theme.palette.atmosphere.atmo7
    },
    text: {
      primary: theme.palette.accent.acce1,
      disabled: theme.palette.atmosphere.atmo7
    },
    background: {
      default: theme.palette.atmosphere.atmo2
    },
    ...Object.assign({}, ...Object.values(theme.palette))
  });

export default palette;
