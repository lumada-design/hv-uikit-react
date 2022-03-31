const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    width: "100%",

    background: theme.hv.palette.atmosphere.atmo1,
    boxShadow: theme.hv.shadows[1],

    "& > :only-child": {
      padding: theme.hv.spacing.sm,
    },
    "& > :not(:first-child)": {
      borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
      padding: theme.hvSpacing("xs", "sm", "sm", "sm"),
    },
    "& > :first-child:not(:last-child)": {
      padding: theme.hvSpacing("sm", "sm", "xs", "sm"),
    },
  },
  noCollapse: {},
  legacyMode: {
    width: 225,
  },
});

export default styles;
