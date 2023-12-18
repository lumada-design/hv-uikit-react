import { outlineStyles } from "../utils/focusUtils";
import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvFocus", {
  root: {},
  selected: {},
  disabled: {},
  focusDisabled: {
    outline: "none",
    "& *:focus": {
      outline: "none",
    },
    "& *": {
      outline: "none !important",
    },
  },
  focused: {
    ...outlineStyles,
    "@media (-webkit-min-device-pixel-ratio:0)": {
      ...outlineStyles,
    },
  },
  externalReference: {
    position: "relative",
  },
  falseFocus: {
    width: "98%",
    height: "98%",
    position: "absolute",
    zIndex: "1",
    ...outlineStyles,
    "@media (-webkit-min-device-pixel-ratio:0)": {
      ...outlineStyles,
    },
    top: 0,
    left: "0.5%",
    backgroundColor: "transparent",
    pointerEvents: "none",
  },
  focus: {},
});
