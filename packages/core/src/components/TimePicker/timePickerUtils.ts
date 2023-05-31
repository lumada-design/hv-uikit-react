import { TimePickerUnits, TimeType } from "./enums";

/** Gets the period(am/pm) for a given `Date`. Defaults to current */
export const getPeriodForDate = (date = new Date()) => {
  const hours = date.getHours();
  return hours < 12 ? "AM" : "PM";
};

/** Checks if the unit time value is inside the acceptable range */
export const isUnitTimeInValidRange = (value: number, type: TimeType) => {
  const timeUnit = TimePickerUnits[type];
  return value !== "" && value >= timeUnit.min && value <= timeUnit.max;
};
