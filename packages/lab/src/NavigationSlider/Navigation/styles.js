const styles = (theme) => ({
  listItemRoot: {
    display: "flex",
    alignItems: "center",
    borderLeft: `2px solid transparent`,
    minHeight: "52px",
    marginBottom: "8px",
    "& > button": {
      marginLeft: "auto",
    },
  },
  listItemSelected: {
    background: theme.hv.palette.atmosphere.atmo3,
    borderLeft: `2px solid ${theme.hv.palette.accent.acce3}`,
    "& *": {
      background: theme.hv.palette.atmosphere.atmo3,
    },
  },
});

export default styles;
