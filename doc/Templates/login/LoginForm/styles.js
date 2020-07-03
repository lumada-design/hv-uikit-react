const styles = theme => ({
  root: {
    width: 300,
    margin: "auto",
    paddingTop: 150,
    "& h3": {
      textAlign: "center"
    }
  },
  input: {
    marginTop: 10
  },
  login: {
    width: 120,
    float: "right",
    marginTop: `${theme.hv.spacing.lg}px`
  },
  forgot: {
    display: "flex",
    margin: `${theme.hv.spacing.sm}px auto 0`
  },
  checkBox: {
    marginTop: `${theme.hv.spacing.lg}px`
  },
  sentenceCase: {
    textTransform: `full-size-kana`
  },
  checkBoxTypography: {
    ...theme.hv.typography.normalText
  }
});

export default styles;
