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
import classNames from "classnames";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import { getDayStart, getDayEnd } from "./utils";

import "react-day-picker/lib/style.css";
import "./styles.css";

const INITIAL_STATE = {
  from: null,
  to: null
};

class HvDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = INITIAL_STATE;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value) {
      return {
        ...state,
        from: props.value.from,
        to: props.value.to
      };
    }
    return state;
  }

  handleDayChange(day) {
    const range = DateUtils.addDayToRange(day, this.state);

    const rangeWithFullDay = Object.assign({}, range, {
      from: getDayStart(range.from),
      to: getDayEnd(range.to)
    });

    const { onChange } = this.props;

    this.setState(rangeWithFullDay);
    onChange(rangeWithFullDay);
  }

  handleReset() {
    const { onChange } = this.props;

    this.setState(INITIAL_STATE);
    onChange(INITIAL_STATE);
  }

  render() {
    const { from, to } = this.state;
    const { classes, label, hideReset, disabled } = this.props;

    const modifiers = { start: from, end: to };
    const dateFormat = "MM/DD/YY";

    const rangeFrom = from ? moment(from).format(dateFormat) : "";
    const rangeEnd = to ? moment(to).format(dateFormat) : "";
    const range = from === to ? rangeFrom : `${rangeFrom} - ${rangeEnd}`;

    const Label = () => (
      <Typography variant="subtitle2" className={classNames([classes.label])}>
        {label}
      </Typography>
    );

    const ResetButton = () => (
      <Typography
        variant="subtitle2"
        onClick={this.handleReset}
        className={classNames([classes.reset])}
      >
        {"x"}
      </Typography>
    );

    return (
      <div className={classes.wrapper}>
        {!hideReset ? <ResetButton /> : ""}

        {label ? <Label label={label} /> : ""}

        <div className="DayPickerWrapper">
          <DayPickerInput
            value={range}
            onDayChange={this.handleDayChange}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              modifiers,
              month: new Date()
            }}
            hideOnDayClick={false}
            inputProps={{ disabled }}
            placeholder="Select range..."
          />
        </div>
      </div>
    );
  }
}

HvDatePicker.propTypes = {
  /**
   * Styles applied from the theme
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The value to set to the component
   */
  value: PropTypes.instanceOf(Object),
  /**
   * Callback to call every time the component value changes
   */
  onChange: PropTypes.func,
  /**
   * The label to draw on top of the date picker input
   */
  label: PropTypes.string,
  /**
   * Hide reset button
   */
  hideReset: PropTypes.bool,
  /**
   * Prevent from opening the overlay
   */
  disabled: PropTypes.bool
};

HvDatePicker.defaultProps = {
  value: null,
  onChange: () => {},
  label: "",
  hideReset: false,
  disabled: false
};

export default HvDatePicker;
