const styles = (theme) => ({
  root: {
    width: "225px",
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
});

export default styles;
