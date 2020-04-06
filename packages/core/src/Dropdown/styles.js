const styles = theme => ({
  root: {
    position: "relative",
    maxWidth: 310,
    minWidth: 310,
    background: theme.hv.palette.atmosphere.atmo1,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.accent.acce1}`
    }
  },
  rootOpen: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: `0 2px 12px rgba(65,65,65,.12)`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
      boxShadow: `0 2px 12px rgba(65,65,65,.12)`
    }
  },
  rootDisabled: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    background: theme.hv.palette.atmosphere.atmo4,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
    }
  },
  label: {
    ...theme.hv.typography.labelText,
    fontFamily: theme.hv.typography.fontFamily,
    marginBottom: `${theme.hv.spacing.xs}px`,
    display: "block"
  },
  header: {
    position: "relative",
    height: `${theme.hv.spacing.md}px`,
    cursor: "pointer",
    userSelect: "none"
  },
  selection: {
    padding: `0 ${theme.hv.spacing.md}px 0 ${theme.hv.spacing.xs}px`,
    lineHeight: `${theme.hv.spacing.md}px`,
    pointerEvents: "none"
  },
  arrow: {
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    right: 0,
    width: 30,
    height: 30
  },
  headerDisabled: {
    "&:hover": {
      cursor: "not-allowed"
    }
  },
  truncate: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  selectionDisabled: {
    ...theme.hv.typography.placeholderText,
    lineHeight: `${theme.hv.spacing.md}px`
  },
  rootList: {},
  list: {}
});

export default styles;
