import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";
import { outlineStyles } from "@core/utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvTreeItem", {
  /** Applied to the root element */
  root: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    outline: 0,
  },
  group: {
    margin: 0,
    padding: 0,
    marginLeft: theme.space.sm,
  },

  content: {
    padding: theme.spacing(0, 1),
    minHeight: 32, // TODO: review

    width: "100%",
    boxSizing: "border-box", // prevent width + padding to overflow
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    "&:hover:not($disabled)": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
  },
  expanded: {},
  selected: {
    backgroundColor: theme.colors.atmo3,
  },
  focused: {
    backgroundColor: theme.colors.containerBackgroundHover,
    "&:focus-visible": {
      ...outlineStyles,
    },
  },
  disabled: {
    cursor: "not-allowed",
    color: theme.colors.secondary_60,
    "& $label": {
      color: theme.colors.secondary_60,
    },
  },
  label: {
    paddingLeft: 4,
    width: "100%",
    boxSizing: "border-box",

    // fixes overflow
    minWidth: 0,
    position: "relative",
    ...theme.typography.body,
  },
  iconContainer: {
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",

    width: 16, // TODO: review
    marginRight: 4,
  },
});
