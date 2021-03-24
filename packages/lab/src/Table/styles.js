const styles = (theme) => ({
  root: {
    width: "100%",

    ...theme.hv.typography.normalText,

    "table&": {
      borderSpacing: 0,
    },

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
