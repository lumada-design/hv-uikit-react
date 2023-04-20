import { getClasses } from "@core/utils";

export interface HvCalendarClasses {
  root?: string;
  rangeCalendarContainer?: string;
  singleCalendar?: string;
  focusSelection?: string;
  calendarMonthlyCell?: string;
  calendarMonthlyCellSelected?: string;
}

const classKeys: string[] = [
  "root",
  "rangeCalendarContainer",
  "singleCalendar",
  "focusSelection",
  "calendarMonthlyCell",
  "calendarMonthlyCellSelected",
];

const calendarClasses = getClasses<HvCalendarClasses>(classKeys, "HvCalendar");

export default calendarClasses;
