import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "components";
import { outlineStyles } from "utils";
import calendarCellClasses from "./calendarCellClasses";

const hover = {
  backgroundColor: theme.calendar.cellHoverColor,
  cursor: "pointer",
};

export const StyledCellContainer = styled("button")({
  cursor: "pointer",
  border: 0,
  padding: 0,
  margin: 0,
  backgroundColor: "transparent",
  [`&.${calendarCellClasses.focusSelection}`]: {
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
});

export const StyledCalendarDate = styled(HvTypography)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  height: "40px",
  width: "40px",
  [`&.${calendarCellClasses.calendarDateSelected}`]: {
    backgroundColor: theme.colors.atmo3,
    color: theme.colors.acce1,
    "&:hover": {
      ...hover,
    },
  },
  [`&.${calendarCellClasses.calendarDateNotInMonth}`]: {
    color: theme.colors.atmo5,
    cursor: "not-allowed",
  },
  [`&.${calendarCellClasses.calendarDateInSelectionRange}`]: {
    backgroundColor: theme.colors.atmo3,
  },
  [`&.${calendarCellClasses.calendarDateDisabled}`]: {
    color: theme.colors.atmo5,
    cursor: "no-drop",
  },
  [`&.${calendarCellClasses.startBookend}`]: {
    borderLeft: `1px solid ${theme.colors.acce1}`,
  },
  [`&.${calendarCellClasses.endBookend}`]: {
    borderRight: `1px solid ${theme.colors.acce1}`,
  },
});

export const StyledDateWrapper = styled("div")({
  width: "40px",
  height: "40px",
  [`& .${calendarCellClasses.cellsInRange}`]: {
    "&:focus": {
      outside: "none",
    },
  },
  [`& .${calendarCellClasses.cellsOutsideRange}`]: {
    "&:focus": {
      outside: "none",
    },
  },
});
