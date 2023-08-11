import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvCalendarWeekLabels",
  {
    calendarDay: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      height: "40px",
      width: "40px",
    },
  }
);
