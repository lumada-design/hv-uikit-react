import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

export const { useClasses, staticClasses } = createClasses("HvBaseDropdown", {
  root: { width: "100%", position: "relative" },
  rootDisabled: {
    cursor: "not-allowed",
    "&:focus": {
      outline: "none",
    },
  },
  anchor: { display: "inline-block", width: "100%" },
  container: { zIndex: theme.zIndices.popover, width: "auto" },
  header: {
    cursor: "pointer",
    userSelect: "none",
    position: "relative",
    background: theme.colors.atmo1,
    boxSizing: "border-box",
    border: `1px solid ${theme.colors.secondary}`,
    borderRadius: theme.radii.base,
    "&:hover": {
      border: `1px solid ${theme.colors.primary}`,
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
      border: `1px solid ${theme.colors.primary}`,
    },
  },
  headerOpen: {
    border: `1px solid ${theme.colors.secondary}`,

    "&:hover": {
      border: `1px solid ${theme.colors.secondary}`,
    },
  },
  headerOpenUp: {
    borderRadius: `0px 0px ${theme.radii.base} ${theme.radii.base}`,
  },
  headerOpenDown: {
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0px 0px`,
  },
  headerDisabled: {
    cursor: "not-allowed",
    pointerEvents: "none",
    color: theme.colors.secondary_60,
    border: `1px solid ${theme.colors.secondary_60}`,
    background: theme.colors.atmo2,
    "&:hover": {
      border: `1px solid ${theme.colors.secondary_60}`,
    },
  },
  headerReadOnly: {
    cursor: "not-allowed",
    pointerEvents: "none",
    color: theme.colors.secondary_80,
    border: `1px solid ${theme.colors.secondary_60}`,
    background: theme.colors.atmo2,
    userSelect: "text",
    "&:focus-visible": {
      outline: "none",
      border: `1px solid ${theme.colors.secondary_60}`,
    },
  },
  arrowContainer: {
    position: "absolute",
    pointerEvents: "none",
    top: -1,
    right: -1,
  },
  arrow: {},
  selection: {
    display: "flex",
    alignItems: "center",
    height: "30px",
    boxSizing: "border-box",
    paddingLeft: theme.space.xs,
    paddingRight: theme.sizes.sm,
    color: "inherit",
  },
  selectionDisabled: {},
  placeholder: {
    display: "block",
    color: theme.colors.secondary_80,
  },
  panel: {
    position: "relative",

    backgroundColor: theme.colors.atmo1,
    border: `1px solid ${theme.colors.secondary}`,
  },
  panelOpenedUp: {
    top: 1,
    borderRadius: `${theme.radii.base} ${theme.radii.base} 0 0`,
  },
  panelOpenedDown: {
    top: -1,
    borderRadius: `0 0 ${theme.radii.base} ${theme.radii.base}`,
  },
  inputExtensionOpen: {
    height: "0px",
    backgroundColor: theme.colors.atmo1,
    borderTop: "none",
    borderBottom: "none",
    borderRight: `1px solid ${theme.colors.secondary}`,
    borderLeft: `1px solid ${theme.colors.secondary}`,
  },
  inputExtensionLeftPosition: { marginLeft: "auto" },
  inputExtensionOpenShadow: {
    boxShadow: `0px 8px 0px ${theme.colors.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
  },
  inputExtensionFloatRight: { float: "right" },
  inputExtensionFloatLeft: { float: "left" },
});
