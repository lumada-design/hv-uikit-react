const styles = (theme) => ({
  root: {
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    margin: theme.hvSpacing("xs", 0, 0),
    padding: theme.hvSpacing("xs", "sm", 0),
  },
  label: {
    marginBottom: `5px`,
  },
  ul: {
    padding: 0,
    margin: 0,
    "& > :not(:last-child)": {
      paddingBottom: "8px",
    },
  },
});

export default styles;
