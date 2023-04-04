import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "~/utils/focusUtils";

export const styles: { [key: string]: CSSInterpolation } = {
  root: {
    overflow: "visible",
    position: "relative",
    outline: theme.card.outline,
    borderRadius: theme.card.borderRadius,
    "&.focus-visible": {
      ...outlineStyles,
    },
    "&:focus": {
      outline: "none",
    },
  },
  selected: {
    outline: `1px solid ${theme.colors.secondary}`,
    "&:hover": {
      outline: `1px solid ${theme.colors.secondary}`,
    },
    "&:focus": {
      outline: `1px solid ${theme.colors.secondary}`,
    },
  },
  selectable: {
    "&:hover": {
      outline: `1px solid ${theme.card.hoverColor}`,
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
    top: `calc(${theme.card.iconMargin} + ${theme.space.xs})`,
    right: `calc(${theme.card.iconMargin} + ${theme.space.xs})`,
  },
  semanticBar: {
    width: "100%",
    top: -1,
    right: 0,
  },
};
