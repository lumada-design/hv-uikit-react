/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { isKeypress, KeyboardCodes, setId } from "../../utils";
import HvTypography from "../../Typography";
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
import withTooltip from "../../withTooltip";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.resolveStateFromProps(), today: makeUTCToday() };

    this.initLocalizedLabels();
  }

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
  static getDerivedStateFromProps(props, state) {
    if (isDate(props.selectedDate) && !isSameDay(props.selectedDate, state.selectedDate)) {
      const newState = {};
      newState.selectedDate = props.selectedDate;

      if (!isSameMonth(props.selectedDate, state.visibleDate)) {
        const newVisibleDate = props.selectedDate;
        const visibleMonth = newVisibleDate.getUTCMonth() + 1;
        const visibleYear = newVisibleDate.getUTCFullYear();

        newState.visibleDate = newVisibleDate;
        newState.calendarModel = state.calendarModel.navigateTo(
          NAV_OPTIONS.MONTH_YEAR,
          visibleMonth,
          visibleYear
        );
      }

      return newState;
    }
    return null;
  }

  /**
   * Initializes the lists with the localized names for the months are weekday names.
   *
   * @memberOf Calendar
   */
  initLocalizedLabels = () => {
    const { locale } = this.state;

    this.listMonthNamesLong = getMonthNamesList(locale, REPRESENTATION_VALUES.LONG);
    this.listMonthNamesShort = getMonthNamesList(locale, REPRESENTATION_VALUES.SHORT);
    this.listWeekdayNamesNarrow = getWeekdayNamesList(locale, REPRESENTATION_VALUES.NARROW);
    this.listWeekdayNamesLong = getWeekdayNamesList(locale, REPRESENTATION_VALUES.LONG);
  };

  changeSelectedDateHeader = (date, shouldCloseCalendar) =>
    this.changeSelectDate(date, shouldCloseCalendar);

  /**
   * Sets the passed date, calling the callback from the DatePicker.
   *
   * @param date
   * @param shouldCloseCalendar
   */
  changeSelectDate = (date, shouldCloseCalendar = true) => {
    const { handleDateChange } = this.props;
    this.setState(this.resolveStateFromDates(date));

    if (typeof handleDateChange === "function") {
      handleDateChange(date, shouldCloseCalendar);
    }
  };

  /**
   * Sets the state to the received date and triggers the `handleDateChange` callback in case it was defined.
   *
   * @param {Date} date - The date to which the state will be changed to.
   * @memberOf Calendar
   */
  selectDate = date => event => {
    if (event) {
      event.preventDefault();
    }
    this.changeSelectDate(date);
  };

  /**
   * Navigates through the calendar according to the received navigation options.
   *
   * @param navOption- Navigation option.
   * @param month - Number of the month.
   * @memberOf Calendar
   */
  navigateTo = (navOption, month) => {
    const { calendarModel } = this.state;

    this.setState(
      {
        calendarModel: calendarModel.navigateTo(navOption, month),
        viewMode: VIEW_MODE.CALENDAR
      },
      this.visibleDateChanged()
    );
  };

  /**
   * Triggers the callback to warn that the visible date was changed.
   *
   * @memberOf Calendar
   */
  visibleDateChanged = () => {
    const { calendarModel } = this.state;
    const { handleVisibleDateChange } = this.props;

    if (typeof handleVisibleDateChange === "function") {
      const visibleDate = makeUTCDate(calendarModel.year, calendarModel.month, 1);
      handleVisibleDateChange(visibleDate);
    }
  };

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
  resolveStateFromDates = (selectedDate, visibleDate) => {
    const { locale } = this.props;

    const isDateObject = isDate(selectedDate);
    const validSelectedDate = isDateObject ? selectedDate : makeUTCToday();
    const validVisibleDate = isDate(visibleDate) ? visibleDate : validSelectedDate;

    const visibleMonth = validVisibleDate.getUTCMonth() + 1;
    const visibleYear = validVisibleDate.getUTCFullYear();
    const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

    return {
      selectedDate: isDateObject ? selectedDate : null,
      visibleDate: validVisibleDate,
      calendarModel: new CalendarModel(visibleMonth, visibleYear),
      viewMode: VIEW_MODE.CALENDAR,
      locale: validLocale
    };
  };

  /**
   * Resolves the state using the `selectedDate` and `visibleDate` properties.
   *
   * @memberOf Calendar
   */
  resolveStateFromProps = () => {
    const { selectedDate, visibleDate } = this.props;

    return this.resolveStateFromDates(selectedDate, visibleDate);
  };

  /**
   * Renders the Month and Year navigation controls.
   *
   * @memberOf Calendar
   */
  renderNavigation = () => {
    const { calendarModel } = this.state;
    const { classes, id } = this.props;
    const { year, month } = calendarModel;

    const monthName = this.listMonthNamesLong[month - 1];
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
              this.navigateTo(NAV_OPTIONS.PREVIOUS_MONTH);
            }}
            onNavigateNext={() => this.navigateTo(NAV_OPTIONS.NEXT_MONTH)}
            onTextClick={() => this.setState({ viewMode: VIEW_MODE.MONTHLY })}
            className={classes.navigationMonth}
            isPreviousEnabled={previousMonthValid}
            isNextEnabled={nextMonthValid}
          />
        </div>

        <Navigation
          id={setId(id, "navigation-year")}
          navigationText={year.toString()}
          onNavigatePrevious={() => this.navigateTo(NAV_OPTIONS.PREVIOUS_YEAR)}
          onNavigateNext={() => this.navigateTo(NAV_OPTIONS.NEXT_YEAR)}
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
  renderDayLabel = () => {
    const { classes } = this.props;

    return this.listWeekdayNamesNarrow.map((dayName, index) => {
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

  arrowKeysFocus = (event, onClickFunc, rowLenght) => {
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
      for (let i = 0; i < rowLenght; i += 1) {
        element = element.previousSibling;
      }
      element.focus();
    }
    if (isKeypress(event, KeyboardCodes.ArrowDown)) {
      event.preventDefault();
      let element = document.activeElement;
      for (let i = 0; i < rowLenght; i += 1) {
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
  renderCalendarDate = currentDate => {
    const { selectedDate, calendarModel, today, locale } = this.state;
    const { classes } = this.props;

    // Checks if the received date is the same as today.
    const isToday = isSameDay(currentDate, today);

    // Checks if the received date is the same as the currently selected date.
    const isCurrent = selectedDate && isSameDay(currentDate, selectedDate);

    // Checks if the received date is in the same month and year the current month and year in the state.
    const inMonth =
      calendarModel.month &&
      calendarModel.year &&
      isSameMonth(currentDate, makeUTCDate(calendarModel.year, calendarModel.month, 1));

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

    const onClickFunc = dateInValidRange ? this.selectDate(currentDate) : undefined;

    const DateDisplay = () => (
      <div
        key={getDateISO(currentDate)}
        onClick={onClickFunc}
        onKeyDown={event => this.arrowKeysFocus(event, onClickFunc, 7)}
        role="presentation"
        title={getFormattedDate(currentDate, locale)}
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

    return <DateTooltipWrapper />;
  };

  /**
   * Renders the header element.
   *
   * @memberOf Calendar
   */
  renderHeader = () => {
    const { selectedDate } = this.state;
    const { label, locale, id } = this.props;

    return (
      <Header
        id={id}
        inputDate={selectedDate || makeUTCToday()}
        locale={locale}
        topText={label}
        onSelection={this.changeSelectedDateHeader}
      />
    );
  };

  arrowKeysFocus = (event, onClickFunc) => {
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
      for (let i = 0; i < 3; i += 1) {
        element = element.previousSibling;
      }
      element.focus();
    }
    if (isKeypress(event, KeyboardCodes.ArrowDown)) {
      event.preventDefault();
      let element = document.activeElement;
      for (let i = 0; i < 3; i += 1) {
        element = element.nextSibling;
      }
      element.focus();
    }
    if (isKeypress(event, KeyboardCodes.Enter)) {
      onClickFunc();
    }
  };

  /**
   * Renders the monthly view. This view is used when pressing the month.
   *
   * @memberOf Calendar
   */
  renderMonthlyView = () => {
    const { classes, rangeMode } = this.props;
    const { calendarModel } = this.state;

    return (
      <div
        className={`${classes.calendarMonthlyGrid} ${
          rangeMode ? classes.rangeModeWidth : classes.normalWidth
        }`}
      >
        {this.listMonthNamesShort.map((monthName, index) => {
          const key = `${monthName}-${index}`;
          let className = `${classes.calendarMonthlyCell}`;
          if (index + 1 === calendarModel.month) {
            className += ` ${classes.calendarMonthlyCellSelected}`;
          }
          const onClick = () => this.navigateTo(NAV_OPTIONS.MONTH, index + 1);
          return (
            <div
              key={key}
              role="presentation"
              onClick={onClick}
              onKeyDown={event => this.arrowKeysFocus(event, onClick, 3)}
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
  renderContent = () => {
    const { classes } = this.props;
    const { viewMode, calendarModel } = this.state;

    return (
      <>
        {viewMode === VIEW_MODE.CALENDAR && this.renderNavigation()}
        {viewMode === VIEW_MODE.MONTHLY && this.renderMonthlyView()}
        <div className={classes.calendarGrid}>
          {this.renderDayLabel()}
          {calendarModel.dates.map(this.renderCalendarDate)}
        </div>
      </>
    );
  };

  render() {
    const { classes, id } = this.props;
    return (
      <div id={id} className={classes.calendarWrapper}>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

Calendar.propTypes = {
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

Calendar.defaultProps = {
  id: undefined,
  locale: DEFAULT_LOCALE,
  selectedDate: undefined,
  visibleDate: undefined,
  handleDateChange: undefined,
  handleVisibleDateChange: undefined,
  rangeMode: false,
  label: null
};

export default withStyles(styles, { name: "HvDatePickerCalendar" })(Calendar);
