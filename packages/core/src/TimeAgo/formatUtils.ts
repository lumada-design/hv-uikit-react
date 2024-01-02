import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

/**
 * Relative time thresholds defined by
 * {@link https://xd.adobe.com/view/1b7df235-5cf8-4b51-a2f0-0be1bb591c55-4e2e/ Design System}
 *
 * Implementation using day.js {@link https://day.js.org/docs/en/customization/relative-time relativeTime}
 */
const thresholds = [
  { l: "s", r: 119, d: "second" },
  { l: "m", r: 1 },
  { l: "mm", r: 59, d: "minute" },
  { l: "h", r: 1 },
  { l: "hh", r: 23, d: "hour" },
  { l: "d", r: 1 },
  { l: "dd", r: 29, d: "day" },
  { l: "M", r: 1 },
  { l: "MM", r: 11, d: "month" },
  { l: "y", r: 17 },
  { l: "yy", d: "year" },
];

dayjs.extend(localeData);
dayjs.extend(duration);
dayjs.extend(calendar);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime, { thresholds });
dayjs.extend(updateLocale);

export const secondsUntilNextDay = (date = new Date()) => {
  const midnight = new Date(date.getTime());

  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0);
  midnight.setMinutes(0);
  midnight.setSeconds(0);
  midnight.setMilliseconds(0);

  return (midnight.getTime() - date.getTime()) / 1000;
};

const secondsUntilNextWeek = (date = new Date()) => {
  const firstMonthDayOfWeek = date.getDate() - date.getDay();
  const firstMonthDayOfNextWeek = firstMonthDayOfWeek + 7; // auto roll over to next month if needed

  const firstDayNextWeek = new Date(date.getTime());

  firstDayNextWeek.setDate(firstMonthDayOfNextWeek);
  firstDayNextWeek.setHours(0);
  firstDayNextWeek.setMinutes(0);
  firstDayNextWeek.setSeconds(0);
  firstDayNextWeek.setMilliseconds(0);

  return (firstDayNextWeek.getTime() - date.getTime()) / 1000;
};

/**
 * @typedef {Object} TimeAgo
 * @property {string} timeAgo - the formatted date using the "time ago format"
 * @property {number} delay - the time until the date needs to be updated
 */

/**
 * Formats a date to the a relative time format using dayjs.
 *
 * @param {Date} date - date to format.
 * @param {String} locale - locale to use.
 * @param {Boolean} [showSeconds=false] - if seconds should be part of the result.
 * @param {Date} referenceDate - reference date to use when formatting (defaults to current date).
 *
 * @return {TimeAgo} the formatted date using the "time ago format" and the time until it needs to be updated
 */
export const formatTimeAgo = (
  date: Date,
  locale: string,
  showSeconds = false,
  referenceDate = new Date()
) => {
  const dayReferenceDate = dayjs(referenceDate);
  const dayDate = dayjs(date).locale(locale);

  const dayDiffSeconds = dayReferenceDate.diff(dayDate, "second");

  const formatUseSeconds = showSeconds ? "LTS" : "LT";

  // check if the date is after the reference date
  if (date.getTime() > referenceDate.getTime()) {
    return {
      timeAgo: dayDate.format(`L ${formatUseSeconds}`),
      delay: (date.getTime() - referenceDate.getTime()) / 1000,
    };
  }

  // just now, until the 2 minutes
  if (dayDiffSeconds < 120) {
    return {
      timeAgo: dayjs
        .duration(dayDiffSeconds, "second")
        .locale(locale)
        .humanize(),
      delay: 120 - dayDiffSeconds,
    };
  }

  // ago in minutes, until the 1 hour mark
  const dayDiffMinutes = dayReferenceDate.diff(dayDate, "minute");

  if (dayDiffMinutes < 60) {
    return {
      timeAgo: dayjs
        .duration(-dayDiffMinutes, "minute")
        .locale(locale)
        .humanize(true),
      delay: 60 * (dayDiffMinutes + 1) - dayDiffSeconds,
    };
  }

  // formatted date with text description for today
  if (dayReferenceDate.isSame(dayDate, "day")) {
    return {
      timeAgo: `${dayDate.calendar(dayReferenceDate)}`,
      delay: secondsUntilNextDay(referenceDate),
    };
  }

  // formatted date with text description for yesterday
  if (dayReferenceDate.subtract(1, "day").isSame(dayDate, "day")) {
    return {
      timeAgo: `${dayDate.calendar(dayReferenceDate)}`,
      delay: secondsUntilNextDay(referenceDate),
    };
  }

  // formatted date with week during the current week
  if (dayDate.isSame(dayReferenceDate, "week")) {
    return {
      timeAgo: dayDate.format(`ddd, ${formatUseSeconds}`),
      delay: secondsUntilNextWeek(date),
    };
  }

  // formatted without special gimmicks
  return {
    timeAgo: dayDate.format(`L ${formatUseSeconds}`),
    delay: 0,
  };
};
