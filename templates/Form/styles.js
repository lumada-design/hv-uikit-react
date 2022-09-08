const styles = (theme) => ({
  section: {
    "&:nth-child(2)": {
      marginBottom: theme.hv.spacing.xl,
      marginTop: theme.hv.spacing.md,
    },
    marginTop: 0,
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
