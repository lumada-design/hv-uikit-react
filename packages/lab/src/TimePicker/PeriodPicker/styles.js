const icon = {
  width: "32px",
  height: "32px",
  cursor: "pointer"
};

const styles = theme => ({
  periodContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "&:first-child": { marginTop: `${theme.hv.spacing.sm}px` },
    "&:last-child": { marginBottom: `${theme.hv.spacing.sm}px` }
  },
  periodText: {
    ...theme.hv.typography.highlightText,
    textAlign: "center",
    height: "40px",
    width: "40px",
    paddingTop: `${theme.hv.spacing.xs}px`,
    paddingBottom: `${theme.hv.spacing.xs}px`
  },
  icon: {
    ...icon
  }
});

export default styles;
