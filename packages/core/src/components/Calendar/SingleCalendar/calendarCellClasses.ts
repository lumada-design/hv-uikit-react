import { getClasses } from "@core/utils";

export interface HvCalendarCellClasses {
  cellContainer?: string;
  focusSelection?: string;
  calendarDate?: string;
  calendarDateSelected?: string;
  calendarDateNotInMonth?: string;
  calendarDateInSelectionRange?: string;
  calendarDateDisabled?: string;
  startBookend?: string;
  endBookend?: string;
  dateWrapper?: string;
  cellsInRange?: string;
  cellsOutsideRange?: string;
}

const classKeys: (keyof HvCalendarCellClasses)[] = [
  "cellContainer",
  "focusSelection",
  "calendarDate",
  "calendarDateSelected",
  "calendarDateNotInMonth",
  "calendarDateInSelectionRange",
  "calendarDateDisabled",
  "startBookend",
  "endBookend",
  "dateWrapper",
  "cellsInRange",
  "cellsOutsideRange",
];

const calendarCellClasses = getClasses(classKeys, "HvSingleCalendar");

export default calendarCellClasses;
