/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

import Header from "./Header";
import Navigation from "./Navigation";
import Actions from "./Actions";

import { VIEW_MODE, REPRESENTATION_VALUES, NAV_OPTIONS } from "./enums";
import {
  isDate,
  isSameDay,
  isSameMonth,
  getDateISO,
  getFormattedDate,
  getMonthNamesList,
  getWeekdayNamesList,
  getWeekdayName,
  makeUTCDate,
  makeUTCToday
} from "./utils";

import CalendarModel from "./model";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.initLocalizedLabels();

    this.state = { ...this.resolveStateFromProp(), today: makeUTCToday() };
  }

  /**
   * Initializes the lists with the localized names for the months are weekday names.
   *
   * @memberof Calendar
   */
  initLocalizedLabels = () => {
    const { locale } = this.props;

    this.listMonthNamesLong = getMonthNamesList(
      locale,
      REPRESENTATION_VALUES.LONG
    );
    this.listMonthNamesShort = getMonthNamesList(
      locale,
      REPRESENTATION_VALUES.SHORT
    );
    this.listWeekdayNamesNarrow = getWeekdayNamesList(
      locale,
      REPRESENTATION_VALUES.NARROW
    );
    this.listWeekdayNamesLong = getWeekdayNamesList(
      locale,
      REPRESENTATION_VALUES.LONG
    );
  };

  /**
   * Sets the state to the received date and triggers the `handleDateChange` callback in case it was defined.
   *
   * @param {Date} date - The date to which the state will be changed to.
   * @memberof Calendar
   */
  selectDate = date => event => {
    if (event) {
      event.preventDefault();
    }

    const { selectedDate } = this.state;
    const { handleDateChange } = this.props;

    if (!(selectedDate && isSameDay(date, selectedDate))) {
      this.setState(this.resolveStateFromDate(date));

      if (typeof handleDateChange === "function") {
        handleDateChange(date);
      }
    }
  };

  /**
   * Navigates through the calendar according to the recieved navitaion options.
   *
   * @param {NAV_OPTIONS} - Navigation option.
   * @param {number} - Number of the month.
   * @memberof Calendar
   */
  navigateTo = (navOption, month) => {
    const { calendarModel } = this.state;
    this.setState({
      calendarModel: calendarModel.navigateTo(navOption, month),
      viewMode: VIEW_MODE.CALENDAR
    });
  };

  /**
   * Resolves the state using the received date.
   *
   * @param {Date} date - The date into which the state will be resolved to.
   * @memberof Calendar {{
   *  selectedDate {Date} - Currently selected date
   *  calendarModel {CalendarModel} - Object representing the current calendar.
   *  formattedDate {string} - Currently selected date formatted according to Design System requirements.
   *  viewMode {REPRESENTATION_VALUE} - Visualization mode currently active.
   * }}
   */
  resolveStateFromDate = date => {
    const { locale } = this.props;
    const isDateObject = isDate(date);
    const newDate = isDateObject ? date : makeUTCToday();
    const month = newDate.getUTCMonth() + 1;

    return {
      calendarModel: new CalendarModel(month, newDate.getUTCFullYear()),
      selectedDate: newDate,
      formattedDate: getFormattedDate(newDate, locale),
      viewMode: VIEW_MODE.CALENDAR
    };
  };

  /**
   * Resolves the state using the `initialDate` property.
   *
   * @memberof Calendar
   */
  resolveStateFromProp = () => {
    const { initialDate } = this.props;

    return this.resolveStateFromDate(initialDate);
  };

  /**
   * Renders the Month and Year navigation controls.
   *
   * @memberof Calendar
   */
  renderNavigation = () => {
    const { calendarModel } = this.state;
    const { classes } = this.props;

    const monthName = this.listMonthNamesLong[calendarModel.month - 1];

    return (
      <div className={classes.navigationContainer}>
        <div className={classes.navigationMonth}>
          <Navigation
            navigationText={monthName}
            onNavigatePrevious={() =>
              this.navigateTo(NAV_OPTIONS.PREVIOUS_MONTH)
            }
            onNavigateNext={() => this.navigateTo(NAV_OPTIONS.NEXT_MONTH)}
            onTextClick={() => this.setState({ viewMode: VIEW_MODE.MONTHLY })}
            className={classes.navigationMonth}
          />
        </div>

        <Navigation
          navigationText={calendarModel.year.toString()}
          onNavigatePrevious={() => this.navigateTo(NAV_OPTIONS.PREVIOUS_YEAR)}
          onNavigateNext={() => this.navigateTo(NAV_OPTIONS.NEXT_YEAR)}
        />
      </div>
    );
  };

  /**
   * Renders the elements for the week day names.
   *
   * @memberof Calendar
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

  /**
   * Renders the element representing the recieved date.
   *
   * @param {Array} dateArray - The array representing the date [YYYY, MM, DD].
   * @memberof Calendar
   */
  renderCalendarDate = currentDate => {
    const { selectedDate, calendarModel, today } = this.state;
    const { classes, locale } = this.props;

    // Checks if the received date is the same as today.
    const isToday = isSameDay(currentDate, today);

    // Checks if the received date is the same as the currently selected date.
    const isCurrent = selectedDate && isSameDay(currentDate, selectedDate);

    // Checks if the received date is in the same month and year the current month and year in the state.
    const inMonth =
      calendarModel.month &&
      calendarModel.year &&
      isSameMonth(
        currentDate,
        makeUTCDate(calendarModel.year, calendarModel.month, 1)
      );

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

    return (
      <div
        key={getDateISO(currentDate)}
        onClick={this.selectDate(currentDate)}
        role="presentation"
        title={getFormattedDate(currentDate, locale)}
      >
        <HvTypography variant={typographyVariant} className={className}>
          {currentDate.getUTCDate()}
        </HvTypography>
      </div>
    );
  };

  /**
   * Renders the header element.
   *
   * @memberof Calendar
   */
  renderHeader = () => {
    const { locale } = this.props;
    const { formattedDate, selectedDate } = this.state;

    const weekDayName = getWeekdayName(
      selectedDate,
      locale,
      REPRESENTATION_VALUES.SHORT
    );

    return <Header topText={weekDayName} mainText={formattedDate} />;
  };

  /**
   * Renders the container for the action elements.
   *
   * @memberof Calendar
   */
  renderActions = () => {
    const { classes, labels } = this.props;
    const { selectedDate } = this.state;
    const actionLabels = {
      applyLabel: labels.applyLabel,
      cancelLabel: labels.cancelLabel
    };

    return (
      <div className={classes.actionsContainer}>
        <Actions
          onCancel={() => {
            const { handleCancel } = this.props;
            if (typeof handleCancel === "function") {
              handleCancel(selectedDate);
            }
          }}
          onApply={() => {
            const { handleApply } = this.props;
            if (typeof handleApply === "function") {
              handleApply(selectedDate);
            }
          }}
          labels={actionLabels}
        />
      </div>
    );
  };

  /**
   * Renders the monthly view. This view is used when pressing the month.
   *
   * @memberof Calendar
   */
  renderMonthlyView = () => {
    const { classes } = this.props;
    const { calendarModel } = this.state;

    return (
      <div className={classes.calendarMonthlyGrid}>
        {this.listMonthNamesShort.map((monthName, index) => {
          const key = `${monthName}-${index}`;
          let className = `${classes.calendarMonthlyCell}`;
          if (index + 1 === calendarModel.month) {
            className += ` ${classes.calendarMonthlyCellSelected}`;
          }
          return (
            <div
              key={key}
              role="presentation"
              onClick={() => this.navigateTo(NAV_OPTIONS.MONTH, index + 1)}
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
   * @memberof Calendar
   */
  renderContent = () => {
    const { classes, showActions } = this.props;
    const { viewMode, calendarModel } = this.state;

    return (
      <>
        {this.renderNavigation()}
        {viewMode === VIEW_MODE.MONTHLY && this.renderMonthlyView()}
        <div className={classes.calendarGrid}>
          {this.renderDayLabel()}
          {calendarModel.dates.map(this.renderCalendarDate)}
        </div>
        {showActions && this.renderActions()}
      </>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.calendarWrapper}>
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
   * An Object containing the various text associated with the input.
   *
   * - applyLabel: Label for apply button.
   * - cancelLabel: Label for cancel button.
   */
  labels: PropTypes.shape({
    applyLabel: PropTypes.string,
    cancelLabel: PropTypes.string
  }),
  /**
   * Locale to be used by the calendar.
   */
  locale: PropTypes.string,
  /**
   * Date that should be used as the starting selected date for the calendar.
   */
  initialDate: PropTypes.instanceOf(Date),
  /**
   * Shows the Actions component when true.
   */
  showActions: PropTypes.bool,
  /**
   * Callback function to be triggered when the selected date has changed.
   */
  handleDateChange: PropTypes.func,
  /**
   * Callback function to be triggered when the Apply button is clicked.
   */
  handleApply: PropTypes.func,
  /**
   * Callback function to be triggered when the select button is clicked.
   */
  handleCancel: PropTypes.func
};

Calendar.defaultProps = {
  labels: {
    applyLabel: "Apply",
    cancelLabel: "Cancel"
  },
  locale: "en-US", // TODO: Add a better way to add the default locale, maybe use navigator.languages.
  initialDate: makeUTCToday(),
  showActions: false,
  handleDateChange: undefined,
  handleApply: undefined,
  handleCancel: undefined
};

export default Calendar;
