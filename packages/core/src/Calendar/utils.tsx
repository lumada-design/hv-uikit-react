import dayjs from "dayjs";

import { capitalize } from "../utils/helpers";
import { DateRangeProp } from "./types";

/**
 * Constant with the number of weeks to be displayed on the calendar.
 */
export const CALENDAR_WEEKS = 6;

/**
 * Constant with the default locale that should be used as the default.
 */
export const DEFAULT_LOCALE = "en";

/**
 * Pads a string value with leading zeroes(0) until length is reached.
 *
 * @param value - Value to be padded.
 * @param length - Length of the value after the padding is added.
 * @returns The value as a string with the received amount of padding.
 *
 * @example zeroPad(5, 2) => "05"
 */
export const zeroPad = (value: number, length: number) =>
  `${value}`.padStart(length, "0");

/**
 * Returns the number of days in the month given a month and year.
 *
 * @param month - Number of the month (1 to 12).
 * @param year - Number of the year.
 * @returns The number of days in a month for the received year.
 */
export const getMonthDays = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

/**
 * Gets the week day of the first day of a given month and year.
 * From 0 (Sunday) to 6 (Saturday).
 *
 * @param month - Number of the month (1 to 12).
 * @param year - Number of the year.
 * @returns The zero indexed week day where 0 is Sunday (0 to 6).
 */
export const getMonthFirstWeekday = (month: number, year: number) =>
  new Date(year, month - 1, 1).getDay();

/**
 * Creates a `Date` instance in UTC timezone.
 *
 * @param year - The year of the date.
 * @param monthIndex - The zero indexed month of the year (0 to 11).
 * @param day - The day of the month.
 * @param [hour=1] - The hour of the day.
 * @returns A `Date` instance in UTC timezone.
 */
export const makeUTCDate = (
  year: number,
  monthIndex: number,
  day: number,
  hour = 1
) => new Date(Date.UTC(year, monthIndex, day, hour));

/**
 * Checks if the received date is a valid date.
 *
 * @param date - The date to be validated.
 * @returns A flag stating if the date is valid or not.
 */
export const isDate = (date: any): date is Date =>
  Object.prototype.toString.call(date) === "[object Date]" &&
  !Number.isNaN(date.valueOf());

export const isDateRangeProp = (date: any): date is DateRangeProp =>
  "startDate" in date;

/**
 * Checks if two dates are in the same month and year.
 *
 * @param date1 - First date.
 * @param date2 - Second date.
 * @returns A flag stating if the dates are in the same month and year or not.
 */
export const isSameMonth = (date1: any, date2: any) => {
  if (!(isDate(date1) && isDate(date2))) return false;

  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/**
 * Checks if two dates are on the same day.
 *
 * @param date1 - First date.
 * @param date2 - Second date.
 * @returns A flag stating if the dates are in the same day or not.
 */
export const isSameDay = (date1: any, date2: any) => {
  if (!(isDate(date1) && isDate(date2))) return false;

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/**
 * Formats the received date using the ISO format (YYYY-MM-DD).
 *
 * @param date - The date to be formatted.
 * @returns The formatted date in ISO format.
 */
export const getDateISO = (date?: Date) => {
  if (!isDate(date)) return null;

  return [
    date.getFullYear(),
    zeroPad(date.getMonth() + 1, 2),
    zeroPad(date.getDate(), 2),
  ].join("-");
};

/**
 * Returns an object with the previous month taking also into consideration the year.
 * For example the previous month of January 2000 will be December 1999.
 *
 * @param month - Number of the month.
 * @param year - Number of the year.
 * @returns Object with new month and year defined.
 */
export const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

/**
 * Returns an object with the next month taking also into consideration the year.
 * For example the next month of December 2000 will be January 2001.
 *
 * @param month - Number of the month.
 * @param year - Number of the year.
 * @returns Object with new month and year defined.
 */
export const getNextMonth = (month: number, year: number) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

/**
 * Returns a list with the names of all the months localized in the received locale and representation value.
 *
 * @param locale - The locale to be applied to the Intl format.
 * @param representationValue - The representation value for the month.
 * @returns An array with all the months names.
 */
export const getMonthNamesList = (
  locale: string | undefined,
  representationValue: Intl.DateTimeFormatOptions["month"] = "long"
) => {
  const options = { month: representationValue, timeZone: "UTC" };

  return [...new Array(12)].map((n, index) => {
    const auxDate = makeUTCDate(1970, index, 1);
    return capitalize(Intl.DateTimeFormat(locale, options).format(auxDate));
  });
};

/**
 * Returns a list with the names of all the weekdays localized in the received locale and representation value.
 *
 * @param locale - The locale to be applied.
 * @returns An array with all the weekday names.
 */
export const getWeekdayNamesList = (locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "narrow",
    timeZone: "UTC",
  });

  return [...new Array(7)].map((n, index) => {
    return formatter.format(makeUTCDate(1970, 0, 4 + index));
  });
};

/**
 * Returns the name of the month for the supplied month localized in the received locale and representation value.
 *
 * @param date - The date from which the month name is extracted.
 * @param locale - The locale to be applied to the Intl format.
 * @param representationValue - The locale to be applied to the Intl format.
 * @returns The name of the month.
 */
export const getMonthName = (
  date: Date,
  locale: string,
  representationValue: Intl.DateTimeFormatOptions["month"] = "long"
) =>
  new Intl.DateTimeFormat(locale, { month: representationValue }).format(date);

/**
 * Formats the received date according to Design System specifications.
 * Currently: day month, year => `14 Aug, 2019`.
 *
 * @param date - UTC date to be formatted.
 * @param locale - The locale to be applied to the Intl format.
 * @returns The formatted date as a string.
 */
export const getFormattedDate = (
  // TODO: fix this
  date: any,
  locale: any,
  rep: Intl.DateTimeFormatOptions["month"] = "short"
) =>
  `${date.getDate()} ${getMonthName(date, locale, rep)} ${date.getFullYear()}`;

/**
 * Creates an array of 42 days. The complete current month and enough days from the previous and next months to fill
 * the 42 positions.
 *
 * @param month - The number of the month (1 to 12).
 * @param year - The number of the year.
 * @returns The array of dates.
 */
export const createDatesArray = (month: number, year: number) => {
  // Initializes the variables needed to calculate the dates for the received month and year
  const monthDays = getMonthDays(month, year);
  const daysFromPrevMonth = getMonthFirstWeekday(month, year);
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);
  const prevMonthYear = getPreviousMonth(month, year);
  const nextMonthYear = getNextMonth(month, year);
  const prevMonthDays = getMonthDays(prevMonthYear.month, prevMonthYear.year);

  // Creates the arrays for the dates for previous, current and next months
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return new Date(prevMonthYear.year, prevMonthYear.month - 1, day);
  });
  const currentMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return new Date(year, month - 1, day);
  });
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return new Date(nextMonthYear.year, nextMonthYear.month - 1, day);
  });

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

export const isRange = (date: any): date is DateRangeProp =>
  date != null && typeof date === "object" && "startDate" in date;

/**
 * Checks if the date falls within a specified date range.
 *
 * @param date - The date to be evaluated.
 * @param providedValueRange - Provided selection range.
 * @returns - True if the date falls within the range, false otherwise.
 */
export const dateInProvidedValueRange = (
  date: any,
  providedValueRange: any
) => {
  const { startDate, endDate } = providedValueRange;

  if (!isRange(providedValueRange) || endDate == null) return false;
  const localEndDate = endDate;

  const modStartDate = dayjs(startDate).format("YYYY-MM-DD");
  const modEndDate = dayjs(localEndDate).format("YYYY-MM-DD");

  const convertedDate = dayjs(date).format("YYYY-MM-DD");

  return convertedDate >= modStartDate && convertedDate <= modEndDate;
};

export const checkIfDateIsDisabled = (
  date?: string | number | Date | dayjs.Dayjs,
  minimumDate?: string | number | Date | dayjs.Dayjs,
  maximumDate?: string | number | Date | dayjs.Dayjs
) => {
  if (!minimumDate && !maximumDate) return false;
  const modStartDate = minimumDate
    ? dayjs(minimumDate).format("YYYY-MM-DD")
    : undefined;
  const modEndDate = maximumDate
    ? dayjs(maximumDate).format("YYYY-MM-DD")
    : undefined;

  const convertedDate = dayjs(date).format("YYYY-MM-DD");

  return (
    (modStartDate !== undefined && convertedDate < modStartDate) ||
    (modEndDate !== undefined && convertedDate > modEndDate)
  );
};

export const formatToLocale = (date: any, locale: any) => {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};
