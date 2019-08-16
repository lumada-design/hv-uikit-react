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
import classNames from "classnames";
import Typography from "@hv/uikit-react-core/dist/Typography";
import TimeIcon from "@hv/uikit-react-icons/dist/Time.S";
import Popper from "../DatePickerDS/Popper";
import UnitTimePicker from "./UnitTimePicker";
import { TimePickerUnits, TimeFormat } from "./enums";
import { getPeriodForDate } from "./timePickerUtils";
import {
  getFormattedTime,
  getTimeFormatForLocale
} from "./timePickerFormatter";
import {
  getHoursForTimeFormat,
  getTimeWithFormat24
} from "./timePickerConverter";
import PeriodPicker from "./PeriodPicker";

class HvTimePicker extends React.Component {
  constructor(props) {
    super(props);

    const { onChange, hours, minutes, seconds, period } = this.props;
    const timeFormat = this.getTimeFormat();
    const selectedTime = {
      hours: getHoursForTimeFormat(hours, timeFormat),
      minutes,
      seconds,
      period: timeFormat === TimeFormat.H24 ? undefined : period
    };

    this.state = {
      timePopperOpen: false,
      timePopperAnchor: null,
      timePopperPlacement: "bottom-start",
      timeFormat,
      selectedTime
    };

    onChange(getTimeWithFormat24(selectedTime, timeFormat));
  }

  /**
   * Handles the event of clicking away from the Popper.
   *
   * @memberof HvTimePicker
   */
  handleTimePopperClickAway = () => {
    this.cancelTimeSelection();
  };

  /**
   * Handles the click on the Time icon inside the input.
   *
   * @param {Object} event - on click event on the icon
   * @memberof HvTimePicker
   */
  handleTimeIconClick = event => {
    const { currentTarget } = event;
    const { timePopperOpen } = this.state;
    this.setTimePopperState(currentTarget.parentElement, !timePopperOpen);
  };

  /**
   * Cancels the time selection and closes the Time popper.
   *
   * @memberof HvTimePicker
   */
  cancelTimeSelection = () => {
    this.setTimePopperState(null, false);
  };

  /**
   * Handles the change of the hours value
   * @param {Number} hours - selected hours
   * @memberof HvTimePicker
   */
  handleHoursChange = hours => {
    const { selectedTime } = this.state;
    const newSelectedTime = {
      ...selectedTime,
      hours
    };
    this.onSelectedTimeChange(newSelectedTime);
  };

  /**
   * Handles the change of the minutes value
   * @param {Number} minutes - selected minutes
   * @memberof HvTimePicker
   */
  handleMinutesChange = minutes => {
    const { selectedTime } = this.state;
    const newSelectedTime = {
      ...selectedTime,
      minutes
    };
    this.onSelectedTimeChange(newSelectedTime);
  };

  /**
   * Handles the change of the seconds value
   * @param {Number} seconds - selected seconds
   * @memberof HvTimePicker
   */
  handleSecondsChange = seconds => {
    const { selectedTime } = this.state;
    const newSelectedTime = {
      ...selectedTime,
      seconds
    };
    this.onSelectedTimeChange(newSelectedTime);
  };

  /**
   * Handles the change of the period (am/pm)
   * @param {String} period - selected period
   * @memberof HvTimePicker
   */
  handleChangePeriod = period => {
    const { selectedTime } = this.state;
    const newSelectedTime = {
      ...selectedTime,
      period
    };
    this.onSelectedTimeChange(newSelectedTime);
  };

  /**
   * Changes the popper open state according to the received flag.
   *
   * @param {element} anchor - Anchor element to append the popper
   * @param {boolean} open - Opens / closes the popper according to this flag.
   * @memberof HvTimePicker
   */
  setTimePopperState = (anchor, open) => {
    this.setState({
      timePopperAnchor: anchor,
      timePopperOpen: open
    });
  };

  /**
   * Changes the popper placement in the state
   *
   * @param {String} placement - Popper placement
   * @memberof HvTimePicker
   */
  setTimePopperPlacement = placement => {
    const { timePopperPlacement } = this.state;
    if (timePopperPlacement !== placement) {
      this.setState({
        timePopperPlacement: placement
      });
    }
  };

  /**
   * Changes the selected time on the component state
   * Also calls the onChange callback
   * @param {Object} selectedTime - time object with the selected values for hours, minutes, seconds and period
   */
  onSelectedTimeChange = selectedTime => {
    const { onChange } = this.props;
    const { timeFormat } = this.state;
    this.setState({
      selectedTime
    });
    const selectedTimeIn24Format = getTimeWithFormat24(
      selectedTime,
      timeFormat
    );
    onChange(selectedTimeIn24Format);
  };

  /**
   * Returns the appropriate time format (12 or 24) depending on the passed props(timeFormat and locale)
   * @memberof HvTimePicker
   */
  getTimeFormat = () => {
    const { timeFormat, locale } = this.props;
    if (timeFormat) {
      return timeFormat;
    }
    return getTimeFormatForLocale(locale);
  };

  /**
   * Returns true if the popper is below the input and false otherwise
   * @memberof HvTimePicker
   */
  isPopperBelowParent = () => {
    const { timePopperPlacement } = this.state;
    return timePopperPlacement.includes("bottom");
  };

  /**
   * Renderers
   */

  /**
   * Renders the Label element.
   *
   * @memberof HvTimePicker
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
   * Renders the input.
   *
   * @memberof HvTimePicker
   */
  renderInput = () => {
    const { classes, labels } = this.props;
    const { selectedTime, timePopperOpen } = this.state;
    const isPopperBelow = this.isPopperBelowParent();
    return (
      <>
        {labels && labels.title && this.renderLabel()}
        <div
          className={classNames(classes.inputContainer, {
            [classes.inputPopperOpenedBelow]: timePopperOpen && isPopperBelow,
            [classes.inputPopperOpenedAbove]: timePopperOpen && !isPopperBelow,
            [classes.inputPopperClosed]: !timePopperOpen
          })}
        >
          <input
            ref={element => {
              this.inputElement = element;
            }}
            className={classes.input}
            value={getFormattedTime(selectedTime)}
            placeholder={labels.placeholder}
            type="text"
            readOnly
          />
          <TimeIcon
            className={classes.icon}
            onClick={this.handleTimeIconClick}
          />
        </div>
      </>
    );
  };

  /**
   * Renders the Popper to choose the time
   *
   * @memberof HvTimePicker
   */
  renderPopper = () => {
    const { classes } = this.props;
    const { timePopperOpen, timePopperAnchor } = this.state;
    const isPopperBelow = this.isPopperBelowParent();

    return (
      <Popper
        className={classNames(classes.popper, {
          [classes.popperBelow]: isPopperBelow,
          [classes.popperAbove]: !isPopperBelow
        })}
        open={timePopperOpen}
        anchorEl={timePopperAnchor}
        placement="bottom-start"
        disablePortal
        popperOptions={{
          onCreate: data => {
            this.setTimePopperPlacement(data.placement);
          },
          onUpdate: data => {
            this.setTimePopperPlacement(data.placement);
          }
        }}
      >
        {this.renderTimePopperContent()}
      </Popper>
    );
  };

  /**
   * Renders the time popper content for time selection.
   *
   * @memberof HvTimePicker
   */
  renderTimePopperContent = () => {
    const { classes } = this.props;
    const { selectedTime, timeFormat } = this.state;

    const separator = <span className={classes.separator}>:</span>;

    return (
      <div className={classes.timePopperContainer}>
        <UnitTimePicker
          unit={
            timeFormat === TimeFormat.H24
              ? TimePickerUnits.HOUR_24.type
              : TimePickerUnits.HOUR_12.type
          }
          unitValue={selectedTime.hours}
          onChangeUnitTimeValue={this.handleHoursChange}
        />
        {separator}
        <UnitTimePicker
          unit={TimePickerUnits.MINUTE.type}
          unitValue={selectedTime.minutes}
          onChangeUnitTimeValue={this.handleMinutesChange}
        />
        {separator}
        <UnitTimePicker
          unit={TimePickerUnits.SECOND.type}
          unitValue={selectedTime.seconds}
          onChangeUnitTimeValue={this.handleSecondsChange}
        />
        {timeFormat === TimeFormat.H12 && (
          <div className={classes.periodContainer}>
            <PeriodPicker
              onChangePeriod={this.handleChangePeriod}
              period={selectedTime.period}
            />
          </div>
        )}
      </div>
    );
  };

  /**
   * Renders the TimePicker component.
   *
   * @returns
   * @memberof HvTimePicker
   */
  render() {
    const { classes } = this.props;

    return (
      <ClickAwayListener onClickAway={this.handleTimePopperClickAway}>
        <div className={classes.timePickerContainer}>
          {this.renderInput()}
          {this.renderPopper()}
        </div>
      </ClickAwayListener>
    );
  }
}

HvTimePicker.propTypes = {
  /**
   * An Object containing the various text associated with the time picker.
   *
   * - title: Time picker label (appears above the input)
   * - placeholder: Time picker placeholder (appears in the input)
   */
  labels: PropTypes.shape({
    title: PropTypes.string,
    placeholder: PropTypes.string
  }),
  /**
   * If the time should be presented in 12 or 24 hour format.
   * If undefined, the component will use a format according to the passed locale.
   * If defined, it will "override" the default value given by the locale
   */
  timeFormat: PropTypes.oneOf([TimeFormat.H12, TimeFormat.H24, undefined]),
  /**
   * Locale that will provide the time format(12 or 24 hour format)
   * It is "overwritten" by the timeFormat prop
   */
  locale: PropTypes.string,
  /**
   * Default value for the hours picker
   */
  hours: PropTypes.number,
  /**
   * Default value for the minutes picker
   */
  minutes: PropTypes.number,
  /**
   * Default value for the seconds picker
   */
  seconds: PropTypes.number,
  /**
   * Default value for the period picker
   */
  period: PropTypes.string,
  /**
   * Callback function to be triggered when the input value is changed.
   * It is invoked with a object param with the following props:
   *  - hours (in a 24h format)
   *  - minutes
   *  - seconds
   *  - period
   *
   * It is always invoked with the hours in a 24h format
   */
  onChange: PropTypes.func,
  /**
   * A Jss Object used to override or extend the styles applied to the input/popper
   */
  classes: PropTypes.instanceOf(Object).isRequired
};

HvTimePicker.defaultProps = {
  labels: {
    title: undefined,
    placeholder: "hh:mm:ss"
  },
  timeFormat: undefined,
  locale: "en",
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  seconds: 0,
  period: getPeriodForDate(),
  onChange: () => {}
};

export default HvTimePicker;
