import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

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
    background: theme.colors.bgSurface,
    boxSizing: "border-box",
    border: `1px solid ${theme.colors.text}`,
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
    border: `1px solid ${theme.colors.text}`,

    "&:hover": {
      border: `1px solid ${theme.colors.text}`,
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
    color: theme.colors.textDisabled,
    border: `1px solid ${theme.colors.textDisabled}`,
    background: theme.colors.bgPage,
    "&:hover": {
      border: `1px solid ${theme.colors.textDisabled}`,
    },
  },
  headerReadOnly: {
    cursor: "not-allowed",
    pointerEvents: "none",
    color: theme.colors.textSubtle,
    border: `1px solid ${theme.colors.textDisabled}`,
    background: theme.colors.bgPage,
    userSelect: "text",
    "&:focus-visible": {
      outline: "none",
      border: `1px solid ${theme.colors.textDisabled}`,
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
    color: theme.colors.textSubtle,
  },
  panel: {
    position: "relative",

    backgroundColor: theme.colors.bgSurface,
    border: `1px solid ${theme.colors.text}`,
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
    backgroundColor: theme.colors.bgSurface,
    borderTop: "none",
    borderBottom: "none",
    borderRight: `1px solid ${theme.colors.text}`,
    borderLeft: `1px solid ${theme.colors.text}`,
  },
  inputExtensionLeftPosition: { marginLeft: "auto" },
  inputExtensionOpenShadow: {
    boxShadow: `0px 8px 0px ${theme.colors.bgSurface}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
  },
  inputExtensionFloatRight: { float: "right" },
  inputExtensionFloatLeft: { float: "left" },
});
