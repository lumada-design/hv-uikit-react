const styles = (theme) => ({
  periodContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  periodToggle: {
    height: "40px",
    width: "40px",
  },
  icon: {
    cursor: "pointer",
  },
  subtractIcon: {
    marginTop: `${theme.hv.spacing.xs}px`,
  },
});

export default styles;
