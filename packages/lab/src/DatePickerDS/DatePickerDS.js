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

import CalendarIcon from "@hv/uikit-react-icons/dist/Calendar.S";
import Calendar from "./Calendar";
import { getDateISO } from "./Calendar/utils";

class HvDatePickerDS extends React.Component {
  /**
   * Constructor
   * @param props Component properties
   */
  constructor(props) {
    super(props);

    // use the default state value
    this.state = {
      value: props.value,
      calendarVisible: props.calendarVisible
    };
    this.wrapperRef = null;
  }

  /**
   * Add the click handler when the component is mounted
   */
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Removes the click handler when the component is unmounted
   */
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  /**
   * Changes the input value and updates the state
   * @param {Date} date Date value to be set on the input
   */
  changeInputValue = date => {
    const ISODate = getDateISO(date);
    this.setState({ value: ISODate != null ? ISODate : "" });
  };

  /**
   * Change calendar visibility
   * @param {boolean} visibility The visibility state. True => calendar is visible. False => calendar is hidden
   */
  changeCalendarVisibility = visibility => {
    this.setState({
      calendarVisible: visibility
    });
  };

  /**
   * Handle the input calendar icon click
   */
  handleCalendarIconClick = () => {
    this.changeCalendarVisibility(true);
  };

  /**
   * Set the date in the input, and changes the calendar visibility (hide)
   * @param {Date} date Date value for the input
   */
  setDate = date => {
    this.changeCalendarVisibility(false);
    if (date) {
      this.changeInputValue(date);
    }
  };

  /**
   * Clears the calendar input/date value
   */
  clearInput = () => {
    this.changeInputValue("");
    this.changeCalendarVisibility(false);
  };

  /**
   * Handle Cancel action from the calendar
   */
  handleCalendarCancelAction = () => {
    this.changeCalendarVisibility(false);
  };

  /**
   * Handle "Apply" action from the calendar
   * @param {Date} date Date that is selected when the calendar "Apply" action is triggered
   */
  handleCalendarApplyAction = date => {
    this.setDate(date);
  };

  /**
   * Handle "Date Change"  action from the calendar. If actions buttons are not visible, sets the date (and hides the
   *  calendar). Otherwise, the action is ignored
   * @param {Date} date Date selected in the calendar
   */
  handleCalendarDateChange = date => {
    const { showActions } = this.props;
    if (!showActions) this.setDate(date);
  };

  /**
   * Calculates the inputstyle to be applied
   * @returns {*} The style (from classes) to be applied
   */
  calculateInputStyleBorder = () => {
    const { classes } = this.props;
    const { calendarVisible, value } = this.state;
    if (calendarVisible) {
      return classes.inputWithCalendarVisible;
    }

    const hasInputValue = value && value !== "";
    return hasInputValue ? classes.inputWithValue : classes.inputWithoutValue;
  };

  /**
   * handle clicks outside of the calendar and hides it
   * @param {event} event The element event
   */
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.changeCalendarVisibility(false);
    }
  };

  /**
   * Label element
   * @returns {*} HTML code for label
   */
  renderLabel = () => {
    const { classes, label} = this.props;
    return <div className={classes.label}>{label}</div>;
  }

  /**
   *  Component render
   * @returns {*} Component HTML
   */
  render() {
    const { placeholder, classes, locale, showActions, label } = this.props;
    const { value, calendarVisible } = this.state;
    const calendarElement = calendarVisible && (
      <Calendar
        handleDateChange={date => this.handleCalendarDateChange(date)}
        handleApply={date => this.handleCalendarApplyAction(date)}
        handleCancel={() => this.handleCalendarCancelAction()}
        initialDate={new Date(value)}
        locale={locale}
        showActions={showActions}
      />
    );

    return (
      <div className={classes.datePickerContainer} ref={this.setWrapperRef}>
        {label  && this.renderLabel ()}
        <div className={this.calculateInputStyleBorder()}>
          <input
            className={classes.input}
            value={value}
            placeholder={placeholder}
            type="text"
            readOnly
          />
          <CalendarIcon
            className={classes.icon}
            onClick={() => this.handleCalendarIconClick()}
          />
        </div>
        <div>{calendarElement}</div>
      </div>
    );
  }
}

HvDatePickerDS.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the input/calendar box.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The initial value of the input
   */
  value: PropTypes.string,
  /**
   * Controls if the calendar is visible
   */
  calendarVisible: PropTypes.bool,
  /**
   * The placeholder value of the input
   */
  placeholder: PropTypes.string,
  /**
   * The calendar locale. If undefined, it uses calendar default
   */
  locale: PropTypes.string,
  /**
   * Controls if actions buttons are visible at the calendar.
   */
  showActions: PropTypes.bool,
  /**
   * Label
   */
  label : PropTypes.string
};

/**
 * Default prop types
 * @type {{calendarVisible: boolean, placeholder: string, locale: undefined, value: undefined}}
 */
HvDatePickerDS.defaultProps = {
  value: "",
  placeholder: "YYYY-MM-DD",
  calendarVisible: false,
  locale: undefined,
  showActions: undefined,
  label: undefined
};

export default HvDatePickerDS;
