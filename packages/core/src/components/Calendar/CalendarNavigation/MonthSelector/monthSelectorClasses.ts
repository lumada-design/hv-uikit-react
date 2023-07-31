import { getClasses } from "@core/utils/classes";

export interface HvMonthSelectorClasses {
  calendarMonthlyGrid?: string;
  rangeModeWidth?: string;
  normalWidth?: string;
  focusSelection?: string;
  calendarMonthlyCell?: string;
  calendarMonthlyCellSelected?: string;
}

const classKeys: (keyof HvMonthSelectorClasses)[] = [
  "calendarMonthlyGrid",
  "rangeModeWidth",
  "normalWidth",
  "focusSelection",
  "calendarMonthlyCell",
  "calendarMonthlyCellSelected",
];

const monthSelectorClasses = getClasses(classKeys, "HvMothSelector");

export default monthSelectorClasses;
