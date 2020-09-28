const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    "& > *": {
      marginLeft: `${theme.hv.spacing.xs}px`,
    },
  },
});

export default styles;
