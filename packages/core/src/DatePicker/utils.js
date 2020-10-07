import { REPRESENTATION_VALUES } from "../Calendar/enums";
import {
  DEFAULT_LOCALE,
  getFormattedDate,
  getMonthName,
  isDate,
  isSameMonth,
  isValidLocale,
} from "../Calendar/utils";

/**
 * Validates if a given date is visible according to the provided visible month and year numbers.
 *
 * @param {Date} date The date object to be validated.
 * @param {Object} visibleDate - The month and year numeric values of a visible date.
 * @param {number} visibleDate.visibleMonth number The number of the month (1 to 12).
 * @param {number} visibleDate.visibleYear number The number of the year.
 * @returns {boolean} `true` if the date is considered visible, `false` otherwise
 */
export const isVisibleDate = (date, visibleDate) => {
  const { visibleYear, visibleMonth } = visibleDate;
  const date1 = new Date(visibleYear, visibleMonth - 1, 1);
  return isSameMonth(date, date1);
};

export const validateDate = (date) => (isDate(date) && date) || new Date();

export const validateLocale = (locale) => (isValidLocale(locale) ? locale : DEFAULT_LOCALE);

export const getFormattedDateRange = (date, locale, rep = REPRESENTATION_VALUES.SHORT) => {
  const { startDate, endDate } = date;
  const monthYear = `${getMonthName(startDate, locale, rep)} ${startDate.getFullYear()}`;
  return `${startDate.getDate()} - ${endDate.getDate()} ${monthYear}`;
};

export const getSingleDateLabel = (date, locale) =>
  isDate(date) ? getFormattedDate(date, locale) : "";

export const getRangeDateLabel = ({ startDate, endDate }, locale) => {
  if (!(isDate(startDate) && isDate(endDate))) return getSingleDateLabel(startDate);

  return isSameMonth(startDate, endDate)
    ? getFormattedDateRange({ startDate, endDate }, locale)
    : `${getFormattedDate(startDate, locale)} - ${getFormattedDate(endDate, locale)}`;
};

export const getDateLabel = (date, rangeMode, locale) =>
  rangeMode ? getRangeDateLabel(date, locale) : getSingleDateLabel(date, locale);
