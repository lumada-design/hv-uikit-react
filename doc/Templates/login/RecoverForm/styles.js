const styles = theme => ({
  root: {
    width: 300,
    margin: "auto",
    paddingTop: 150,
    "& h3, p": {
      textAlign: "center"
    }
  },
  title: {
    marginBottom: `${theme.hv.spacing.sm}px`
  },
  subtitle: {
    margin: `${theme.hv.spacing.sm}px 0`
  },
  recover: {
    width: 120,
    float: "right",
    marginTop: `${theme.hv.spacing.lg}px`
  },
  cancel: {
    width: 120,
    marginTop: `${theme.hv.spacing.lg}px`
  }
});

export default styles;
