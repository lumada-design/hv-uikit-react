import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../../utils/focusUtils";

const hover = {
  backgroundColor: theme.colors.bgHover,
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
    backgroundColor: theme.colors.bgActive,
    color: theme.colors.text,
    "&:hover": {
      ...hover,
    },
  },
  calendarDateNotInMonth: {
    color: theme.colors.textDisabled,
    cursor: "not-allowed",
  },
  calendarDateInSelectionRange: {
    backgroundColor: theme.colors.bgActive,
  },
  calendarDateDisabled: {
    color: theme.colors.textDisabled,
    cursor: "no-drop",
  },
  startBookend: {
    borderLeft: `1px solid ${theme.colors.text}`,
  },
  endBookend: {
    borderRight: `1px solid ${theme.colors.text}`,
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
