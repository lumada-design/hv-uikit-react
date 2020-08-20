import { outlineStyles } from "../../Focus/styles";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  icon: {
    userSelect: "none",
    width: "30px",
    height: "30px",
    "&:hover": {
      backgroundColor: theme.palette.atmo3,
      cursor: "pointer"
    },
    "&:focus": {
      backgroundColor: theme.palette.atmo3,
      cursor: "pointer",
      ...outlineStyles
    }
  },
  disabled: {
    "& svg *.color0": {
      fill: theme.palette.atmo5
    },
    "&:hover": {
      backgroundColor: "transparent",
      cursor: "not-allowed"
    }
  },
  text: {
    width: "calc(100% - 60px)",
    textAlign: "center",
    padding: "5px 0",
    "&:hover": {
      backgroundColor: theme.palette.atmo3,
      cursor: "pointer"
    },
    "&:focus": {
      backgroundColor: theme.palette.atmo3,
      cursor: "pointer",
      ...outlineStyles
    }
  },
  textWithoutHover: {
    width: "calc(100% - 60px)",
    textAlign: "center",
    padding: "0 5px"
  }
});

export default styles;
