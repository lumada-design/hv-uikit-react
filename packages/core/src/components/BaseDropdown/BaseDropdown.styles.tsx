import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";
import { createClasses } from "@core/utils/classes";

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
    border: `1px solid ${theme.baseDropdown.borderColor}`,
    borderRadius: theme.radii.base,
    "&:hover": {
      border: `1px solid ${theme.baseDropdown.hoverBorderColor}`,
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...outlineStyles,
      border: `1px solid ${theme.baseDropdown.hoverBorderColor}`,
    },
  },
  headerOpen: {
    border: `1px solid ${theme.baseDropdown.openBorderColor}`,
    boxShadow: theme.baseDropdown.shadow,
    "&:hover": {
      border: `1px solid ${theme.baseDropdown.openBorderColor}`,
      boxShadow: theme.baseDropdown.shadow,
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
    border: `1px solid ${theme.baseDropdown.disabledBorderColor}`,
    background: theme.baseDropdown.disabledBackgroundColor,
    "&:hover": {
      border: `1px solid ${theme.baseDropdown.disabledBorderColor}`,
    },
  },
  headerReadOnly: {
    cursor: "not-allowed",
    pointerEvents: "none",
    border: theme.baseDropdown.readOnlyBorder,
    background: theme.baseDropdown.readOnlyBackgroundColor,
    userSelect: "text",
    "&:focus-visible": {
      outline: "none",
      border: theme.baseDropdown.readOnlyBorder,
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
  },
  placeholder: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...theme.typography.body,
    color: theme.baseDropdown.placeholderColor,
  },
  selectionDisabled: { color: theme.colors.secondary_60 },
  panel: {
    position: "relative",
    boxShadow: theme.baseDropdown.shadow,
    backgroundColor: theme.colors.atmo1,
    border: `1px solid ${theme.baseDropdown.openBorderColor}`,
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
    height: theme.dropDownMenu.extensionHeight,
    backgroundColor: theme.colors.atmo1,
    borderTop: "none",
    borderBottom: "none",
    borderRight: `1px solid ${theme.dropDownMenu.extensionBorderColor}`,
    borderLeft: `1px solid ${theme.dropDownMenu.extensionBorderColor}`,
  },
  inputExtensionLeftPosition: { marginLeft: "auto" },
  inputExtensionOpenShadow: {
    boxShadow: `0px 8px 0px ${theme.colors.atmo1}, 0px 0px 9px 0px rgba(65,65,65,.12)`,
  },
  inputExtensionFloatRight: { float: "right" },
  inputExtensionFloatLeft: { float: "left" },
});
