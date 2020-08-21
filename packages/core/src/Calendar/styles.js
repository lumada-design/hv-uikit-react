const styles = theme => {
  const hover = {
    backgroundColor: theme.palette.atmo3,
    cursor: "pointer"
  };

  return {
    calendarContainer: {
      backgroundColor: theme.palette.atmo1,
      width: "320px"
    },
    relativeWrapper: {
      position: "relative"
    },
    calendarWrapper: {
      overflow: "hidden",
      backgroundColor: theme.palette.atmo1,
      padding: theme.spacing("sm")
    },
    calendarGrid: {
      display: "flex",
      flexFlow: "wrap",
      width: "280px"
    },
    navigationContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: `${theme.spacing("xs")}px 0`
    },
    focusSelection: {
      "&:hover": {
        ...hover
      },
      "&:focus": {
        ...hover,
        outlineColor: "#52A8EC",
        outlineStyle: "solid",
        outlineWidth: "1px",
        outlineOffset: "-1px"
      }
    },
    navigationMonth: {
      minWidth: "160px"
    },
    calendarDay: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      height: "40px",
      width: "40px"
    },
    calendarDate: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      height: "40px",
      width: "40px"
    },
    calendarDateNotInMonth: {
      color: theme.palette.atmo5
    },
    calendarSelection: {
      // backgroundColor: "red"
    },
    calendarDateSelected: {
      // backgroundColor: theme.palette.atmo3,
      backgroundColor: "red",
      color: theme.palette.acce1,
      "&:hover": {
        ...hover
      }
    },
    calendarDateInvalid: {
      "&:hover": {
        cursor: "not-allowed",
        backgroundColor: "transparent"
      }
    },
    calendarDateInSelectionRange: {
      backgroundColor: theme.palette.atmo3
    },
    calendarDateDisabled: {
      // backgroundColor: "red",
      color: theme.palette.atmo5,
      cursor: "no-drop"
    },
    calendarMonthlyGrid: {
      top: "0",
      height: "calc(100% - 120px)",
      marginTop: "100px",
      marginLeft: "-20px",
      display: "flex",
      zIndex: "10",
      padding: "0 20px",
      position: "absolute",
      flexFlow: "wrap",
      alignContent: "center",
      justifyContent: "space-evenly",
      backgroundColor: "#FFFFFF"
    },
    normalWidth: {
      width: "calc(100% - 2px)" // 2px for the borders.
    },
    rangeModeWidth: {
      width: "calc((100% / 2) - 2px)" // 100% divided by two to handle the range situation minus 2px for the borders.
    },
    calendarMonthlyCell: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      height: "40px",
      width: "92px",
      "&:hover": {
        ...hover
      }
    },
    calendarMonthlyCellSelected: {
      backgroundColor: theme.palette.acce1,
      color: theme.palette.atmo1,
      "&:hover": {
        backgroundColor: theme.palette.atmo3,
        color: theme.palette.atmo1
      }
    },
    startBookend: {
      borderLeft: `1px solid ${theme.palette.acce1}`
    },
    endBookend: {
      borderRight: `1px solid ${theme.palette.acce1}`
    }
  };
};

export default styles;
