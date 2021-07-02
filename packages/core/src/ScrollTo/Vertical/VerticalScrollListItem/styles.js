import { outlineStyles } from "../../../Focus/styles";

const styles = (theme) => ({
  root: {
    padding: "0",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "32px",
    width: "32px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      "& $notSelected": {
        height: "10px",
        width: "10px",
      },
    },
    "&:focus": {
      outline: "none",
    },
    "&.focus-visible": {
      ...outlineStyles,
    },
  },
  notSelected: {
    height: "6px",
    width: "6px",
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
  },
  text: {
    height: "32px",
    width: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
