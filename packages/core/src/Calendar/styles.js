const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  rangeCalendarContainer: {
    display: "flex",
  },
  singleCalendar: {
    "&:hover": {
      "& ~ $singleCalendar": {
        // target the next calendar when the former is hovered
        "& > div": {
          "& > div:nth-child(3)": {
            "& > div": {
              "& > div[data-calendar-cell='calendarCell']": {
                backgroundColor: theme.palette.atmo1,
              },
            },
          },
        },
      },
    },
  },
});

export default styles;
