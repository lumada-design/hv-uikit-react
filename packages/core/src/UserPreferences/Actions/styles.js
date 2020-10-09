const styles = (theme) => ({
  root: {
    display: "block",
    padding: theme.hvSpacing("xs", "sm", 0, "sm"),
    backgroundColor: theme.hv.palette.atmosphere.atmo1,

    "& :not(:last-child)": {
      marginBottom: "8px",
    },
  },
});

export default styles;
