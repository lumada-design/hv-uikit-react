const styles = theme => ({
  root: {
    padding: `15px ${theme.hv.spacing.sm}px`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    position: "relative"
  },
  title: {
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.mTitle
  },
  titleShort: {
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.mTitle,
    marginRight: "30px"
  },
  subheader: {
    fontFamily: theme.hv.typography.fontFamily,
    ...theme.hv.typography.normalText,
    paddingTop: `${theme.hv.spacing.sm}px`
  },
  action: {
    position: "absolute",
    right: 20,
    marginTop: 0,
    marginRight: "0px",
    paddingLeft: `${theme.hv.spacing.xs}px`,
    top: "15px"
  },
  content: {}
});

export default styles;
