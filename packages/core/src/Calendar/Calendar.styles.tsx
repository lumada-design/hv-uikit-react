import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvCalendar", {
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
          "& > div:nth-of-type(3)": {
            "& > div": {
              "& > div[data-calendar-cell='calendarCell']": {
                backgroundColor: theme.colors.bgSurface,
              },
            },
          },
        },
      },
    },
  },
  focusSelection: {},
  calendarMonthlyCell: {},
  calendarMonthlyCellSelected: {},
});
