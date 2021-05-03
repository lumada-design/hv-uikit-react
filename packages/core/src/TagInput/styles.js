const styles = (theme) => ({
  root: {
    display: "flex",
    padding: "5px 8px",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    overflow: "hidden",
  },
  tags: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginRight: 10,
    },
  },
  input: {
    height: 10,
    padding: 5,
    margin: 0,
  },
  inputRoot: {
    backgroundColor: "transparent",
  },
  inputBorderContainer: {
    display: "none",
  },
});

export default styles;
