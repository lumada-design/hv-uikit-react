import { outlineStyles } from "../../Focus/styles";

const styles = {
  root: {},
  icon: {
    width: 32,
    height: 32
  },
  adornment: {
    backgroundColor: "transparent",
    border: "none",
    padding: 0,
    margin: 0,
    cursor: "pointer"
  },
  adornmentButton: {
    cursor: "pointer",
    "&:focus": {
      ...outlineStyles
    }
  },
  adornmentIcon: {
    cursor: "default"
  },
  hideIcon: {
    display: "none"
  }
};

export default styles;
