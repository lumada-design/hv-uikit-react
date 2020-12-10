import { outlineStyles } from "../../Focus/styles";

const styles = (theme) => {
  const hover = {
    backgroundColor: theme.palette.atmo3,
    cursor: "pointer",
  };

  return {
    calendarContainer: {
      backgroundColor: theme.palette.atmo1,
      width: "320px",
      minHeight: "440px",
      position: "relative",
    },
    calendarWrapper: {
      overflow: "hidden",
      backgroundColor: theme.palette.atmo1,
      padding: theme.hvSpacing("sm"),
    },
    calendarGrid: {
      display: "flex",
      flexFlow: "wrap",
      width: "280px",
      "& $cellsInRange": {
        backgroundColor: theme.palette.atmo3,
        "& $startBookend": {
          borderLeft: `1px solid ${theme.palette.acce1}`,
          backgroundColor: theme.palette.atmo3,
          "&:hover": {
            borderRight: `1px solid ${theme.palette.acce1}`,
          },
        },
      },
      "&:hover $cellsInRange": {
        backgroundColor: theme.palette.atmo3,
        "& $startBookend": {
          borderLeft: `1px solid ${theme.palette.acce1}`,
          borderRight: "inherit",
        },
      },
      "& $cellsInRange:hover": {
        backgroundColor: theme.palette.atmo3,
        "& $calendarDate": {
          borderRight: `1px solid ${theme.palette.acce1}`,
        },
      },
      "& $cellsInRange:hover ~ $cellsInRange": {
        backgroundColor: theme.palette.atmo1, // controls the right side of the hovered range
      },
      "& $cellsOutsideRange:hover ~ $cellsInRange": {
        backgroundColor: theme.palette.atmo1, // control the right side when hovering outside of the range
      },
    },
    navigationContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: `${theme.hvSpacing("xs")}px 0`,
    },
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
    navigationMonth: {
      minWidth: "160px",
    },

    // HvCalendarCell styles
    cellContainer: {
      cursor: "pointer",
      border: 0,
      padding: 0,
      margin: 0,
      backgroundColor: "transparent",
    },
    dateWrapper: {
      width: "40px",
      height: "40px",
    },
    calendarDate: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      height: "40px",
      width: "40px",
    },
    calendarDateNotInMonth: {
      color: theme.palette.atmo5,
      cursor: "not-allowed",
    },
    calendarDateSelected: {
      backgroundColor: theme.palette.atmo3,
      color: theme.palette.acce1,
      "&:hover": {
        ...hover,
      },
    },
    calendarDateInvalid: {
      "&:hover": {
        cursor: "not-allowed",
        backgroundColor: "transparent",
      },
    },
    calendarDateInSelectionRange: {
      backgroundColor: theme.palette.atmo3,
    },
    calendarDateDisabled: {
      color: theme.palette.atmo5,
      cursor: "no-drop",
    },
    calendarMonthlyGrid: {
      top: "-15px",
      height: "calc(100% - 85px)",
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
    startBookend: {
      borderLeft: `1px solid ${theme.palette.acce1}`,
    },
    endBookend: {
      borderRight: `1px solid ${theme.palette.acce1}`,
    },
    cellsInRange: {
      "&:focus": {
        outside: "none",
      },
    },
    cellsOutsideRange: {
      "&:focus": {
        outside: "none",
      },
    },
  };
};

export default styles;
