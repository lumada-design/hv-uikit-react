import { outlineStyles } from "../../../Focus/styles";

const styles = (theme) => ({
  root: {
    padding: "10px 0",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "32px",
    cursor: "pointer",
    borderBottom: `2px solid transparent`,
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
    "&:focus": {
      outline: "none",
    },
    "&.focus-visible": {
      ...outlineStyles,
    },
  },
  text: {
    height: "32px",
    padding: "8px 10px",
    borderBottom: `2px solid transparent`,
    maxWidth: "180px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  selected: {
    borderBottom: `2px solid ${theme.hv.palette.accent.acce1}`,
  },
});

export default styles;
