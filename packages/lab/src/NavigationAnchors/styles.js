const styles = (theme) => ({
  root: {
    width: 200,
  },

  listItemGutters: {
    padding: `0 ${theme.hv.spacing.sm}px`,
  },
  listItemSelected: {
    fontWeight: theme.hv.typography.highlightText.fontWeight,
    borderLeft: `2px solid ${theme.hv.palette.accent.acce1}`,
    paddingLeft: theme.hv.spacing.sm - 2,
  },
});

export default styles;
