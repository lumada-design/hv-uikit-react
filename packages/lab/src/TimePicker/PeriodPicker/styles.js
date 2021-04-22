const styles = (theme) => ({
  periodContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  periodText: {
    ...theme.hv.typography.highlightText,
    textAlign: "center",
    height: "40px",
    width: "40px",
    paddingTop: `${theme.hv.spacing.xs}px`,
    paddingBottom: `${theme.hv.spacing.xs}px`,
    marginTop: "2px",
  },
  icon: {
    cursor: "pointer",
  },
});

export default styles;
