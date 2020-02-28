const styles = theme => ({
  titleContainer: {
    margin: "20px 20px 8px 20px",
    maxWidth: "280px",
    display: "flex",
    justifyContent: "center",
    position: "relative"
  },
  navIcon: {
    left: 0,
    position: "absolute"
  },
  typography: {
    lineHeight: "32px",
    padding: `0 ${theme.hv.spacing.xs}px`,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  box: {
    width: "30px",
    height: "30px",
    padding: "10px 7px 7px 7px",
    "& svg": {
      display: "block",
      margin: "auto"
    }
  }
});

export default styles;
