const styles = (theme) => ({
  root: {
    color: "inherit",
    verticalAlign: "middle",
    outline: 0,
    borderBottom: `1px solid ${theme.palette.atmo4}`,
  },
  head: {},
  body: {},
  footer: {},
  selected: {
    backgroundColor: theme.palette.atmo1,
  },
  hover: {
    "&:hover": {
      backgroundColor: theme.palette.atmo3,
    },
  },
});

export default styles;
