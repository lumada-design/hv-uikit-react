import moment from "moment";
import { REPRESENTATION_VALUES } from "./enums";

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
 * For example: zeroPad(5, 2) => "05".
 *
 * @param {number} value - Value to be padded.
 * @param {number} length - Length of the value after the padding is added.
 * @returns {string} The value as a string with the received amount of padding.
 */
export const zeroPad = (value, length) => `${value}`.padStart(length, "0");

/**
 * Returns the number of days in a month for a given year.
 *
 * @param {number} month - Number of the month.
 * @param {number} year - Number of the year.
 * @returns {number} The number of days in a month for the received year.
 */
export const getMonthDays = (month, year) => new Date(year, month, 0).getDate();

/**
 * Gets the year day number for the received date.
 * From 0 (Sunday) to 6 (Saturday).
 *
 * @param {Date} date - Date value.
 * @returns {number} The number of the day of the week (0 to 6).
 */
export const getWeekdayNumber = date => date.getUTCDay();

/**
 * Creates a date in UTC timezone.
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {Date}
 */
export const makeUTCDate = (year, month, day) => new Date(Date.UTC(year, month - 1, day, 0));

/**
 * Creates a date in UTC timezone from an ISO string.
 *
 * @param {string} isoStringDate ISO formatted date.
 * @returns {Date}
 */
export const makeUTCDateFromISOString = isoStringDate => new Date(isoStringDate);

/**
 * Creates a new date object with today's date in UTC timezone.
 *
 * @returns {Date}
 */
export const makeUTCToday = () => {
  const today = new Date();
  return makeUTCDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
};

/**
 * Convert a date from UTC timezone to local timezone.
 *
 * @param utcDate
 * @returns {Date}
 * @constructor
 */
export const UTCToLocalDate = utcDate =>
  new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());

/**
 * Returns the first day of the month for a given year.
 * From 0 (Sunday) to 6 (Saturday).
 *
 * @param {number} month - Number of the month.
 * @param {number} year - Number of the year.
 * @returns {number} The first day of the month for the received year.
 */
export const getMonthFirstDay = (month, year) => getWeekdayNumber(makeUTCDate(year, month, 1));

/**
 * Checks if the received date is a valid date.
 *
 * @param {Date} date - The date to be validated.
 * @returns {boolean} A flag stating if the date is valid or not.
 */
export const isDate = date => {
  const auxIsDate = Object.prototype.toString.call(date) === "[object Date]";
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return auxIsDate && isValidDate;
};

/**
 * Checks if the received date is between `1000-01-01` and `9999-12-31`.
 *
 * @param {Date} date - The date to be validated.
 * @returns {boolean} A flag stating if the date is in a valid range or not.
 */
export const isDateInValidRange = date => {
  if (!isDate(date)) {
    return false;
  }

  const year = date.getUTCFullYear();
  return year >= 1000 && year <= 9999;
};

/**
 * Checks if two dates are in the same month and year.
 *
 * @param {Date} date1 - First date.
 * @param {Date} date2 - Second date.
 * @returns {boolean} A flag stating if the dates are in the same month and year or not.
 */
export const isSameMonth = (date1, date2) => {
  if (!(isDate(date1) && isDate(date2))) return false;

  const date2Month = date2.getUTCMonth() + 1;
  const date2Year = date2.getUTCFullYear();

  const date1Month = date1.getUTCMonth() + 1;
  const date1Year = date1.getUTCFullYear();

  return date2Month === date1Month && date2Year === date1Year;
};

/**
 * Checks if two dates are on the same day.
 *
 * @param {Date} date1 - First date.
 * @param {Date} date2 - Second date.
 * @returns {boolean} A flag stating if the dates are in the same day or not.
 */
export const isSameDay = (date1, date2) => {
  if (!(isDate(date1) && isDate(date2))) return false;

  const date2Day = date2.getUTCDate();
  const date2Month = date2.getUTCMonth() + 1;
  const date2Year = date2.getUTCFullYear();

  const date1Date = date1.getUTCDate();
  const date1Month = date1.getUTCMonth() + 1;
  const date1Year = date1.getUTCFullYear();

  return date2Day === date1Date && date2Month === date1Month && date2Year === date1Year;
};

/**
 * Formats the received date using the ISO format (YYYY-MM-DD).
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string || null} The formatted date in ISO format.
 */
export const getDateISO = date => {
  if (!isDate(date)) return null;

  return [
    date.getUTCFullYear(),
    zeroPad(date.getUTCMonth() + 1, 2),
    zeroPad(date.getUTCDate(), 2)
  ].join("-");
};

/**
 * Checks if a string is a valid ISO formatted date.
 *
 * @param {string} isoStringDate - The string to be checked.
 * @returns {boolean} True if the received string is in a valid ISO format, false otherwise.
 */
export const isValidISOString = isoStringDate => /\d{4}-\d{2}-\d{2}/.test(isoStringDate);

/**
 * Converts a ISO date string ("YYYY-MM-DD") into a new Date.
 * This is needed because when creating a new date in javascript using a ISO date string the timezone applied will
 * always be UTC instead of local time.
 *
 * @param {string} isoStringDate
 * @returns {Date} A new date created based on the ISO string.
 */
export const convertISOStringDateToDate = isoStringDate => {
  if (isoStringDate !== "" && !isValidISOString(isoStringDate)) {
    // eslint-disable-next-line no-console
    console.warn(`The date must be in ISO format (YYYY-MM-DD): ${isoStringDate}`);
    return null;
  }
  const convertedDate = makeUTCDateFromISOString(isoStringDate);
  if (!isDate(convertedDate) || !isDateInValidRange(convertedDate)) {
    // eslint-disable-next-line no-console
    console.warn(`The received date is invalid: ${isoStringDate}`);
    return null;
  }

  return convertedDate;
};

/**
 * Returns an object with the previous month taking also into consideration the year.
 * For example the previous month of January 2000 will be December 1999.
 *
 * @param {number} month - Number of the month.
 * @param {number} year - Number of the year.
 * @returns {({month: number, year: number})} Object with new month and year defined.
 */
export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

/**
 * Returns an object with the next month taking also into consideration the year.
 * For example the next month of December 2000 will be January 2001.
 *
 * @param {number} month - Number of the month.
 * @param {number} year - Number of the year.
 * @returns {({month: number, year: number})} Object with new month and year defined.
 */
export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

const uppercaseFirstLetter = monthName => monthName[0].toUpperCase() + monthName.substring(1);

/**
 * Returns a list with the names of all the months localized in the received locale and representation value.
 *
 * @param {string} locale - The locale to be applied to the Intl format.
 * @param {string} [representationValue=REPRESENTATION_VALUES.LONG] - The locale to be applied to the Intl format.
 * @returns {Array} An array with all the months names.
 */
export const getMonthNamesList = (locale, representationValue = REPRESENTATION_VALUES.LONG) => {
  const options = {
    month: representationValue
  };

  return [...new Array(12)].map((n, index) => {
    const auxDate = new Date(1970, index, 1);
    return uppercaseFirstLetter(Intl.DateTimeFormat(locale, options).format(auxDate));
  });
};

/**
 * Returns a list with the names of all the weekdays localized in the received locale and representation value.
 *
 * @param {string} locale - The locale to be applied to the Intl format.
 * @param {string} representativeValue - The locale to be applied to the Intl format.
 * @returns {Array} An array with all the weekday names.
 */
export const getWeekdayNamesList = (locale, representativeValue = REPRESENTATION_VALUES.LONG) => {
  const weekdayNames = [];
  for (let day = 4; day <= 10; day += 1) {
    weekdayNames.push(
      new Date(1970, 0, day).toLocaleString(locale, {
        weekday: representativeValue
      })
    );
  }
  return weekdayNames;
};

/**
 * Returns the name of the month for the supplied month localized in the received locale and representation value.
 *
 * @param {number} monthIndex - Month which we want to retrieve the name. (0 January ... 11 December).
 * @param {string} locale - The locale to be applied to the Intl format.
 * @param {string} [representationValue=REPRESENTATION_VALUES.LONG] - The locale to be applied to the Intl format.
 * @returns {string} The name of the month.
 */
export const getMonthName = (
  monthIndex,
  locale,
  representationValue = REPRESENTATION_VALUES.LONG
) => {
  const auxDate = new Date(1970, monthIndex, 1);
  return new Intl.DateTimeFormat(locale, { month: representationValue }).format(auxDate);
};

/**
 * Formats the received date according to Design System specifications.
 * Currently: day month, year => `14 Aug, 2019`.
 *
 * @param {date} date - Date to be formatted.
 * @param {string} locale - The locale to be applied to the Intl format.
 * @returns {string} The formatted date as a string.
 */
export const getFormattedDate = (date, locale) =>
  `${date.getUTCDate()} ${getMonthName(
    date.getUTCMonth(),
    locale,
    REPRESENTATION_VALUES.SHORT
  )} ${date.getUTCFullYear()}`;
/**
 * Creates an array of 42 days. The complete current month and enough days from the previous and next months to fill
 * the 42 positions.
 *
 * @param {number} month - The number of the month.
 * @param {number} year - The number of the year.
 * @returns {Array} The array of dates.
 */
export const createDatesArray = (month, year) => {
  // Initializes the variables needed to calculate the dates for the received month and year
  const monthDays = getMonthDays(month, year);
  const daysFromPrevMonth = getMonthFirstDay(month, year);
  const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);
  const prevMonthYear = getPreviousMonth(month, year);
  const nextMonthYear = getNextMonth(month, year);
  const prevMonthDays = getMonthDays(prevMonthYear.month, prevMonthYear.year);

  // Creates the arrays for the dates for previous, current and next months
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return makeUTCDate(prevMonthYear.year, prevMonthYear.month, day);
  });
  const currentMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return makeUTCDate(year, month, day);
  });
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return makeUTCDate(nextMonthYear.year, nextMonthYear.month, day);
  });

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

/**
 * Checks if the visibleDate is valid, if not returns the selectedDate or Today's days if none if is valid.
 *
 * @param {Date} visibleDate - The initial visibleDate value.
 * @param {Date} selectedDate - The selectedDate value.
 * @returns Date The valid date to be used as the visible date
 */
export const getValidVisibleDate = (visibleDate, selectedDate) => {
  if (isDate(visibleDate)) {
    return visibleDate;
  }
  if (isDate(selectedDate)) {
    return selectedDate;
  }
  return makeUTCToday();
};

/**
 * Checks if the received locale is valid according to Intl.
 *
 * @param {string} locale - The locale to be checked
 * @returns {boolean} - True if the locale is valid, false otherwise.
 */
export const isValidLocale = locale => {
  try {
    if (Intl.DateTimeFormat.supportedLocalesOf(locale).length > 0) {
      return true;
    }
    // eslint-disable-next-line no-console
    console.warn(`${locale} is not supported. Falling back to a known locale.`);
    return false;
  } catch (error) {
    if (error.name === "RangeError") {
      // eslint-disable-next-line no-console
      console.error(`Invalid locale: ${locale}`);
      return false;
    }
    // eslint-disable-next-line no-console
    console.error(error.message);
    return false;
  }
};

/**
 * Checks if the previous year / month is a valid date.
 *
 * @param {number} year - The year.
 * @param {number} month - The month.
 * @returns {boolean} - True if the previous date is valid, false otherwise.
 */
export const isPreviousDateValid = (year, month) => {
  const previousMonthYear = getPreviousMonth(month, year);

  return isDateInValidRange(makeUTCDate(previousMonthYear.year, previousMonthYear.month, 1));
};

/**
 * Checks if the next year / month is a valid date.
 *
 * @param {number} year - The year.
 * @param {number} month - The month.
 * @returns {boolean} - True if the next date is valid, false otherwise.
 */
export const isNextDateValid = (year, month) => {
  const nextMonthYear = getNextMonth(month, year);

  return isDateInValidRange(makeUTCDate(nextMonthYear.year, nextMonthYear.month, 1));
};

/**
 * Checks if the date falls within a specified date range.
 *
 * @param {Date} date - The date to be evaluated.
 * @param {object} providedValueRange - Provided selection range.
 * @returns {boolean} - True if the date falls within the range, false otherwise.
 */
export const dateInProvidedValueRange = (date, providedValueRange) => {
  const { startDate, endDate } = providedValueRange;
  const modStartDate = moment(startDate).format("YYYY-MM-DD");
  const modEndDate = moment(endDate).format("YYYY-MM-DD");

  const convertedDate = moment(date).format("YYYY-MM-DD");

  return convertedDate >= modStartDate && convertedDate <= modEndDate;
};

export const checkIfDateIsDisabled = (date, minimumDate, maximumDate) => {
  const modStartDate = minimumDate ? moment(minimumDate).format("YYYY-MM-DD") : undefined;
  const modEndDate = maximumDate ? moment(maximumDate).format("YYYY-MM-DD") : undefined;

  const convertedDate = moment(date).format("YYYY-MM-DD");

  return convertedDate <= modStartDate || convertedDate >= modEndDate;
};
