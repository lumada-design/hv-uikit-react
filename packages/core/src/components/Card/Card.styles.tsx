import { CSSInterpolation } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";
import { outlineStyles } from "utils/focusUtils";

export const createClasses = (
  css: (...args: CSSInterpolation[]) => string
) => ({
  root: css({
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
  }),
  selected: css({
    outline: `1px solid ${theme.colors.secondary}`,
    "&:hover": {
      outline: `1px solid ${theme.colors.secondary}`,
    },
    "&:focus": {
      outline: `1px solid ${theme.colors.secondary}`,
    },
  }),
  selectable: css({
    "&:hover": {
      outline: `1px solid ${theme.card.hoverColor}`,
    },
  }),
  semanticContainer: css({
    position: "relative",
    "& > *": {
      position: "absolute",
      zIndex: 1,
    },
  }),
  icon: css({
    top: `calc(${theme.card.iconMargin} + ${theme.space.xs})`,
    right: `calc(${theme.card.iconMargin} + ${theme.space.xs})`,
  }),
  semanticBar: css({
    width: "100%",
    top: -1,
    right: 0,
  }),
});
