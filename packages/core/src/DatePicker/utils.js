import { NAV_OPTIONS, REPRESENTATION_VALUES } from "../Calendar/enums";
import { getFormattedDate, getMonthName, isDate, isSameMonth } from "../Calendar/utils";

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
  const date2 = new Date(visibleYear, visibleMonth, 1);
  return isSameMonth(date, date1) || isSameMonth(date, date2);
};

export const validateDate = (date) => (isDate(date) && date) || new Date();

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

/**
 * Calculates the year and month value to be passed to the calendar
 * when a user navigates dates.
 *
 * @param {string} action - The direction in which the user wishes to drive the calendar.
 * @param {string} yearValue - The value used to calculate the calendar year.
 * @param {string} monthValue - The value used to calculate the calendar month.
 * @param {number} index - The index of the month clicked in the month selector.
 * @returns {string, string} - The year and month value with which to update the calendar.
 */
export const moveDate = (action, yearValue, monthValue, index) => {
  let newYear = yearValue;
  let newMonth = monthValue;
  let monthCalculation;

  const monthJump = 1;
  const JANUARY = 1;
  const DECEMBER = 12;

  switch (action) {
    case NAV_OPTIONS.PREVIOUS_MONTH:
      monthCalculation = newMonth - monthJump;
      newYear = monthCalculation <= 0 ? newYear - monthJump : newYear;
      newMonth = monthCalculation <= 0 ? DECEMBER : monthCalculation;
      break;

    case NAV_OPTIONS.NEXT_MONTH:
      monthCalculation = newMonth + monthJump;
      newYear = monthCalculation > DECEMBER ? newYear + monthJump : newYear;
      newMonth = monthCalculation > DECEMBER ? JANUARY : monthCalculation;
      break;

    case NAV_OPTIONS.PREVIOUS_YEAR:
      newYear = yearValue - 1;
      break;
    case NAV_OPTIONS.NEXT_YEAR:
      newYear = yearValue + 1;
      break;
    case NAV_OPTIONS.MONTH:
      newMonth = index;
      break;
    default:
      break;
  }

  return { newYear, newMonth };
};

/**
 * Handle left side calendar overlap over right side
 * when a user navigates dates.
 *
 * @param {string} leftVisibleMonth - The year value of the left side calendar.
 * @param {string} leftVisibleYear - The month value of the left side calendar.
 * @param {string} rightVisibleMonth - The year value of the right side calendar.
 * @param {string} rightVisibleYear - The month value of the right side calendar.
 * @param {string} action - The navigation action performed by the user.
 * @returns {object} - The year and month value with which to update the left side calendar.
 */
export const leftOverlapHandler = (
  leftVisibleMonth,
  leftVisibleYear,
  rightVisibleMonth,
  rightVisibleYear,
  action
) => {
  let newRightVisibleYear = rightVisibleYear;
  let newRightVisibleMonth = rightVisibleMonth;

  if (action === NAV_OPTIONS.PREVIOUS_MONTH || action === NAV_OPTIONS.PREVIOUS_YEAR) {
    return {
      newRightVisibleYear,
      newRightVisibleMonth,
    };
  }

  if (leftVisibleYear === rightVisibleYear) {
    if (rightVisibleMonth === leftVisibleMonth) {
      const { newYear, newMonth } = moveDate(
        NAV_OPTIONS.NEXT_MONTH,
        rightVisibleYear,
        rightVisibleMonth
      );
      newRightVisibleYear = newYear;
      newRightVisibleMonth = newMonth;
    } else if (leftVisibleMonth > rightVisibleMonth) {
      const { newYear, newMonth } = moveDate(
        NAV_OPTIONS.NEXT_MONTH,
        leftVisibleYear,
        leftVisibleMonth
      );
      newRightVisibleYear = newYear;
      newRightVisibleMonth = newMonth;
    }
  }

  if (rightVisibleYear < leftVisibleYear) {
    if (leftVisibleMonth >= rightVisibleMonth) {
      const { newYear, newMonth } = moveDate(
        NAV_OPTIONS.NEXT_MONTH,
        leftVisibleYear,
        leftVisibleMonth
      );

      newRightVisibleYear = newYear;
      newRightVisibleMonth = newMonth;
    } else {
      newRightVisibleYear = leftVisibleYear;
    }
  }

  return {
    newRightVisibleYear,
    newRightVisibleMonth,
  };
};

/**
 * Handle right side calendar overlap over right side
 * when a user navigates dates.
 *
 * @param {string} leftVisibleMonth - The year value of the left side calendar.
 * @param {string} leftVisibleYear - The month value of the left side calendar.
 * @param {string} rightVisibleMonth - The year value of the right side calendar.
 * @param {string} rightVisibleYear - The month value of the right side calendar.
 * @param {string} action - The navigation action performed by the user.
 * @returns {object} - The year and month value with which to update the right side calendar.
 */
export const rightOverlapHandler = (
  leftVisibleMonth,
  leftVisibleYear,
  rightVisibleMonth,
  rightVisibleYear,
  action
) => {
  let newLeftVisibleYear = leftVisibleYear;
  let newLeftVisibleMonth = leftVisibleMonth;

  if (action === NAV_OPTIONS.NEXT_MONTH || action === NAV_OPTIONS.NEXT_YEAR) {
    return {
      newLeftVisibleYear,
      newLeftVisibleMonth,
    };
  }

  if (leftVisibleYear === rightVisibleYear) {
    if (rightVisibleMonth === leftVisibleMonth) {
      const { newYear, newMonth } = moveDate(
        NAV_OPTIONS.PREVIOUS_MONTH,
        leftVisibleYear,
        leftVisibleMonth
      );
      newLeftVisibleYear = newYear;
      newLeftVisibleMonth = newMonth;
    } else if (rightVisibleMonth < leftVisibleMonth) {
      const { newYear, newMonth } = moveDate(
        NAV_OPTIONS.PREVIOUS_MONTH,
        rightVisibleYear,
        rightVisibleMonth
      );
      newLeftVisibleYear = newYear;
      newLeftVisibleMonth = newMonth;
    }
  }
  if (rightVisibleYear < leftVisibleYear) {
    if (rightVisibleMonth <= leftVisibleMonth) {
      const { newYear, newMonth } = moveDate(
        NAV_OPTIONS.PREVIOUS_MONTH,
        rightVisibleYear,
        rightVisibleMonth
      );

      newLeftVisibleYear = newYear;
      newLeftVisibleMonth = newMonth;
    } else {
      newLeftVisibleYear = rightVisibleYear;
    }
  }
  return {
    newLeftVisibleYear,
    newLeftVisibleMonth,
  };
};

/**
 * Calculates dates to be passed to calendars, accounting for overlaps
 *
 * @param {string} leftVisibleMonth - The year value of the left side calendar.
 * @param {string} leftVisibleYear - The month value of the left side calendar.
 * @param {string} rightVisibleMonth - The year value of the right side calendar.
 * @param {string} rightVisibleYear - The month value of the right side calendar.
 * @param {string} position - Indicates which calendar triggered the action.
 * @param {string} action - The navigation action performed by the user.
 * @param {number} index - The index of the month clicked in the month selector.
 * @returns {object} - The year and month values with which to update the datepicker calendars.
 */

export const calculateConstrainedDates = (
  leftVisibleMonth,
  leftVisibleYear,
  rightVisibleMonth,
  rightVisibleYear,
  calendarPosition,
  action,
  index
) => {
  let newLeftVisibleYear = leftVisibleYear;
  let newLeftVisibleMonth = leftVisibleMonth;
  let newRightVisibleYear = rightVisibleYear;
  let newRightVisibleMonth = rightVisibleMonth;

  if (calendarPosition === "right") {
    const { newYear, newMonth } = moveDate(action, rightVisibleYear, rightVisibleMonth, index);

    newRightVisibleYear = newYear;
    newRightVisibleMonth = newMonth;

    const { newLeftVisibleYear: nlvy, newLeftVisibleMonth: nlvm } = rightOverlapHandler(
      leftVisibleMonth,
      leftVisibleYear,
      newRightVisibleMonth,
      newRightVisibleYear,
      action
    );
    newLeftVisibleYear = nlvy;
    newLeftVisibleMonth = nlvm;
  } else {
    const { newYear: leftSideNewYear, newMonth: leftSideNewMonth } = moveDate(
      action,
      leftVisibleYear,
      leftVisibleMonth,
      index
    );

    newLeftVisibleYear = leftSideNewYear;
    newLeftVisibleMonth = leftSideNewMonth;

    const { newRightVisibleYear: nrvy, newRightVisibleMonth: nrvm } = leftOverlapHandler(
      leftSideNewMonth,
      leftSideNewYear,
      newRightVisibleMonth,
      newRightVisibleYear,
      action
    );

    newRightVisibleYear = nrvy;
    newRightVisibleMonth = nrvm;
  }

  return {
    updatedVisibleMonth: newLeftVisibleMonth,
    updatedVisibleYear: newLeftVisibleYear,
    updatedRightVisibleMonth: newRightVisibleMonth,
    updatedRightVisibleYear: newRightVisibleYear,
  };
};
