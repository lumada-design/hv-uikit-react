import { REPRESENTATION_VALUES } from "../Calendar/enums";
import {
  DEFAULT_LOCALE,
  getFormattedDate,
  getMonthName,
  isDate,
  isSameMonth,
  isValidLocale,
  makeUTCDate,
} from "../Calendar/utils";

export const getUTCNextMonth = (date = new Date()) =>
  new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);

export const isVisibleDate = (date, { visibleYear, visibleMonth }) => {
  const date1 = makeUTCDate(visibleYear, visibleMonth, 1);
  const date2 = getUTCNextMonth(date1);
  return isSameMonth(date, date1) || isSameMonth(date, date2);
};

export const validateDate = (date) => (isDate(date) && date) || new Date();

export const validateLocale = (locale) => (isValidLocale(locale) ? locale : DEFAULT_LOCALE);

export const getFormattedDateRange = (date, locale, rep = REPRESENTATION_VALUES.SHORT) => {
  const { startDate, endDate } = date;
  const monthYear = `${getMonthName(startDate, locale, rep)} ${startDate.getFullYear()}`;
  return `${startDate.getUTCDate()} - ${endDate.getUTCDate()} ${monthYear}`;
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
