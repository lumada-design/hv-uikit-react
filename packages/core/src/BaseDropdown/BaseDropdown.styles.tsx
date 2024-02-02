import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

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
  header: {},
  headerOpen: {},
  headerOpenUp: {},
  headerOpenDown: {},
  headerDisabled: {},
  headerReadOnly: {},
  arrowContainer: {},
  arrow: {},
  selection: {},
  placeholder: {},
  panel: {
    // unset HvPanel's padding as children are already setting it
    padding: 0,
  },
  panelOpenedUp: {},
  panelOpenedDown: {},
  inputExtensionOpen: {},
  inputExtensionLeftPosition: {},
  inputExtensionOpenShadow: {},
  inputExtensionFloatRight: {},
  inputExtensionFloatLeft: {},
});
