import { TimeFormat } from "./enums";
import { getHoursForTimeFormat } from "./timePickerConverter";
import type { HvTimePickerValue } from ".";

/**
 * Pads the unit time values so that they always have two digits
 * @param {Number} value - unit time value
 * @returns The unit time value with two digits
 */
export const padTime = (value: number) => {
  // TODO: review
  if (value == null || value === "" || value < 0) return value?.toString();

  return String(value).padStart(2, "0");
};

/** Gets the time format for a given locale */
export const getTimeFormatForLocale = (locale?: string): TimeFormat => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, { hour: "numeric" });
  const { hour12: is12Hour } = dateTimeFormat.resolvedOptions();
  return is12Hour ? "H12" : "H24";
};

/** Formats the time to be rendered */
export const getFormattedTime = (
  time: HvTimePickerValue,
  timeFormat: TimeFormat
) => {
  const { hours, minutes, seconds, period } = time;

  const isInHour12Format =
    timeFormat === "H12" || (timeFormat == null && period != null);

  if (isInHour12Format) {
    const p = period ?? (hours > 12 ? "PM" : "AM");
    return `${padTime(getHoursForTimeFormat(hours, "H12"))}:${padTime(
      minutes
    )}:${padTime(seconds)} ${p}`;
  }

  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
};
