import { getClasses } from "utils";

export type HvCalendarCellClasses = {
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
};

const classKeys: string[] = [
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

const calendarCellClasses = getClasses<HvCalendarCellClasses>(
  classKeys,
  "HvSingleCalendar"
);

export default calendarCellClasses;
