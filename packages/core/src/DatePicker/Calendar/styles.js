const styles = (theme) => {
  const hover = {
    backgroundColor: theme.palette.atmo4,
    cursor: "pointer",
  };

  return {
    calendarWrapper: {
      overflow: "hidden",
      backgroundColor: theme.palette.atmo1,
      padding: theme.hvSpacing("sm"),
    },
    calendarGrid: {
      display: "flex",
      flexFlow: "wrap",
      width: "280px",
    },
    navigationContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.hvSpacing("xs", 0),
    },
    focusSelection: {
      "&:hover": {
        ...hover,
      },
      "&:focus": {
        ...hover,
        outlineColor: "#52A8EC",
        outlineStyle: "solid",
        outlineWidth: "1px",
        outlineOffset: "-1px",
      },
    },
    navigationMonth: {
      minWidth: "160px",
    },
    calendarDay: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      height: "40px",
      width: "40px",
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
      color: theme.palette.atmo7,
    },
    calendarDateSelected: {
      backgroundColor: theme.palette.acce1,
      color: theme.palette.atmo1,
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
      backgroundColor: theme.palette.atmo1,
    },
    normalWidth: {
      width: "calc(100% - 2px)", // 2px for the borders.
    },
    rangeModeWidth: {
      width: "calc((100% / 2) - 2px)", // 100% divided by two to handle the range situation minus 2px for the borders.
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
      backgroundColor: theme.palette.acce1,
      color: theme.palette.atmo1,
      "&:hover": {
        backgroundColor: theme.palette.acce1,
        color: theme.palette.atmo1,
      },
    },
  };
};

export default styles;
