const styles = theme => ({
  header: {
    backgroundColor: theme.hv.palette.semantic.sema2,
    ...theme.hv.typography.normalText,
    color: theme.hv.palette.base.base2,
    padding: "10px",
    fontSize: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  core: {
    backgroundColor: theme.hv.palette.semantic.sema1,
    color: theme.palette.common.white
  },
  lab: {
    backgroundColor: theme.hv.palette.semantic.sema3,
    color: theme.palette.common.white
  },
  content: {
    width: "100%",
    padding: "30px 50px"
  },
  name: {
    fontWeight: theme.hv.typography.highlightText.fontWeight
  },
  title: {
    ...theme.hv.typography.highlightText,
    fontSize: 25,
    lineHeight: "50px"
  },
  link: {
    fontSize: 12
  },
  description: {
    ...theme.hv.typography.normalText,
    marginBottom: 20,
    maxWidth: 900
  }
});

export default styles;
