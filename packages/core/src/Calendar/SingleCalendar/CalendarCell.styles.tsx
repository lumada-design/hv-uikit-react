import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";

import { createClasses } from "@core/utils/classes";

const hover = {
  backgroundColor: theme.colors.containerBackgroundHover,
  cursor: "pointer",
};

export const { staticClasses, useClasses } = createClasses("HvCalendarCell", {
  cellContainer: {
    cursor: "pointer",
    border: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "transparent",
  },
  focusSelection: {
    "&:hover": {
      ...hover,
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      ...hover,
      ...outlineStyles,
    },
  },
  calendarDate: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    height: "40px",
    width: "40px",
  },
  calendarDateSelected: {
    backgroundColor: theme.colors.atmo3,
    color: theme.colors.secondary,
    "&:hover": {
      ...hover,
    },
  },
  calendarDateNotInMonth: {
    color: theme.colors.secondary_60,
    cursor: "not-allowed",
  },
  calendarDateInSelectionRange: {
    backgroundColor: theme.colors.atmo3,
  },
  calendarDateDisabled: {
    color: theme.colors.secondary_60,
    cursor: "no-drop",
  },
  startBookend: {
    borderLeft: `1px solid ${theme.colors.secondary}`,
  },
  endBookend: {
    borderRight: `1px solid ${theme.colors.secondary}`,
  },
  dateWrapper: {
    width: "40px",
    height: "40px",
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
});
