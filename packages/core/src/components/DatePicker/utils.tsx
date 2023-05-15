import { DateRangeProp } from "..";
import {
  getFormattedDate,
  getMonthName,
  isDate,
  isSameMonth,
} from "../Calendar/utils";

export const validateDate = (date) => (isDate(date) && date) || new Date();

export const getFormattedDateRange = (
  date: DateRangeProp,
  locale: string,
  rep: Intl.DateTimeFormatOptions["month"] = "short"
) => {
  const { startDate, endDate } = date;
  const monthYear = `${getMonthName(
    startDate,
    locale,
    rep
  )} ${startDate.getFullYear()}`;
  return `${startDate.getDate()} - ${endDate?.getDate()} ${monthYear}`;
};

export const getSingleDateLabel = (date, locale?) =>
  isDate(date) ? getFormattedDate(date, locale) : "";

export const getRangeDateLabel = ({ startDate, endDate }, locale) => {
  if (!(isDate(startDate) && isDate(endDate)))
    return getSingleDateLabel(startDate);

  return isSameMonth(startDate, endDate)
    ? getFormattedDateRange({ startDate, endDate }, locale)
    : `${getFormattedDate(startDate, locale)} - ${getFormattedDate(
        endDate,
        locale
      )}`;
};

export const getDateLabel = (
  date: Date | Partial<DateRangeProp> | undefined,
  rangeMode: boolean,
  locale: string
) =>
  rangeMode
    ? getRangeDateLabel(date as Required<DateRangeProp>, locale)
    : getSingleDateLabel(date, locale);
