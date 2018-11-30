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
import DayPickerInput, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./styles.css";

class HvDatePicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 1
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
      isActive: false
    };
  }

  handleDayClick(day) {
    const { handleDateChange } = this.props;
    const range = DateUtils.addDayToRange(day, this.state);

    this.setState(range);
    handleDateChange(range);
  }

  handleReset() {
    this.setState(this.getInitialState());
  }

  handleClick() {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }

  render() {
    const { from, to, isActive } = this.state;
    const { numberOfMonths } = this.props;

    const modifiers = { start: from, end: to };

    const start = moment(from).format("MM/DD/YYYY");
    const end = moment(to).format("MM/DD/YYYY");
    const range = `${start} - ${end}`;

    return (
      <div className="DateWrapper">
        <div className="DateReset" onClick={this.handleReset}>
          x
        </div>

        <div className="DateField">
          <input
            className="DateInput"
            type="text"
            readOnly
            value={range}
            onClick={this.handleClick}
          />
        </div>

        <DayPickerInput
          className={classNames([
            "DatePicker",
            {
              active: isActive
            }
          ])}
          numberOfMonths={numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

HvDatePicker.propTypes = {
  handleDateChange: PropTypes.func
};

HvDatePicker.defaultProps = {
  handleDateChange: () => {}
};

export default HvDatePicker;
