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

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import CalendarIcon from "@hv/uikit-react-icons/dist/Calendar.S";
import Typography from "@hv/uikit-react-core/dist/Typography";

import Popper from "./Popper";

import Calendar from "./Calendar";
import Actions from "./Actions";

import {
  DEFAULT_LOCALE,
  getDateISO,
  convertISOStringDateToDate,
  isDate,
  getFormattedDate,
  isValidLocale
} from "./Calendar/utils";

import {
  getSingleCalendarContainerClasses,
  getRangeCalendarContainerClasses,
  getRangeRightCalendarContainerClasses,
  getRangeLeftCalendarContainerClasses,
  getRangeFooterRightClasses,
  getRangeFooterLeftClasses
} from "./stylesUtils";

class HvDatePickerDS extends React.Component {
  constructor(props) {
    super(props);

    const { locale } = this.props;

    this.state = {
      ...this.resolveStateFromProps(),
      calendarOpen: false,
      calendarAnchorElement: null,
      locale: isValidLocale(locale) ? locale : DEFAULT_LOCALE
    };
  }

  /**
   * Triggered right before the Render() function of the components.
   * Here we can update the state when a prop is changed.
   * Currently we only want to update the locale. In the future we might want to be able to update other props.
   *
   * @static
   * @param {Object} props - The new props object.
   * @param {Object} state - The current state object.
   *
   * @returns {Object} - The updated state
   * @memberof DatePickerDS
   */
  static getDerivedStateFromProps(props, state) {
    if (props.locale !== state.locale) {
      const validLocale = isValidLocale(props.locale)
        ? props.locale
        : DEFAULT_LOCALE;
      return {
        ...state,
        locale: validLocale
      };
    }
    return null;
  }

  /**
   * Resolves the state using the received props.
   *
   * @memberof HvDatePickerDS
   */
  resolveStateFromProps = () => {
    const { value, startValue, endValue, rangeMode } = this.props;

    if (rangeMode) {
      const startSelectedDate =
        startValue !== "" ? convertISOStringDateToDate(startValue) : null;
      const endSelectedDate =
        endValue !== "" ? convertISOStringDateToDate(endValue) : null;
      // Range mode state
      return {
        startSelectedDate,
        endSelectedDate,
        tempStartSelectedDate: startSelectedDate,
        tempEndSelectedDate: endSelectedDate,
        startVisibleDate: null,
        endVisibleDate: null
      };
    }

    // Single calendar mode state
    const selectedDate =
      value !== "" ? convertISOStringDateToDate(value) : null;

    return {
      selectedDate,
      tempSelectedDate: selectedDate
    };
  };

  /**
   * Changes the calendar open state according to the received flag.
   *
   * @param {boolean} open - Opens / closes the calendar according to this flag.
   * @memberof HvDatePickerDS
   */
  setCalendarOpen = open => {
    this.setState({
      calendarOpen: open
    });
  };

  /**
   * Gets the classes that should be applied to the input depending on the state.
   *
   * @returns {Object} The style to be applied.
   */
  getInputStyle = () => {
    const { classes } = this.props;
    const { calendarOpen, calendarPlacement } = this.state;

    let inputStyle = calendarOpen
      ? `${classes.inputCalendarOpen}`
      : `${classes.inputCalendarClosed}`;

    if (calendarOpen && calendarPlacement) {
      inputStyle += calendarPlacement.includes("bottom")
        ? ` ${classes.noBorderBottom}`
        : ` ${classes.noBorderTop}`;
    }

    return inputStyle;
  };

  /**
   * Updates the calendar placement in case the Popper placement changed.
   *
   * @memberof HvDatePickerDS
   */
  updateCalendarPlacement = popperPlacement => {
    const { calendarPlacement } = this.state;

    if (calendarPlacement !== popperPlacement) {
      this.setState({ calendarPlacement: popperPlacement });
    }
  };

  /**
   * Handles the `Apply` action. Both single and ranged modes are handled here.
   *
   * @param {Date} date - Date that is selected when `Apply` action is triggered.
   * @memberof HvDatePickerDS
   */
  handleApplyAction = () => {
    const { rangeMode } = this.props;

    if (rangeMode) {
      const { tempStartSelectedDate, tempEndSelectedDate } = this.state;

      if (tempStartSelectedDate && tempEndSelectedDate) {
        this.setRangeDate(tempStartSelectedDate, tempEndSelectedDate);
      }
    } else {
      const { tempSelectedDate } = this.state;

      if (tempSelectedDate) {
        this.setSingleDate(tempSelectedDate);
      }
    }
  };

  /**
   * Handles the `Cancel` action. Both single and ranged modes are handled here.
   *
   * @memberof HvDatePickerDS
   */
  handleCancelAction = () => {
    this.cancelDateSelection();
  };

  /**
   * Handles the click on the Calendar icon inside the input.
   *
   * @memberof HvDatePickerDS
   */
  handleCalendarIconClick = event => {
    const { currentTarget } = event;

    this.setState(
      state => ({
        calendarAnchorElement: currentTarget.parentNode,
        calendarOpen: !state.calendarOpen
      }),
      () => {
        const { calendarOpen } = this.state;
        if (!calendarOpen) {
          this.cancelDateSelection();
        }
      }
    );
  };

  /**
   * Handles the event of clicking away from the Calendar.
   *
   * @memberof HvDatePickerDS
   */
  handleCalendarClickAway = () => {
    this.cancelDateSelection();
  };

  /**
   * Gets the formmatted selected value to be displayed on the input.
   *
   * @memberof HvDatePickerDS
   */
  getFormattedSelectedDate = () => {
    const { rangeMode } = this.props;
    const { locale } = this.state;

    if (rangeMode) {
      const { startSelectedDate, endSelectedDate } = this.state;

      if (isDate(startSelectedDate) && isDate(endSelectedDate)) {
        return `${getFormattedDate(
          startSelectedDate,
          locale
        )} - ${getFormattedDate(endSelectedDate, locale)}`;
      }
    }

    const { selectedDate } = this.state;

    return isDate(selectedDate) ? getFormattedDate(selectedDate, locale) : "";
  };

  /**
   * Cancels the date selection and closes the Calendar component.
   *
   * @memberof HvDatePickerDS
   */
  cancelDateSelection = () => {
    const { rangeMode } = this.props;
    const { selectedDate, startSelectedDate, endSelectedDate } = this.state;

    if (rangeMode) {
      this.setState({
        tempStartSelectedDate: startSelectedDate,
        tempEndSelectedDate: endSelectedDate
      });
    } else {
      this.setState({
        tempSelectedDate: selectedDate
      });
    }

    this.setCalendarOpen(false);
  };

  /**
   * Single Calendar
   */

  /**
   * Set the date in the input, and changes the calendar visibility (hide).
   *
   * @param {Date} date - Date value that was selected.
   * @memberof HvDatePickerDS
   */
  setSingleDate = date => {
    const { onChange } = this.props;

    this.setState({ selectedDate: date, tempSelectedDate: date });

    this.setCalendarOpen(false);

    if (typeof onChange === "function") {
      onChange(getDateISO(date));
    }
  };

  /**
   * Handles the `handleDateChange` action from the Calendar component when in single mode. If the `showActions` prop
   * is set to false then the date is immediatly applied and the Calendar closed, otherwise the Calendar remains open.
   *
   * @param {Date} date - Date value received from the Calendar component.
   * @memberof HvDatePickerDS
   */
  handleSingleCalendarDateChange = date => {
    const { showActions } = this.props;

    if (!showActions) {
      this.setSingleDate(date);
    } else {
      this.setState({ tempSelectedDate: date });
    }
  };

  /**
   * Range Calendars functions
   */

  /**
   * Set the date in the input, and changes the calendar visibility (hide).
   *
   * @param {Date} startDate - Start date value thas was selected.
   * @param {Date} endDate - End date value that was selected.
   * @memberof HvDatePickerDS
   */
  setRangeDate = (startDate, endDate) => {
    const { onChange } = this.props;

    this.setState({
      startSelectedDate: startDate,
      endSelectedDate: endDate
    });

    this.setCalendarOpen(false);

    if (typeof onChange === "function") {
      onChange(getDateISO(startDate), getDateISO(endDate));
    }
  };

  /**
   * Handles the `handleDateChange` action from the Calendar component associated to the Start date when in range mode.
   *
   * @param {Date} date - Date value received from the Calendar component.
   * @memberof HvDatePickerDS
   */
  handleRangeCalendarDateStartChange = date => {
    const { tempEndSelectedDate } = this.state;

    if (tempEndSelectedDate > date) {
      this.setState({ tempStartSelectedDate: date });
    } else {
      this.setState({
        tempStartSelectedDate: date,
        tempEndSelectedDate: date,
        endVisibleDate: date
      });
    }
  };

  /**
   * Handles the `handleDateChange` action from the Calendar component associated to the end date when in range mode.
   *
   * @param {Date} date - Date value received from the Calendar component.
   * @memberof HvDatePickerDS
   */
  handleRangeCalendarDateEndChange = date => {
    const { tempStartSelectedDate } = this.state;

    if (tempStartSelectedDate < date) {
      this.setState({ tempEndSelectedDate: date });
    } else {
      this.setState({
        tempEndSelectedDate: date,
        tempStartSelectedDate: date,
        startVisibleDate: date
      });
    }
  };

  /**
   * Renderers
   */

  /**
   * Renders the Label element.
   *
   * @memberof HvDatePickerDS
   */
  renderLabel = () => {
    const { classes, labels } = this.props;
    return (
      <Typography variant="labelText" className={classes.label}>
        {labels.title}
      </Typography>
    );
  };

  /**
   * Renders the container for the action elements.
   *
   * @memberof DatePickerDS
   */
  renderActions = () => {
    const { classes, labels, rangeMode, horizontalPlacement } = this.props;
    const { calendarPlacement } = this.state;

    const actionLabels = {
      applyLabel: labels.applyLabel,
      cancelLabel: labels.cancelLabel
    };

    if (rangeMode) {
      return (
        <div className={classes.rangeCalendarsFooter}>
          <div
            className={getRangeFooterLeftClasses(
              classes,
              horizontalPlacement,
              calendarPlacement
            )}
          />
          <div
            className={getRangeFooterRightClasses(
              classes,
              horizontalPlacement,
              calendarPlacement
            )}
          >
            <Actions
              onCancel={() => this.handleCancelAction()}
              onApply={() => this.handleApplyAction()}
              labels={actionLabels}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={classes.singleCalendarFooter}>
        <Actions
          onCancel={() => this.handleCancelAction()}
          onApply={() => this.handleApplyAction()}
          labels={actionLabels}
        />
      </div>
    );
  };

  /**
   * Renders one calendar component.
   *
   * @memberof Calendar
   */
  renderSingleCalendar = () => {
    const { classes, showActions, rangeMode } = this.props;
    const { tempSelectedDate, calendarPlacement, locale } = this.state;

    return (
      <div
        className={getSingleCalendarContainerClasses(
          classes,
          calendarPlacement
        )}
      >
        <Calendar
          handleDateChange={date => this.handleSingleCalendarDateChange(date)}
          selectedDate={tempSelectedDate}
          locale={locale}
          rangeMode={rangeMode}
        />
        {showActions && this.renderActions()}
      </div>
    );
  };

  /**
   * Renders two calendar for range mode.
   *
   * @memberof Calendar
   */
  renderRangeCalendars = () => {
    const { classes, horizontalPlacement, rangeMode } = this.props;
    const {
      tempStartSelectedDate,
      tempEndSelectedDate,
      startVisibleDate,
      endVisibleDate,
      calendarPlacement,
      locale
    } = this.state;

    return (
      <div
        className={getRangeCalendarContainerClasses(classes, calendarPlacement)}
      >
        <div className={classes.rangeCalendarsContainer}>
          <div
            className={getRangeLeftCalendarContainerClasses(
              classes,
              horizontalPlacement,
              calendarPlacement
            )}
          >
            <Calendar
              handleDateChange={date =>
                this.handleRangeCalendarDateStartChange(date)
              }
              selectedDate={tempStartSelectedDate}
              visibleDate={startVisibleDate}
              locale={locale}
              rangeMode={rangeMode}
            />
          </div>

          <div
            className={getRangeRightCalendarContainerClasses(
              classes,
              horizontalPlacement,
              calendarPlacement
            )}
          >
            <Calendar
              handleDateChange={date =>
                this.handleRangeCalendarDateEndChange(date)
              }
              selectedDate={tempEndSelectedDate}
              visibleDate={endVisibleDate}
              locale={locale}
              rangeMode={rangeMode}
            />
          </div>
        </div>
        {this.renderActions()}
      </div>
    );
  };

  /**
   * Renders the input.
   *
   * @memberof Calendar
   */
  renderInput = () => {
    const { classes, labels } = this.props;

    return (
      <>
        {labels && labels.title && this.renderLabel()}
        <div className={this.getInputStyle()}>
          <input
            ref={element => {
              this.inputElement = element;
            }}
            className={classes.input}
            value={this.getFormattedSelectedDate()}
            placeholder={labels.placeholder}
            type="text"
            readOnly
          />
          <CalendarIcon
            className={classes.icon}
            onClick={this.handleCalendarIconClick}
          />
        </div>
      </>
    );
  };

  /**
   * Renders the Popper component with the calendars inside.
   *
   * @memberof HvDatePickerDS
   */
  renderPopper = () => {
    const { classes, rangeMode, horizontalPlacement } = this.props;
    const { calendarOpen, calendarAnchorElement } = this.state;

    return (
      <Popper
        className={`${classes.popper} ${rangeMode ? classes.doubleWidth : ""}`}
        open={calendarOpen}
        placement={
          horizontalPlacement === "left" ? "bottom-start" : "bottom-end"
        }
        anchorEl={calendarAnchorElement}
        disablePortal
        popperOptions={{
          onCreate: data => this.updateCalendarPlacement(data.placement),
          onUpdate: data => this.updateCalendarPlacement(data.placement)
        }}
      >
        {rangeMode ? this.renderRangeCalendars() : this.renderSingleCalendar()}
      </Popper>
    );
  };

  /**
   * Renders the DatePickerDS component.
   *
   * @returns
   * @memberof HvDatePickerDS
   */
  render() {
    const { classes } = this.props;

    return (
      <ClickAwayListener onClickAway={this.handleCalendarClickAway}>
        <div className={classes.datePickerContainer}>
          {this.renderInput()}
          {this.renderPopper()}
        </div>
      </ClickAwayListener>
    );
  }
}

HvDatePickerDS.propTypes = {
  /**
   * An Object containing the various text associated with the input.
   *
   * - applyLabel: Label for apply button.
   * - cancelLabel: Label for cancel button.
   */
  labels: PropTypes.shape({
    applyLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string
  }),
  /**
   * A Jss Object used to override or extend the styles applied to the input/calendar box.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The initial value of the input when in single calendar mode.
   */
  value: PropTypes.string,
  /**
   * The initial value for the start date when in range mode.
   */
  startValue: PropTypes.string,
  /**
   * The initial value for the end date when in range mode.
   */
  endValue: PropTypes.string,
  /**
   * Flag informing if the the component should be in range mode or in single mode.
   */
  rangeMode: PropTypes.bool,
  /**
   * The placement where the calendar should be placed according to the input. Options are `left` or `right`.
   * Note this prop only affects the calendar when in `rangeMode`.
   */
  horizontalPlacement: PropTypes.string,
  /**
   * The calendar locale. If undefined, it uses calendar default
   */
  locale: PropTypes.string,
  /**
   * Controls if actions buttons are visible at the calendar.
   */
  showActions: PropTypes.bool,
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: PropTypes.func
};

HvDatePickerDS.defaultProps = {
  labels: {
    applyLabel: "Apply",
    cancelLabel: "Cancel",
    title: undefined,
    placeholder: "Select a date"
  },
  rangeMode: false,
  horizontalPlacement: "left",
  value: "",
  startValue: "",
  endValue: "",
  locale: DEFAULT_LOCALE,
  showActions: false,
  onChange: undefined
};

export default HvDatePickerDS;
