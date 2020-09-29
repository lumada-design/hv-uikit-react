import { REPRESENTATION_VALUES } from "../Calendar/enums";
import {
  DEFAULT_LOCALE,
  getFormattedDate,
  getMonthName,
  isDate,
  isSameMonth,
  isValidLocale,
} from "../Calendar/utils";

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
