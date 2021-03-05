const styles = (theme) => ({
  root: {
    width: "100%",
    borderRadius: 2,
    position: "relative",
    display: "inline-block",
    "& $selectionDisabled": {
      color: theme.palette.atmo5,
    },
  },
  dropdown: {
    width: "100%",
  },
  rootList: {},
  arrow: {},

  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    paddingBottom: "6px",
    display: "block",
  },
  description: {},
  error: {},

  placeholder: {
    display: "block",
  },
  selectionDisabled: {
    lineHeight: theme.hv.spacing.md,
  },
});

export default styles;
