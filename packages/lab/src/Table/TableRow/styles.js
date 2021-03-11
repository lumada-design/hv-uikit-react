const styles = (theme) => ({
  root: {
    color: "inherit",
    verticalAlign: "middle",
    outline: 0,

    "&$hover:hover": {
      backgroundColor: theme.palette.atmo3,
    },
    "&$selected, &$selected:hover": {
      backgroundColor: theme.palette.atmo1,
    },
  },
  head: {},
  body: {},
  footer: {},
  selected: {},
  hover: {},
});

export default styles;
