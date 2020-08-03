/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import { isKeypress, KeyboardCodes, setId } from "../utils";
import HvTypography from "../Typography";
import Header from "./Header";
import Navigation from "./Navigation";
import styles from "./styles";

import { NAV_OPTIONS, REPRESENTATION_VALUES, VIEW_MODE } from "./enums";
import {
  DEFAULT_LOCALE,
  getDateISO,
  getFormattedDate,
  getMonthNamesList,
  getWeekdayNamesList,
  isDate,
  isDateInValidRange,
  isNextDateValid,
  isPreviousDateValid,
  isSameDay,
  isSameMonth,
  isValidLocale,
  makeUTCDate,
  makeUTCToday,
  dateInValueRange,
  checkIfDateIsDisabled
} from "./utils";

import CalendarModel from "./model";
import withTooltip from "../withTooltip";

const HvCalendar = ({
  classes,
  id,
  locale,
  selectedDate,
  visibleDate,
  visibleMonth,
  visibleYear,
  valueRange,
  minimumDate,
  maximumDate,
  handleDateChange,
  handleVisibleDateChange,
  rangeMode,
  label,
  ...others
}) => {
  // ToDo: Implement interaction tests in component

  // used to place a css relative rule to control calendar display
  const { inDatepicker } = others;

  const validateLocale = useCallback(() => (isValidLocale(locale) ? locale : DEFAULT_LOCALE), [
    locale
  ]);
  // Hooks used to maintain state
  const [calLocale, setCalLocale] = useState(validateLocale(locale));
  const [dateSelected, setDateSelected] = useState();
  const [calViewMode, setCalViewMode] = useState();
  const [today, setToday] = useState(VIEW_MODE.CALENDAR);

  // set today date
  useEffect(() => {
    setToday(makeUTCToday());
  }, []);

  // set calendar view mode
  useEffect(() => {
    setCalViewMode(VIEW_MODE.CALENDAR);
  }, []);

  /**
   * Resolves the state using the received date.
   *
   * @param {Date} selectedDate - The date that will be used to set the selected date.
   * @param {Date} visibleDate - The date that will be used to set the currently visible month and year.
   * @returns {{
   *  selectedDate {Date} - Currently selected date
   *  calendarModel {CalendarModel} - Object representing the current calendar.
   *  viewMode {REPRESENTATION_VALUE} - Visualization mode currently active.
   * }}
   * @memberOf Calendar
   */

  const dateObjectValidator = (selectionDate, visDate) => {
    const isDateObject = isDate(selectionDate);
    const validSelectedDate = isDateObject ? selectionDate : makeUTCToday();
    const validVisibleDate = isDate(visDate) ? visDate : validSelectedDate;
    return {
      isDateObject,
      validSelectedDate,
      validVisibleDate
    };
  };

  const retrieveCalendarModel = () => {
    const { validVisibleDate } = dateObjectValidator(selectedDate);

    const validatedVisibleMonth =
      visibleMonth !== undefined ? visibleMonth : validVisibleDate.getUTCMonth() + 1;
    const validatedVisibleYear =
      visibleYear !== undefined ? visibleYear : validVisibleDate.getUTCFullYear();

    return new CalendarModel(validatedVisibleMonth, validatedVisibleYear);
  };
  const [calModel, setCalModel] = useState(retrieveCalendarModel());

  const resolveStateFromDates = (selectionDate, visDate = null) => {
    const { isDateObject, validVisibleDate } = dateObjectValidator(selectionDate, visDate);

    const calcVisibleMonth = validVisibleDate.getUTCMonth() + 1;
    const calcVisibleYear = validVisibleDate.getUTCFullYear();
    const validLocale = isValidLocale(calLocale) ? calLocale : DEFAULT_LOCALE;

    setDateSelected(isDateObject ? selectionDate : null);
    setCalModel(new CalendarModel(calcVisibleMonth, calcVisibleYear));
    setCalViewMode(VIEW_MODE.CALENDAR);
    setCalLocale(validLocale);
  };

  // set selected date
  useEffect(() => {
    setDateSelected(selectedDate);
    // update calModel
    setCalModel(retrieveCalendarModel());
  }, [selectedDate]);

  /**
   * Initializes the lists with the localized names for the months are weekday names.
   *
   * @memberOf Calendar
   */
  const listMonthNamesLong = getMonthNamesList(calLocale, REPRESENTATION_VALUES.LONG);
  const listMonthNamesShort = getMonthNamesList(calLocale, REPRESENTATION_VALUES.SHORT);
  const listWeekdayNamesNarrow = getWeekdayNamesList(calLocale, REPRESENTATION_VALUES.NARROW);

  /**
   * Sets the passed date, calling the callback from the DatePicker.
   *
   * @param date
   * @param shouldCloseCalendar
   */
  const changeSelectDate = (date, shouldCloseCalendar = true) => {
    resolveStateFromDates(date);
    handleDateChange?.(date, shouldCloseCalendar);
  };

  const changeSelectedDateHeader = (date, shouldCloseCalendar) =>
    changeSelectDate(date, shouldCloseCalendar);

  /**
   * Sets the state to the received date and triggers the `handleDateChange` callback in case it was defined.
   *
   * @param {Date} date - The date to which the state will be changed to.
   * @memberOf Calendar
   */
  const selectDate = date => event => {
    event?.preventDefault();
    changeSelectDate(date);
  };

  /**
   * Triggers the callback to warn that the visible date was changed.
   *
   * @memberOf Calendar
   */
  const visibleDateChanged = () => {
    if (typeof handleVisibleDateChange === "function") {
      const changedVisibleDate = makeUTCDate(calModel.year, calModel.month, 1);
      handleVisibleDateChange(changedVisibleDate);
    }
  };

  /**
   * Navigates through the calendar according to the received navigation options.
   *
   * @param navOption- Navigation option.
   * @param month - Number of the month.
   * @memberOf Calendar
   */
  const navigateTo = (navOption, month) => {
    const newDates = calModel.navigateTo(navOption, month);

    setCalModel(new CalendarModel(newDates.month, newDates.year));
    setCalViewMode(VIEW_MODE.CALENDAR);

    visibleDateChanged();
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

  /**
   * Renders the Month and Year navigation controls.
   *
   * @memberOf Calendar
   */
  const renderNavigation = () => {
    const { year, month } = calModel;

    const monthName = listMonthNamesLong[month - 1];
    const previousYearValid = isPreviousDateValid(year, 1);
    const nextYearValid = isNextDateValid(year, 12);
    const previousMonthValid = isPreviousDateValid(year, month);
    const nextMonthValid = isNextDateValid(year, month);

    return (
      <div className={classes.navigationContainer}>
        <div className={classes.navigationMonth}>
          <Navigation
            id={setId(id, "navigation-month")}
            navigationText={monthName}
            onNavigatePrevious={() => {
              navigateTo(NAV_OPTIONS.PREVIOUS_MONTH);
            }}
            onNavigateNext={() => navigateTo(NAV_OPTIONS.NEXT_MONTH)}
            onTextClick={() => {
              setCalViewMode(VIEW_MODE.MONTHLY);
            }}
            className={classes.navigationMonth}
            isPreviousEnabled={previousMonthValid}
            isNextEnabled={nextMonthValid}
          />
        </div>

        <Navigation
          id={setId(id, "navigation-year")}
          navigationText={year.toString()}
          onNavigatePrevious={() => navigateTo(NAV_OPTIONS.PREVIOUS_YEAR)}
          onNavigateNext={() => navigateTo(NAV_OPTIONS.NEXT_YEAR)}
          isPreviousEnabled={previousYearValid}
          isNextEnabled={nextYearValid}
        />
      </div>
    );
  };

  /**
   * Renders the elements for the week day names.
   *
   * @memberOf Calendar
   */
  const renderDayLabel = () => {
    return listWeekdayNamesNarrow.map((dayName, index) => {
      const key = `${dayName}-${index}`;
      return (
        <HvTypography
          variant="highlightText"
          className={classes.calendarDay}
          key={key}
          index={index}
        >
          {dayName}
        </HvTypography>
      );
    });
  };

  const arrowKeysFocus = (event, onClickFunc, rowLength) => {
    if (isKeypress(event, KeyboardCodes.ArrowLeft)) {
      event.preventDefault();
      document.activeElement.previousSibling.focus();
    }
    if (isKeypress(event, KeyboardCodes.ArrowRight)) {
      event.preventDefault();
      document.activeElement.nextSibling.focus();
    }
    if (isKeypress(event, KeyboardCodes.ArrowUp)) {
      event.preventDefault();
      let element = document.activeElement;
      for (let i = 0; i < rowLength; i += 1) {
        element = element.previousSibling;
      }
      element.focus();
    }
    if (isKeypress(event, KeyboardCodes.ArrowDown)) {
      event.preventDefault();
      let element = document.activeElement;
      for (let i = 0; i < rowLength; i += 1) {
        element = element.nextSibling;
      }
      element.focus();
    }
    if (isKeypress(event, KeyboardCodes.Enter)) {
      onClickFunc();
    }
  };

  /**
   * Renders the element representing the received date.
   *
   * @param currentDate - The array representing the date [YYYY, MM, DD].
   * @memberOf Calendar
   */
  const renderCalendarDate = currentDate => {
    // Checks if the received date is the same as today.
    const isToday = isSameDay(currentDate, today);

    // Checks if the received date is the same as the currently selected date.
    const isCurrent = dateSelected && isSameDay(currentDate, dateSelected);

    // Checks if the received date is in the same month and year the current month and year in the state.
    const inMonth =
      calModel.month &&
      calModel.year &&
      isSameMonth(currentDate, makeUTCDate(calModel.year, calModel.month, 1));

    // Checks if the date is in a valid range
    const dateInValidRange = isDateInValidRange(currentDate);

    // Checks if the date falls within a provided selection range
    const dateInProvidedSelectionRange = valueRange
      ? dateInValueRange(currentDate, valueRange)
      : false;

    const isDateDisabled =
      minimumDate || maximumDate
        ? checkIfDateIsDisabled(currentDate, minimumDate, maximumDate)
        : false;

    const onClickFunc = dateInValidRange ? selectDate(currentDate) : undefined;

    const DateDisplay = () => (
      <div
        className={classes.focusSelection}
        onClick={!isDateDisabled ? onClickFunc : undefined}
        onKeyDown={event => arrowKeysFocus(event, onClickFunc, 7)}
        role="presentation"
        tabIndex={0}
      >
        <HvTypography
          variant={isToday ? "highlightText" : "normalText"}
          className={clsx(classes.calendarDate, {
            [classes.calendarDateSelected]: isCurrent,
            [classes.calendarDateNotInMonth]: !inMonth,
            [classes.calendarDateInSelectionRange]: dateInProvidedSelectionRange,
            [classes.calendarDateDisabled]: isDateDisabled,
            [classes.calendarDateInvalid]: !dateInValidRange
          })}
        >
          {currentDate.getUTCDate()}
        </HvTypography>
      </div>
    );

    const DateTooltipWrapper = withTooltip(DateDisplay, getFormattedDate(currentDate, locale));

    return <DateTooltipWrapper key={getDateISO(currentDate)} />;
  };

  /**
   * Renders the header element.
   *
   * @memberOf Calendar
   */
  const renderHeader = () => {
    let headerInputDate;
    if (visibleMonth !== undefined && visibleYear !== undefined) {
      headerInputDate = new Date();
      headerInputDate.setMonth(visibleMonth - 1);
      headerInputDate.setFullYear(visibleYear);
    }

    return (
      <Header
        id={id}
        inputDate={headerInputDate || dateSelected || makeUTCToday()}
        locale={calLocale}
        topText={label}
        onSelection={changeSelectedDateHeader}
      />
    );
  };

  /**
   * Renders the monthly view. This view is used when pressing the month.
   *
   * @memberOf Calendar
   */
  const renderMonthlyView = () => {
    return (
      <div
        className={`${classes.calendarMonthlyGrid} ${
          rangeMode ? classes.rangeModeWidth : classes.normalWidth
        }`}
      >
        {listMonthNamesShort.map((monthName, index) => {
          const key = `${monthName}-${index}`;
          let className = `${classes.calendarMonthlyCell}`;
          if (index + 1 === calModel.month) {
            className += ` ${classes.calendarMonthlyCellSelected}`;
          }
          const onClick = () => navigateTo(NAV_OPTIONS.MONTH, index + 1);
          return (
            <div
              className={classes.focusSelection}
              key={key}
              role="presentation"
              onClick={onClick}
              onKeyDown={event => arrowKeysFocus(event, onClick, 3)}
              tabIndex={0}
            >
              <HvTypography variant="normalText" className={className}>
                {monthName}
              </HvTypography>
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * Renders the content according to the viewMode of the calendar.
   *
   * @memberOf Calendar
   */
  const renderContent = () => {
    return (
      <>
        {calViewMode === VIEW_MODE.CALENDAR && renderNavigation()}
        {calViewMode === VIEW_MODE.MONTHLY && renderMonthlyView()}
        <div className={classes.calendarGrid}>
          {renderDayLabel()}
          {calModel.dates.map(renderCalendarDate)}
        </div>
      </>
    );
  };

  return (
    <div
      className={clsx(classes.calendarContainer, {
        [classes.relativeWrapper]: !inDatepicker
      })}
    >
      <div id={id} className={classes.calendarWrapper}>
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  );
};

HvCalendar.propTypes = {
  /**
   * Styles applied from the theme.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * Locale to be used by the calendar.
   */
  locale: PropTypes.string,
  /**
   * Date that should be used as the starting selected date for the calendar.
   */
  selectedDate: PropTypes.instanceOf(Date),
  /**
   * Date that will be used to know which month and year should be displayed on the calendar. The value of the day is
   * irrelevant.
   */
  visibleDate: PropTypes.instanceOf(Date),
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth: PropTypes.string,
  /**
   * Controls the visible month of the Calendar
   */
  visibleYear: PropTypes.string,
  /**
   * Callback function to be triggered when the selected date has changed.
   */
  handleDateChange: PropTypes.func,
  /**
   * Callback function to be triggered when visible date has changed.
   */
  handleVisibleDateChange: PropTypes.func,
  /**
   * Indicates if the calendar is being used in ranged mode.
   */
  rangeMode: PropTypes.bool,
  /**
   * Text to show in the header on range mode.
   */
  label: PropTypes.string,
  /**
   * Controls the current highlighted dates of the calendar.
   */
  valueRange: PropTypes.instanceOf(Object),
  /**
   * The maximum selectable date after this all values are disabled.
   */
  maximumDate: PropTypes.string,
  /**
   * The minimum selectable date before this all values are disabled.
   */
  minimumDate: PropTypes.string
};

HvCalendar.defaultProps = {
  id: undefined,
  locale: DEFAULT_LOCALE,
  selectedDate: undefined,
  visibleDate: undefined,
  handleDateChange: undefined,
  handleVisibleDateChange: undefined,
  rangeMode: false,
  label: null
};

export default withStyles(styles, { name: "HvCalendar" })(HvCalendar);
