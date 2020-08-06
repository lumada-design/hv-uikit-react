/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
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
  makeUTCToday
} from "./utils";

import CalendarModel from "./model";
import withTooltip from "../withTooltip";

const HvCalendar = ({
  classes,
  id,
  locale,
  selectedDate,
  visibleDate,
  handleDateChange,
  handleVisibleDateChange,
  rangeMode,
  label,
  ...others
}) => {
  /**
   * Triggered right before the Render() function of the components.
   * Here we can update the state when a prop is changed.
   * In this case we want to update the calendar state if the selectedDate in the Props is different from the one in
   * the state.
   *
   * @static
   * @param {Object} props - The new props object.
   * @param {Object} state - The current state object.
   *
   * @returns {Object} - The updated state
   * @memberOf Calendar
   */

  const validateLocale = useCallback(() => (isValidLocale(locale) ? locale : DEFAULT_LOCALE), [
    locale
  ]);

  // TODO: refactor to make more general
  const retrieveCalendarModel = () => {
    const isDateObject = isDate(selectedDate);
    const validSelectedDate = isDateObject ? selectedDate : makeUTCToday();
    const validVisibleDate = isDate(visibleDate) ? visibleDate : validSelectedDate;
    const visibleMonth = validVisibleDate.getUTCMonth() + 1;
    const visibleYear = validVisibleDate.getUTCFullYear();

    return new CalendarModel(visibleMonth, visibleYear);
  };

  const [calModel, setCalModel] = useState(retrieveCalendarModel());

  const [dateSelected, setDateSelected] = useState(selectedDate);
  const [calLocale, setCalLocale] = useState(validateLocale(locale));

  /**
   * Initializes the lists with the localized names for the months are weekday names.
   *
   * @memberOf Calendar
   */
  const listMonthNamesLong = getMonthNamesList(calLocale, REPRESENTATION_VALUES.LONG);
  const listMonthNamesShort = getMonthNamesList(calLocale, REPRESENTATION_VALUES.SHORT);
  const listWeekdayNamesNarrow = getWeekdayNamesList(calLocale, REPRESENTATION_VALUES.NARROW);

  // retrieve Calendar view Model
  const [calViewMode, setCalViewMode] = useState();

  const [today, setToday] = useState();
  const [dateVisible, setDateVisible] = useState(visibleDate);

  // set today date
  useEffect(() => {
    setToday(makeUTCToday());
  }, []);

  // set calendar view mode
  useEffect(() => {
    setCalViewMode(VIEW_MODE.CALENDAR);
  }, []);

  useEffect(() => {
    setCalViewMode(VIEW_MODE.CALENDAR);
  }, [calViewMode]);

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
  const resolveStateFromDates = (selectionDate, visDate = null) => {
    const isDateObject = isDate(selectionDate);
    const validSelectedDate = isDateObject ? selectionDate : makeUTCToday();
    const validVisibleDate = isDate(visDate) ? visDate : validSelectedDate;

    const visibleMonth = validVisibleDate.getUTCMonth() + 1;
    const visibleYear = validVisibleDate.getUTCFullYear();
    const validLocale = isValidLocale(calLocale) ? calLocale : DEFAULT_LOCALE;

    setDateSelected(isDateObject ? selectionDate : null);
    setDateVisible(validVisibleDate);
    setCalModel(new CalendarModel(visibleMonth, visibleYear));
    setCalViewMode(VIEW_MODE.CALENDAR);
    setCalLocale(validLocale);
  };

  /**
   * Sets the passed date, calling the callback from the DatePicker.
   *
   * @param date
   * @param shouldCloseCalendar
   */
  const changeSelectDate = (date, shouldCloseCalendar = true) => {
    resolveStateFromDates(date);

    if (typeof handleDateChange === "function") {
      handleDateChange(date, shouldCloseCalendar);
    }
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
    if (event) {
      event.preventDefault();
    }
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

    // calcNavigateTo(navOption, month);
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
    // const { calendarModel } = this.state;
    // const { classes, id } = this.props;
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
            onTextClick={() => setCalViewMode(VIEW_MODE.MONTHLY)}
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

    // Sets the initial class as `calendarDate` and then adds the rest of the classes according to the state.
    let className = `${classes.calendarDate}`;
    let typographyVariant = "normalText";

    if (isCurrent) {
      className += ` ${classes.calendarDateSelected}`;
    } else if (isToday) {
      typographyVariant = "highlightText";
    } else if (!inMonth) {
      className += ` ${classes.calendarDateNotInMonth}`;
    }

    const onClickFunc = dateInValidRange ? selectDate(currentDate) : undefined;

    const DateDisplay = () => (
      <div
        className={classes.focusSelection}
        onClick={onClickFunc}
        onKeyDown={event => arrowKeysFocus(event, onClickFunc, 7)}
        role="presentation"
        tabIndex={0}
      >
        <HvTypography
          variant={typographyVariant}
          className={`${className} ${dateInValidRange ? "" : classes.calendarDateInvalid}`}
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
    return (
      <Header
        id={id}
        inputDate={dateSelected || makeUTCToday()}
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
    <div className={classes.calendarContainer}>
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
  label: PropTypes.string
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
