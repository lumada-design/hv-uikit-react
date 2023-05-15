import { getClasses } from "@core/utils";

export interface HvCalendarClasses {
  root?: string;
  rangeCalendarContainer?: string;
  singleCalendar?: string;
  focusSelection?: string;
  calendarMonthlyCell?: string;
  calendarMonthlyCellSelected?: string;
}

const classKeys: (keyof HvCalendarClasses)[] = [
  "root",
  "rangeCalendarContainer",
  "singleCalendar",
  "focusSelection",
  "calendarMonthlyCell",
  "calendarMonthlyCellSelected",
];

const calendarClasses = getClasses(classKeys, "HvCalendar");

export default calendarClasses;
