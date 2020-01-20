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
import uniqueId from "lodash/uniqueId";
import isNil from "lodash/isNil";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import CalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import classNames from "classnames";
import Typography from "../Typography";
import Popper from "../utils/Popper";
import Calendar from "./Calendar";
import Actions from "./Actions";

import {
  convertISOStringDateToDate,
  DEFAULT_LOCALE,
  getDateISO,
  getFormattedDate,
  isDate,
  isValidLocale
} from "./Calendar/utils";

class HvDatePicker extends React.Component {
  constructor(props) {
    super(props);

    const { id, locale } = this.props;

    this.state = {
      created: false,
      internalId: id || uniqueId("hv-datepicker-"),
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
   * @memberOf HvDatePicker
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
   * @memberOf HvDatePicker
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
   * @memberOf HvDatePicker
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
    const { calendarOpen } = this.state;

    return calendarOpen
      ? `${classes.inputCalendarOpen}`
      : `${classes.inputCalendarClosed}`;
  };

  createCalendarPlacement = data => {
    const { created } = this.state;
    const { flipped, placement } = data;
    if (!created) {
      this.setState({
        calendarPlacement: placement,
        calendarFlipped: flipped,
        created: true
      });
    }
  };

  /**
   * Updates the calendar placement in case the Popper placement changed.
   *
   * @param {Object} data - The data provided by the popper plugin.
   * @memberOf HvDatePicker
   */
  updateCalendarPlacement = data => {
    const { calendarFlipped } = this.state;
    if (calendarFlipped !== data.flipped) {
      this.setState({
        calendarPlacement: data.placement,
        calendarFlipped: data.flipped
      });
    }
  };

  /**
   * Handles the `Apply` action. Both single and ranged modes are handled here.
   *
   * @memberOf HvDatePicker
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
        this.setSingleDate(tempSelectedDate, true);
      }
    }
  };

  /**
   * Handles the `Cancel` action. Both single and ranged modes are handled here.
   *
   * @memberOf HvDatePicker
   */
  handleCancelAction = () => {
    this.cancelDateSelection();
  };

  /**
   * Handle keyboard click in the input.
   *
   * @param event
   */
  handleKeyboardClick = event => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      this.handleCalendarIconClick(event);
    }
  };

  /**
   * Handles the click on the Calendar icon inside the input.
   *
   * @memberOf HvDatePicker
   */
  handleCalendarIconClick = event => {
    const { currentTarget } = event;

    this.setState(
      state => ({
        calendarAnchorElement: currentTarget,
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
   * @param {Object} event - The event triggered when clicking outside of the calendar container.
   * @memberOf HvDatePicker
   */
  handleCalendarClickAway = event => {
    const { internalId } = this.state;

    if (event.target.id !== `${internalId}`) {
      this.cancelDateSelection();
    }
  };

  /**
   * Gets the formatted selected value to be displayed on the input.
   *
   * @memberOf HvDatePicker
   */
  getFormattedSelectedDate = () => {
    const { rangeMode } = this.props;
    const {
      locale,
      selectedDate,
      startSelectedDate,
      endSelectedDate
    } = this.state;

    if (rangeMode) {
      if (isDate(startSelectedDate) && isDate(endSelectedDate)) {
        return `${getFormattedDate(
          startSelectedDate,
          locale
        )} - ${getFormattedDate(endSelectedDate, locale)}`;
      }
    }

    return isDate(selectedDate) ? getFormattedDate(selectedDate, locale) : "";
  };

  /**
   * Cancels the date selection and closes the Calendar component.
   *
   * @memberOf HvDatePicker
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
   * @param closeCalendar
   * @memberOf HvDatePicker
   */
  setSingleDate = (date, closeCalendar) => {
    const { onChange } = this.props;

    this.setState({ selectedDate: date, tempSelectedDate: date });

    this.setCalendarOpen(!closeCalendar);

    if (typeof onChange === "function") {
      onChange(getDateISO(date));
    }
  };

  /**
   * Handles the `handleDateChange` action from the Calendar component when in single mode. If the `showActions` prop
   * is set to false then the date is immediately applied and the Calendar closed, otherwise the Calendar remains open.
   *
   * @param {Date} date - Date value received from the Calendar component.
   * @param {boolean} closeCalendar - if it should close the date picker.
   * @memberOf HvDatePicker
   */
  handleSingleCalendarDateChange = (date, closeCalendar = true) => {
    const { showActions } = this.props;

    if (!showActions) {
      this.setSingleDate(date, closeCalendar);
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
   * @param {Date} startDate - Start date value that was selected.
   * @param {Date} endDate - End date value that was selected.
   * @memberOf HvDatePicker
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
   * @memberOf HvDatePicker
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
   * @memberOf HvDatePicker
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
   * @memberOf HvDatePicker
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
   * @memberOf HvDatePicker
   */
  renderActions = () => {
    const { classes, labels, rangeMode } = this.props;
    const { internalId } = this.state;

    const actionLabels = {
      applyLabel: labels.applyLabel,
      cancelLabel: labels.cancelLabel
    };

    if (rangeMode) {
      return (
        <div className={classes.rangeCalendarsFooter}>
          <div className={classes.rangeFooterLeft} />
          <div className={classes.rangeFooterRight}>
            <Actions
              id={`${internalId}-action`}
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
          id={`${internalId}-action`}
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
   * @memberOf Calendar
   */
  renderSingleCalendar = () => {
    const { classes, showActions, rangeMode } = this.props;
    const {
      tempSelectedDate,
      locale,
      calendarFlipped,
      internalId
    } = this.state;

    return (
      <div className={classes.calendarContainer}>
        <Calendar
          id={`${internalId}-calendar`}
          handleDateChange={(date, close) =>
            this.handleSingleCalendarDateChange(date, close)
          }
          selectedDate={tempSelectedDate}
          locale={locale}
          rangeMode={rangeMode}
          flipped={calendarFlipped}
        />
        {showActions && this.renderActions()}
      </div>
    );
  };

  /**
   * Renders two calendar for range mode.
   *
   * @memberOf Calendar
   */
  renderRangeCalendars = () => {
    const { classes, rangeMode, labels } = this.props;
    const {
      tempStartSelectedDate,
      tempEndSelectedDate,
      startVisibleDate,
      endVisibleDate,
      locale,
      calendarFlipped,
      internalId
    } = this.state;
    return (
      <div className={classes.rangeMainContainer}>
        <div className={classes.rangeCalendarsContainer}>
          <div className={classes.rangeLeftCalendarContainer}>
            <Calendar
              id={`${internalId}-calendar-start`}
              handleDateChange={date =>
                this.handleRangeCalendarDateStartChange(date)
              }
              selectedDate={tempStartSelectedDate}
              visibleDate={startVisibleDate}
              locale={locale}
              rangeMode={rangeMode}
              label={labels.rangeStart}
              flipped={calendarFlipped}
            />
          </div>

          <div className={classes.rangeRightCalendarContainer}>
            <Calendar
              id={`${internalId}-calendar-end`}
              handleDateChange={date =>
                this.handleRangeCalendarDateEndChange(date)
              }
              selectedDate={tempEndSelectedDate}
              visibleDate={endVisibleDate}
              locale={locale}
              rangeMode={rangeMode}
              label={labels.rangeEnd}
              flipped={calendarFlipped}
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
   * @memberOf Calendar
   */
  renderInput = () => {
    const { classes, labels } = this.props;
    const { internalId } = this.state;

    return (
      <>
        {labels && labels.title && this.renderLabel()}
        <div
          aria-label={
            isNil(labels) || isNil(labels.title) ? "Date input" : undefined
          }
          className={this.getInputStyle()}
          onKeyDown={this.handleKeyboardClick}
          onClick={this.handleCalendarIconClick}
          role="button"
          tabIndex={0}
          id={internalId}
        >
          <input
            ref={element => {
              this.inputElement = element;
            }}
            className={classes.input}
            value={this.getFormattedSelectedDate()}
            placeholder={labels.placeholder}
            type="text"
            readOnly
            tabIndex={-1}
          />
          <CalendarIcon tabIndex={-1} className={classes.icon} />
        </div>
      </>
    );
  };

  /**
   * Renders the Popper component with the calendars inside.
   *
   * @memberOf HvDatePicker
   */
  renderPopper = () => {
    const {
      classes,
      theme,
      rangeMode,
      horizontalPlacement,
      disablePortal,
      escapeWithReference
    } = this.props;

    const { internalId, calendarOpen, calendarAnchorElement, calendarFlipped } = this.state;

    const RenderCalendar = rangeMode
      ? this.renderRangeCalendars()
      : this.renderSingleCalendar();
    return (
      <Popper
        id={`${internalId}-tooltip`}
        open={calendarOpen}
        placement={
          horizontalPlacement === "left" ? "bottom-start" : "bottom-end"
        }
        anchorEl={calendarAnchorElement}
        disablePortal={disablePortal}
        popperOptions={{
          onCreate: this.createCalendarPlacement,
          onUpdate: this.updateCalendarPlacement
        }}
        modifiers={{
          preventOverflow: {
            // Follows the anchor element outside of the boundaries.
            escapeWithReference
          }
        }}
        style={{
          zIndex: `${calendarFlipped ? theme.zIndex.tooltip : 1}`
        }}
      >
        <ClickAwayListener onClickAway={this.handleCalendarClickAway}>
          <div>
            {!calendarFlipped && (
              <div
                className={classNames(
                  classes.popperRoot,
                  classes.listBorderDown
                )}
              />
            )}
            <div
              className={classNames(classes.popperRoot, [
                {
                  [classes.calendarOpenDown]: calendarOpen && !calendarFlipped,
                  [classes.calendarOpenUp]: calendarOpen && calendarFlipped
                }
              ])}
            >
              {RenderCalendar}
            </div>
            {calendarFlipped && (
              <div
                className={classNames(classes.popperRoot, classes.listBorderUp)}
              />
            )}
          </div>
        </ClickAwayListener>
      </Popper>
    );
  };

  /**
   * Renders the DatePicker component.
   *
   * @returns
   * @memberOf HvDatePicker
   */
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.datePickerContainer}>
        {this.renderInput()}
        {this.renderPopper()}
      </div>
    );
  }
}

HvDatePicker.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
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
    rangeStart: PropTypes.string,
    rangeEnd: PropTypes.string,
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
  horizontalPlacement: PropTypes.oneOf(["left", "right"]),
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
  onChange: PropTypes.func,
  /**
   * The theme object provided by the withStyles component.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Sets if the calendar container should follow the date picker input out of the screen or stay visible.
   */
  escapeWithReference: PropTypes.bool
};

HvDatePicker.defaultProps = {
  id: undefined,
  labels: {
    applyLabel: "Apply",
    cancelLabel: "Cancel",
    title: undefined,
    placeholder: "Select a date",
    rangeStart: "Start date",
    rangeEnd: "End date"
  },
  rangeMode: false,
  horizontalPlacement: "left",
  value: "",
  startValue: "",
  endValue: "",
  locale: DEFAULT_LOCALE,
  showActions: false,
  onChange: undefined,
  disablePortal: true,
  escapeWithReference: true
};

export default HvDatePicker;
