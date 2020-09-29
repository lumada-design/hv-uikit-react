import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    position: "relative",
    maxWidth: 310,
    minWidth: 310,
    background: theme.hv.palette.atmosphere.atmo1,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.accent.acce1}`,
    },
  },
  rootOpen: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: theme.hv.shadows[1],
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
      boxShadow: theme.hv.shadows[1],
    },
  },
  rootDisabled: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    background: theme.hv.palette.atmosphere.atmo4,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    },
    cursor: "not-allowed",
  },
  label: {
    ...theme.hv.typography.labelText,
    fontFamily: theme.hv.typography.fontFamily,
    marginBottom: theme.hv.spacing.xs + 1,
    display: "block",
  },
  header: {
    position: "relative",
    height: `${theme.hv.spacing.md}px`,
    cursor: "pointer",
    userSelect: "none",
    "&:focus": {
      ...outlineStyles,
    },
  },
  selection: {
    padding: `0 ${theme.hv.spacing.md}px 0 ${theme.hv.spacing.xs}px`,
    lineHeight: `${theme.hv.spacing.md}px`,
    pointerEvents: "none",
  },
  arrow: {
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
  },
  headerDisabled: {
    pointerEvents: "none",
    "&:hover": {
      cursor: "not-allowed",
    },
  },
  truncate: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  selectionDisabled: {
    ...theme.hv.typography.placeholderText,
    lineHeight: `${theme.hv.spacing.md}px`,
  },
  rootList: {},
  list: {},
});

export default styles;
