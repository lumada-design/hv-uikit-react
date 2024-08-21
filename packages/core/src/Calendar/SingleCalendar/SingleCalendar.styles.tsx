import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvSingleCalendar", {
  root: {
    overflow: "hidden",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    "& $cellsInRange": {
      backgroundColor: theme.colors.atmo3,
      "& $startBookend": {
        borderLeft: `1px solid ${theme.colors.secondary}`,
        backgroundColor: theme.colors.atmo3,
        "&:hover": {
          borderRight: `1px solid ${theme.colors.secondary}`,
        },
      },
    },
    "&:hover $cellsInRange": {
      backgroundColor: theme.colors.atmo3,
      "& $startBookend": {
        borderLeft: `1px solid ${theme.colors.secondary}`,
        borderRight: "inherit",
      },
    },
    "& $cellsInRange:hover": {
      backgroundColor: theme.colors.atmo3,
      "& $calendarDate": {
        borderRight: `1px solid ${theme.colors.secondary}`,
      },
    },
    "& $cellsInRange:hover ~ $cellsInRange": {
      backgroundColor: theme.colors.atmo1, // controls the right side of the hovered range
    },
    "& $cellsOutsideRange:hover ~ $cellsInRange": {
      backgroundColor: theme.colors.atmo1, // control the right side when hovering outside of the range
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
    backgroundColor: theme.colors.atmo3,
  },
  cellsOutsideRange: {},
  cellContainer: {},
});
