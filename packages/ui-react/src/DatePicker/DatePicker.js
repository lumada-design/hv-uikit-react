/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";

import "react-day-picker/lib/style.css";
import "./styles.css";

const INITIAL_STATE = {
  from: null,
  to: null
};

class HvDatePicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 1
  };

  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = INITIAL_STATE;
  }

  handleDayChange(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    const { handleDateChange } = this.props;

    this.setState(range);
    handleDateChange(range);
  }

  handleReset() {
    const { handleDateChange } = this.props;

    this.setState(INITIAL_STATE);
    handleDateChange(INITIAL_STATE);
  }

  render() {
    const { from, to } = this.state;
    const { classes, label, numberOfMonths } = this.props;

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

    const Controls = () => (
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
        <Controls />

        {label ? <Label label={label} /> : ""}

        <div className="DayPickerWrapper">
          <DayPickerInput
            value={range}
            onDayChange={this.handleDayChange}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              modifiers,
              numberOfMonths,
              month: new Date()
            }}
            hideOnDayClick={false}
            placeholder="Select range..."
          />
        </div>
      </div>
    );
  }
}

HvDatePicker.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  handleDateChange: PropTypes.func,
  label: PropTypes.string,
  numberOfMonths: PropTypes.number
};

HvDatePicker.defaultProps = {
  handleDateChange: () => {},
  label: ""
};

export default HvDatePicker;
