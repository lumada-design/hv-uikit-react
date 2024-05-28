import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvSingleCalendar", {
  calendarContainer: {
    width: "318px",
    minHeight: "440px",
    position: "relative",
  },
  calendarWrapper: {
    overflow: "hidden",
    backgroundColor: theme.colors.bgSurface,
    padding: theme.spacing("sm"),
  },
  calendarGrid: {
    display: "flex",
    flexFlow: "wrap",
    width: "280px",
    "& $cellsInRange": {
      backgroundColor: theme.colors.bgAction,
      "& $startBookend": {
        borderLeft: `1px solid ${theme.colors.text}`,
        backgroundColor: theme.colors.bgAction,
        "&:hover": {
          borderRight: `1px solid ${theme.colors.text}`,
        },
      },
    },
    "&:hover $cellsInRange": {
      backgroundColor: theme.colors.bgAction,
      "& $startBookend": {
        borderLeft: `1px solid ${theme.colors.text}`,
        borderRight: "inherit",
      },
    },
    "& $cellsInRange:hover": {
      backgroundColor: theme.colors.bgAction,
      "& $calendarDate": {
        borderRight: `1px solid ${theme.colors.text}`,
      },
    },
    "& $cellsInRange:hover ~ $cellsInRange": {
      backgroundColor: theme.colors.bgSurface, // controls the right side of the hovered range
    },
    "& $cellsOutsideRange:hover ~ $cellsInRange": {
      backgroundColor: theme.colors.bgSurface, // control the right side when hovering outside of the range
    },
  },
  calendarDay: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    height: "40px",
    width: "40px",
  },
  navigationContainer: {},
  focusSelection: {},
  navigationMonth: {},
  calendarDate: {},
  calendarDateNotInMonth: {},
  calendarDateSelected: {},
  calendarDateInvalid: {},
  calendarDateInSelectionRange: {},
  startBookend: {},
  endBookend: {},
  cellsInRange: {
    backgroundColor: theme.colors.bgAction,
  },
  cellsOutsideRange: {},
  cellContainer: {},
});
