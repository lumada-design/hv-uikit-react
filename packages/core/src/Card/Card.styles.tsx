import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";
import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvCard", {
  root: {
    overflow: "visible",
    position: "relative",
    outline: `1px solid ${theme.colors.borderDivider}`,
    borderRadius: `0px 0px ${theme.radii.round} ${theme.radii.round}`,
    "&:focus-visible": {
      ...outlineStyles,
    },
    "&:focus": {
      outline: "none",
    },
  },
  selected: {
    outline: `1px solid ${theme.colors.text}`,
    "&:hover": {
      outline: `1px solid ${theme.colors.text}`,
    },
    "&:focus": {
      outline: `1px solid ${theme.colors.text}`,
    },
  },
  selectable: {
    "&:hover": {
      outline: `1px solid ${theme.colors.primary}`,
    },
  },
  semanticContainer: {
    position: "relative",
    "& > *": {
      position: "absolute",
      zIndex: 1,
    },
  },
  icon: {
    top: theme.space.xs,
    right: theme.space.xs,
  },
  semanticBar: {
    width: "100%",
    top: -1,
    right: 0,
  },
});
