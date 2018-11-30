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
import classNames from "classnames";
import moment from "moment";
import DayPickerInput, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./styles.css";

export default class Example extends React.Component {
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
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
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
    const modifiers = { start: from, end: to };

    const start = moment(from).format("MM/DD/YYYY");
    const end = moment(to).format("MM/DD/YYYY");
    const range = `${start} - ${end}`;

    return (
      <div className="Wrapper">
        <div className="Reset" onClick={this.handleReset}>
          x
        </div>
        <input
          onClick={this.handleClick}
          type="text"
          readOnly
          value={range}
          className="DateField"
        />
        <div
          className={classNames([
            "Calendar",
            {
              active: isActive
            }
          ])}
        >
          <DayPickerInput
            className="Selectable"
            numberOfMonths={this.props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
          />
        </div>
      </div>
    );
  }
}
