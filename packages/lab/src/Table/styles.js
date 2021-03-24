const styles = (theme) => ({
  root: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,

    ...theme.hv.typography.normalText,

    "& caption": {
      ...theme.typography.normalText,
      padding: theme.spacing("xs"),
      textAlign: "left",
      captionSide: "bottom",
    },
  },
  stickyHeader: {},
  stickyColumns: {
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
  },
});

export default styles;
