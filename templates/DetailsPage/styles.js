const styles = (theme) => ({
  container: {
    marginBottom: "20px",
    padding: "20px",
    outline: "none",
  },
  section: {
    marginTop: theme.hv.spacing.md,
    paddingTop: theme.hv.spacing.xs,
    paddingBottom: theme.hv.spacing.sm,
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
  },
  sectionItem: {
    paddingLeft: "0",
    paddingRight: "0",
  },
  sectionTitle: {
    paddingBottom: "20px",
  },
  positionSticky: {
    top: "7em",
    justifyContent: "center",
  },
  titleRoot: {
    paddingBottom: 5,
  },
  propertiesTitleRoot: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 5,
  },
  propertiesContentRoot: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  titleText: {
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
