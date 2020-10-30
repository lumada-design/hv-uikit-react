const styles = (theme) => ({
  root: {
    padding: theme.hvSpacing("15px", "sm"),
    position: "relative",
  },
  title: {
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.xsTitle,
  },
  titleShort: {
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.xsTitle,
    marginRight: "30px",
  },
  subheader: {
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
  },
  action: {
    position: "absolute",
    right: 20,
    marginTop: 0,
    marginRight: "0px",
    paddingLeft: theme.hv.spacing.xs,
    top: "15px",
  },
  content: {},
});

export default styles;
