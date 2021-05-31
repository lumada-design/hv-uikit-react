const styles = (theme) => ({
  root: {
    color: "inherit",
    backgroundColor: "inherit",
    verticalAlign: "middle",
    outline: 0,
    minHeight: 32,
  },
  head: {
    minHeight: 52,
  },
  body: {},
  footer: {},
  selected: {
    backgroundColor: theme.palette.atmo1,
  },
  hover: {
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shortest,
    }),

    "&:hover": {
      backgroundColor: theme.palette.atmo3,
    },
  },
});

export default styles;
