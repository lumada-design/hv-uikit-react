import { TimeFormat, PeriodPickerOptions } from "./enums";
import { getHoursForTimeFormat } from "./timePickerConverter";

/**
 * Pads the unit time values so that they always have two digits
 * @param {Number} value - unit time value
 * @returns The unit time value with two digits
 */
const padTime = (value) => {
  if (value == null || value === "" || value < 0) {
    return value?.toString();
  }
  if (value < 10 && value.toString().length === 1) {
    return `0${value.toString()}`;
  }
  return value.toString();
};

/**
 * Gets the time format for a given locale
 * @param {String} locale - locale
 * @returns {TimeFormat} the time format for the given locale (12 or 24)
 */
const getTimeFormatForLocale = (locale) => {
  const options = {
    hour: "numeric",
  };
  const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
  const isInHour12Format = dateTimeFormat.resolvedOptions().hour12;
  return isInHour12Format ? TimeFormat.H12 : TimeFormat.H24;
};

/**
 * Formats the time to be rendered
 * @param {Object} time - time object to be rendered
 * @param {Number} time.hours - hours
 * @param {Number} time.minutes - minutes
 * @param {Number} time.seconds - seconds
 * @param {String} time.period - period (am/pm). It is undefined when the time is to be shown in 24h format
 *
 * @returns {String} formatted time
 */
const getFormattedTime = (time, timeFormat) => {
  const { hours, minutes, seconds, period } = time;

  const isInHour12Format = timeFormat === TimeFormat.H12 || (timeFormat == null && period != null);

  if (isInHour12Format) {
    const p = period ?? (hours > 12 ? PeriodPickerOptions.PM : PeriodPickerOptions.AM);
    return `${padTime(getHoursForTimeFormat(hours, TimeFormat.H12))}:${padTime(minutes)}:${padTime(
      seconds
    )} ${p}`;
  }

  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
};

export { padTime, getFormattedTime, getTimeFormatForLocale };
