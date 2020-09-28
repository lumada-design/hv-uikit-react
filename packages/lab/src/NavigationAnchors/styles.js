const styles = (theme) => ({
  drawerPaper: {
    width: 200,
    marginLeft: `${theme.hv.spacing.xs}px`,
    background: "none",
    borderRight: "none",
  },
  drawerPaperPositionInherit: {
    position: "inherit",
  },
  listRoot: {
    borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
  },
  listDense: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemRoot: {
    minHeight: 32,
    background: "none",
    marginBottom: "8px",
    "&:last-child": {
      marginBottom: "0",
    },
    "&:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`,
    },
    "&$listItemSelected": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`,
    },
    "&$listItemSelected:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`,
    },
  },
  listItemGutters: {
    "@media (min-width: 600px)": {
      padding: `0 ${theme.hv.spacing.xs}px`,
    },
  },
  listItemSelected: {
    left: "-1px",
    borderLeft: `4px solid ${theme.hv.palette.accent.acce1}`,
    "@media (min-width: 600px)": {
      paddingLeft: 7,
    },
  },
  listItemTextDense: {
    fontSize: theme.hv.typography.normalText.fontSize,
    fontWeight: "inherit",
  },
  listItemTextSelected: {
    ...theme.hv.typography.highlightText,
  },
});

export default styles;
