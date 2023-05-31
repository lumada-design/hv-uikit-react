import { isUnitTimeInValidRange } from "./timePickerUtils";
import { TimeFormat, TimePickerUnits } from "./enums";
import { HvTimePickerValue } from ".";

/**
 * Gets hours for the passed time format.
 * e.g. 20hours in 12h format is set to 8
 * @returns hours in the correct format
 */
export const getHoursForTimeFormat = (
  hours: number,
  timeFormat: TimeFormat
) => {
  if (timeFormat === "H12") {
    if (hours == null || hours === 0) {
      return TimePickerUnits.HOUR_12.max;
    }
    if (isUnitTimeInValidRange(hours, "HOUR_12")) {
      return hours;
    }
    if (isUnitTimeInValidRange(hours, "HOUR_24")) {
      return hours - TimePickerUnits.HOUR_12.max;
    }
  }
  return hours;
};

/**
 * Gets the time in 24h format
 * e.g. 08:00:00:PM in 12h format is set to 20:00:00
 * @returns TimeFormat with the hours set into the correct format
 */
export const getTimeWithFormat24 = (
  time: HvTimePickerValue,
  timeFormat: TimeFormat
): HvTimePickerValue => {
  const { hours, period } = time;
  const timeIn24Format = { ...time };
  if (timeFormat === "H12") {
    if (period === "AM" && hours === TimePickerUnits.HOUR_12.max) {
      timeIn24Format.hours = TimePickerUnits.HOUR_24.min;
    } else if (period === "PM" && hours < TimePickerUnits.HOUR_12.max) {
      timeIn24Format.hours = hours + TimePickerUnits.HOUR_12.max;
    }
  }
  return timeIn24Format;
};
