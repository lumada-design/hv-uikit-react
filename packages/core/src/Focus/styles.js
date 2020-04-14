import isBrowser from "../utils/browser";

export const outlineStyles = {
  outlineColor: "Highlight",
  outlineStyle: isBrowser(["ie", "edge"]) ? "solid" : "auto",
  outlineWidth: 4,
  outlineOffset: -2
};

const styles = {
  root: {},
  selected: {},
  disabled: {},
  focusDisabled: {
    outline: "none",
    "& *:focus": {
      outline: "none"
    },
    "& *": {
      outline: "none !important"
    }
  },
  focused: {
    ...outlineStyles,
    "@media (-webkit-min-device-pixel-ratio:0)": {
      outlineColor: "-webkit-focus-ring-color",
      outlineStyle: "auto",
      outlineOffset: -2
    }
  },
  externalReference: {
    position: "relative"
  },
  falseFocus: {
    width: "98%",
    height: "98%",
    position: "absolute",
    zIndex: "1",
    ...outlineStyles,
    "@media (-webkit-min-device-pixel-ratio:0)": {
      outlineColor: "-webkit-focus-ring-color",
      outlineStyle: "auto",
      outlineOffset: -2
    },
    top: 0,
    left: "0.5%",
    backgroundColor: "transparent",
    pointerEvents: "none"
  }
};

export default styles;
