export const outlineStyles = {
  outlineColor: "#52A8EC",
  outlineStyle: "solid",
  outlineWidth: "0px",
  outlineOffset: "-1px",
  boxShadow: "0 0 0 1px #52A8EC, 0 0 0 4px rgba(29,155,209,.3)"
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
      ...outlineStyles
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
      ...outlineStyles
    },
    top: 0,
    left: "0.5%",
    backgroundColor: "transparent",
    pointerEvents: "none"
  },
  focus: {}
};

export default styles;
