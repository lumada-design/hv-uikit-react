const styles = (theme) => ({
  formContainer: {
    marginBottom: theme.hv.spacing.lg,
  },
  section: {
    marginTop: theme.hv.spacing.md,
    paddingTop: theme.hv.spacing.xs,
    paddingBottom: theme.hv.spacing.sm,
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
  },
  footer: {
    width: "100%",
    height: 80,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: theme.hv.spacing.md,
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 2,
  },
  field: {
    height: 60,
  },
  textArea: {
    height: 114,
  },
});

export default styles;
