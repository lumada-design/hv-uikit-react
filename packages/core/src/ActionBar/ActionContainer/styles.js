const styles = theme => ({
  root: {
    width: "100%",
    height: "75px",
    padding: `${theme.hv.spacing.sm}px`,
    borderTop: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "flex-end"
  }
});

export default styles;
