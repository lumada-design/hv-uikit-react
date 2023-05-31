import { HvTimePickerValue } from ".";

export const TimePickerUnits = {
  HOUR_24: { min: 0, max: 23 },
  HOUR_12: { min: 1, max: 12 },
  MINUTE: { min: 0, max: 59 },
  SECOND: { min: 0, max: 59 },
} satisfies Record<string, { min: number; max: number }>;

export type TimeType = keyof typeof TimePickerUnits;

export type PeriodOptions = "AM" | "PM";

export type TimeFormat = "H12" | "H24";

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

export const timeIsEqual = (
  timeA: HvTimePickerValue,
  timeB: HvTimePickerValue
) => {
  return (
    timeA === timeB ||
    (timeA == null && timeB == null) ||
    (timeA != null &&
      timeB != null &&
      timeA.hours === timeB.hours &&
      timeA.minutes === timeB.minutes &&
      timeA.seconds === timeB.seconds &&
      timeA.period === timeB.period)
  );
};

export const timeIsValid = (time, timeFormat: TimeFormat) => {
  const hourInputState =
    time?.hours != null &&
    time.hours !== "" &&
    time.hours >= 0 &&
    ((timeFormat === "H24" && time.hours <= 24) ||
      (timeFormat === "H12" && time.hours <= 12));
  const minutesInputState =
    time?.minutes != null &&
    time.minutes !== "" &&
    time.minutes >= 0 &&
    time.minutes <= 59;
  const secondsInputState =
    time?.seconds != null &&
    time.seconds !== "" &&
    time.seconds >= 0 &&
    time.seconds <= 59;

  return hourInputState && minutesInputState && secondsInputState;
};

// #region converter utils

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

// #endregion converter utils

// #region formatter utils

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
// #endregion formatter utils
