import { NAV_OPTIONS } from "./enums";
import { getPreviousMonth, getNextMonth, createDatesArray } from "./utils";

/**
 * Calendar builder for a specific month and year.
 * Returns an array of date objects.
 */
export default class CalendarModel {
  constructor(month, year) {
    this.updateModel(month, year);
  }

  /**
   * Updates the model with the received month and year
   *
   * @param {number} month - Number of the month.
   * @param {number} year - Number of the year. *
   * @memberOf CalendarModel
   */
  updateModel = (month, year) => {
    let validMonth = month;
    let validYear = year;
    if (!Number.isInteger(validMonth)) {
      validMonth = new Date().getMonth() + 1;
    }
    if (!Number.isInteger(validYear)) {
      validYear = new Date().getFullYear();
    }

    this.month = validMonth;
    this.year = validYear;
    this.dates = createDatesArray(validMonth, validYear);
  };

  /**
   * Navigates to the new date according to the received navigation option.
   *
   * @param {string} navOptions - The option to where the navigation should occur.
   * @param {number} [month=1] - The month to where the navigation should occur in case the navOptions is set
   * to `MONTH`.
   * @param year {number}  The year to where the navigation should occur in case the navOptions is set
   * to `YEAR`.
   * @returns {CalendarModel}
   */
  navigateTo = (navOptions, month = 1, year = 2000) => {
    let newMonthYear;

    switch (navOptions) {
      case NAV_OPTIONS.PREVIOUS_MONTH:
        newMonthYear = getPreviousMonth(this.month, this.year);
        break;
      default:
      case NAV_OPTIONS.NEXT_MONTH:
        newMonthYear = getNextMonth(this.month, this.year);
        break;
      case NAV_OPTIONS.PREVIOUS_YEAR:
        newMonthYear = { month: this.month, year: this.year - 1 };
        break;
      case NAV_OPTIONS.NEXT_YEAR:
        newMonthYear = { month: this.month, year: this.year + 1 };
        break;
      case NAV_OPTIONS.MONTH:
        newMonthYear = { month, year: this.year };
        break;
      case NAV_OPTIONS.MONTH_YEAR:
        newMonthYear = { month, year };
        break;
    }

    // this.updateModel(newMonthYear.month, newMonthYear.year);

    // return this;

    return newMonthYear;
  };
}
