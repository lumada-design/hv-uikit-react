const styles = theme => {
  const hover = {
    backgroundColor: theme.palette.atmo3,
    cursor: "pointer"
  };

  return {
    calendarContainer: {
      backgroundColor: theme.palette.atmo1,
      width: "320px",
      minHeight: "435px"
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
      width: "280px",
      "& $cellsInRange": {
        backgroundColor: theme.palette.atmo1,
        "& $startBookend": {
          borderLeft: `1px solid ${theme.palette.acce1}`,
          backgroundColor: theme.palette.atmo3,
          borderRight: `1px solid ${theme.palette.acce1}`,
          "&:hover": {
            borderRight: `1px solid ${theme.palette.acce1}`
          }
        }
      },
      "&:hover $cellsInRange": {
        backgroundColor: theme.palette.atmo3,
        "& $startBookend": {
          borderLeft: `1px solid ${theme.palette.acce1}`,
          borderRight: "inherit"
        }
      },
      "& $cellsInRange:hover": {
        backgroundColor: theme.palette.atmo3,
        "& $calendarDate": {
          borderRight: `1px solid ${theme.palette.acce1}`
        }
      },
      "& $cellsInRange:hover ~ $cellsInRange": {
        backgroundColor: theme.palette.atmo1 // controls the right side of the hovered range
      },
      "& $cellsOutsideRange:hover ~ $cellsInRange": {
        backgroundColor: theme.palette.atmo1,
        "& $startBookend": {
          borderRight: `1px solid ${theme.palette.acce1}`
        }
      }
    },
    navigationContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: `${theme.spacing("xs")}px 0`
    },
    cellContainer: {
      cursor: "pointer"
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
    calendarDateSelected: {
      backgroundColor: theme.palette.atmo3,
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
      color: theme.palette.atmo5,
      cursor: "no-drop"
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
      backgroundColor: theme.palette.atmo1
    },
    normalWidth: {
      width: "calc(100% - 2px)" // 2px for the borders.
    },
    rangeModeWidth: {
      width: "calc(100% - 2px)"
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
    },
    cellsInRange: {},
    cellsOutsideRange: {}
  };
};

export default styles;
