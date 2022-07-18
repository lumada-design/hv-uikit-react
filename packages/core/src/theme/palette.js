import { createTheme } from "@mui/material";

const palette = (theme) =>
  createTheme({
    primary: {
      main: theme.palette.accent.acce2,
      light: theme.palette.accent.acce2h,
    },
    secondary: {
      main: theme.palette.accent.acce1,
      light: theme.palette.atmosphere.atmo5,
    },
    text: {
      primary: theme.palette.accent.acce1,
      disabled: theme.palette.atmosphere.atmo5,
    },
    background: {
      default: theme.palette.atmosphere.atmo3,
    },
    ...Object.assign({}, ...Object.values(theme.palette)),
  });

export default palette;
