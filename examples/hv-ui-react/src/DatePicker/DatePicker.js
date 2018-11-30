/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./styles.css";

import { DateRange } from "react-date-range";

class HvDatePicker extends Component {
  state = {
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    },
    isActive: false
  };

  handleRangeChange(payload) {
    const { selection } = payload;
    const { handleChange } = this.props;

    this.setState({
      selection
    });

    handleChange(selection);
  }

  handleClick() {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }

  render() {
    const { selection, isActive } = this.state;
    const { startDate, endDate } = selection;

    const start = moment(startDate).format("DD/MM/YYYY");
    const end = moment(endDate).format("DD/MM/YYYY");
    const range = `${start} - ${end}`;

    return (
      <React.Fragment>
        <div>
          <input
            onClick={() => this.handleClick()}
            type="text"
            readOnly
            value={range}
            className="DateField"
          />
        </div>

        <div
          className={classNames([
            "Wrapper",
            {
              active: isActive
            }
          ])}
        >
          <DateRange
            onChange={payload => this.handleRangeChange(payload)}
            moveRangeOnFirstSelection={false}
            ranges={[selection]}
            showDateDisplay={false}
          />
        </div>
      </React.Fragment>
    );
  }
}

HvDatePicker.propTypes = {
  handleChange: PropTypes.func
};

HvDatePicker.defaultProps = {
  handleChange: () => {}
};

export default HvDatePicker;
