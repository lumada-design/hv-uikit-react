import { getClasses } from "~/utils";

export interface HvSingleCalendarClasses {
  calendarContainer?: string;
  calendarWrapper?: string;
  calendarGrid?: string;
  navigationContainer?: string;
  focusSelection?: string;
  navigationMonth?: string;
  calendarDate?: string;
  calendarDateNotInMonth?: string;
  calendarDateSelected?: string;
  calendarDateInvalid?: string;
  calendarDateInSelectionRange?: string;
  startBookend?: string;
  endBookend?: string;
  cellsInRange?: string;
  cellsOutsideRange?: string;
  cellContainer?: string;
}

const classKeys: string[] = [
  "calendarContainer",
  "calendarWrapper",
  "calendarGrid",
  "navigationContainer",
  "focusSelection",
  "navigationMonth",
  "calendarDate",
  "calendarDateNotInMonth",
  "calendarDateSelected",
  "calendarDateInvalid",
  "calendarDateInSelectionRange",
  "startBookend",
  "endBookend",
  "cellsInRange",
  "cellsOutsideRange",
  "cellContainer",
];

const singleCalendarClasses = getClasses<HvSingleCalendarClasses>(
  classKeys,
  "HvSingleCalendar"
);

export default singleCalendarClasses;
