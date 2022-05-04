import { PeriodPickerOptions, TimePickerUnits } from "./enums";

/**
 * Gets the period(am/pm) for a given time
 * @param {Date} date - Date to get the period from. The default date is the current one.
 * @returns {String} - AM or PM
 */
const getPeriodForDate = (date = new Date()) => {
  const hours = date.getHours();
  return hours < 12 ? PeriodPickerOptions.AM : PeriodPickerOptions.PM;
};

/**
 * Checks if the unit time value is inside the acceptable range
 *
 * @param {Number} value - unit time value
 * @param {String} type - unit time type. One of the TimePickerUnits types.
 */
const isUnitTimeInValidRange = (value, type) => {
  const timeUnit = TimePickerUnits[type];
  return value !== "" && value >= timeUnit.min && value <= timeUnit.max;
};

export { getPeriodForDate, isUnitTimeInValidRange };
