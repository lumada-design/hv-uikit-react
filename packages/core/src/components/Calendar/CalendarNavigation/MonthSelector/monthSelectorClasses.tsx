import { getClasses } from "utils";

export type HvMonthSelectorClasses = {
  calendarMonthlyGrid?: string;
  rangeModeWidth?: string;
  normalWidth?: string;
  focusSelection?: string;
  calendarMonthlyCell?: string;
  calendarMonthlyCellSelected?: string;
};

const classKeys: string[] = [
  "calendarMonthlyGrid",
  "rangeModeWidth",
  "normalWidth",
  "focusSelection",
  "calendarMonthlyCell",
  "calendarMonthlyCellSelected",
];

const monthSelectorClasses = getClasses<HvMonthSelectorClasses>(
  classKeys,
  "HvMothSelector"
);

export default monthSelectorClasses;
