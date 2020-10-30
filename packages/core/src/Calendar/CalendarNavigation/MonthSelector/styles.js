import { outlineStyles } from "../../../Focus/styles";

const styles = (theme) => {
  const hover = {
    backgroundColor: theme.palette.atmo3,
    cursor: "pointer",
  };

  return {
    focusSelection: {
      "&:hover": {
        ...hover,
      },
      "&:focus": {
        outline: "none",
      },
      "&.focus-visible": {
        ...hover,
        ...outlineStyles,
      },
    },
    calendarMonthlyGrid: {
      marginTop: "100px",
      marginLeft: "-20px",
      display: "flex",
      zIndex: "10",
      padding: "0 20px",
      position: "absolute",
      flexFlow: "wrap",
      alignContent: "center",
      justifyContent: "space-evenly",
      backgroundColor: theme.palette.atmo1,
    },
    calendarMonthlyCell: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      height: "40px",
      width: "92px",
      "&:hover": {
        ...hover,
      },
    },
    calendarMonthlyCellSelected: {
      backgroundColor: theme.palette.atmo3,
      color: theme.palette.acce1,
      "&:hover": {
        backgroundColor: theme.palette.atmo3,
        color: theme.palette.acce1,
      },
    },
    normalWidth: {},
    rangeModeWidth: {},
  };
};

export default styles;
