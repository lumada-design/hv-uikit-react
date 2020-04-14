const muiAppBar = theme => ({
  root: {
    borderTop: `4px solid ${theme.palette.accent.acce3}`,
    "@media (min-width: 600px)": {
      height: "50px"
    }
  },
  colorDefault: {
    backgroundColor: theme.palette.atmosphere.atmo1,
    contrastText: theme.palette.accent.acce1
  }
});

export default muiAppBar;
