const styles = (theme) => ({
  root: {
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: 0,

    ...theme.hv.typography.normalText,

    "& caption": {
      ...theme.typography.normalText,
      padding: theme.spacing("xs"),
      textAlign: "left",
      captionSide: "bottom",
    },
  },
});

export default styles;
