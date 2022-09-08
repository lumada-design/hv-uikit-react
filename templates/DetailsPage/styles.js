const styles = (theme) => ({
  section: {
    marginBottom: theme.hv.spacing.md,
  },
  scrollTo: {
    marginBottom: theme.hv.spacing.md,
    justifyContent: "center",
  },
  titleRoot: {
    paddingBottom: 5,
  },
  headerRoot: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 5,
  },
  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  headerTitle: {
    ...theme.hv.typography.highlightText,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justify: "flex-start",
    paddingBottom: "0px !important",
  },
  indicatorIcon: {
    marginLeft: theme.hv.spacing.sm,
    marginRight: theme.hv.spacing.sm,
  },
  tagRoot: {
    width: "100%",
  },
});

export default styles;
