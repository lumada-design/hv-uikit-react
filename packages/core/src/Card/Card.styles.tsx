import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvCard", {
  root: {
    overflow: "visible",
    position: "relative",
    outline: `1px solid ${theme.colors.border}`,
    borderRadius: `0px 0px ${theme.radii.round} ${theme.radii.round}`,
    backgroundColor: "var(--bg-color)",
    "&:focus-visible": {
      ...outlineStyles,
    },
    "&:focus": {
      outline: "none",
    },
  },
  selected: {
    "&,&:hover,&:focus": {
      outlineColor: theme.colors.text,
    },
  },
  selectable: {
    "&:hover": {
      outlineColor: theme.colors.primary,
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
    backgroundColor: "var(--bar-color)",
    height: "var(--bar-height)",
    width: "100%",
    top: -1,
    right: 0,
  },
});
