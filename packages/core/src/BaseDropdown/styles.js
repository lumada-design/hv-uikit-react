import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    width: "100%",
    position: "relative",
  },
  anchor: {
    display: "inline-block",
    width: "100%",
  },
  rootDisabled: {
    cursor: "not-allowed",
    "&:focus": {
      outline: "none",
    },
  },
  container: {
    zIndex: theme.zIndex.tooltip,
  },
  containedPopper: {
    width: "100%",
  },
  header: {
    cursor: "pointer",
    userSelect: "none",
    position: "relative",
    background: theme.hv.palette.atmosphere.atmo1,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.accent.acce1}`,
    },
    borderRadius: "2px",
    "&:focus": {
      outline: "none",
    },
    "&.focus-visible": {
      ...outlineStyles,
      border: `1px solid ${theme.hv.palette.accent.acce1}`,
    },
  },
  headerOpen: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: theme.hv.shadows[1],
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
      boxShadow: theme.hv.shadows[1],
    },
  },
  headerOpenUp: {
    borderRadius: "0px 0px 2px 2px",
  },
  headerOpenDown: {
    borderRadius: "2px 2px 0px 0px",
  },
  headerDisabled: {
    pointerEvents: "none",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    background: theme.hv.palette.atmosphere.atmo3,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    },
    cursor: "not-allowed",
  },
  headerReadOnly: {
    cursor: "not-allowed",
    pointerEvents: "none",
    border: "none",
    userSelect: "text",
    "&:focus-visible": {
      outline: "none",
      border: "none",
    },
  },
  arrow: {
    position: "absolute",
    pointerEvents: "none",
    top: -1,
    right: -1,
  },
  selection: {
    display: "flex",
    alignItems: "center",
    height: theme.hv.spacing.md,
    padding: theme.hvSpacing(0, "md", 0, "xs"),
  },
  placeholder: {
    display: "block",
  },
  selectionDisabled: {
    ...theme.hv.typography.placeholderText,
  },
  panel: {
    position: "relative",
    boxShadow: theme.hv.shadows[1],
  },
  inputExtensionOpen: {
    height: theme.hv.spacing.xs,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
  },
  inputExtensionLeftPosition: {
    marginLeft: "auto",
  },
  inputExtensionOpenShadow: {
    boxShadow: `0px 8px 0px ${theme.hv.palette.atmosphere.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
  },
  inputExtensionFloatRight: {
    float: "left",
  },
  inputExtensionFloatLeft: {
    float: "right",
  },
});

export default styles;
