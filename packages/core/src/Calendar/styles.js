const styles = theme => ({
  rangeCalendarContainer: {
    display: "flex"
  },
  singleCalendar: {
    "&:hover": {
      "& ~ $singleCalendar": {
        // target the next calendar when the former is hovered
        "& > div": {
          "& > div:nth-child(3)": {
            "& > div": {
              backgroundColor: theme.palette.atmo1
            }
          }
        }
      }
    }
  }
});

export default styles;
