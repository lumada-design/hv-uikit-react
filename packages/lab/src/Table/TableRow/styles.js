const styles = (theme) => ({
  root: {
    color: "inherit",
    backgroundColor: "inherit",
    verticalAlign: "middle",
    outline: 0,
    minHeight: 32,
    "tr&": {
      height: 32,
    },
  },
  head: {
    "&:first-child": {
      height: 52
    },

    "tr&:first-child": {
      height: 52,
    }
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
