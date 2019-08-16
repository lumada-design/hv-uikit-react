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
import UpIcon from "@hv/uikit-react-icons/dist/DropUp.XS";
import DownIcon from "@hv/uikit-react-icons/dist/DropDown.XS";
import { getPeriodForDate } from "../timePickerUtils";
import { PeriodPickerOptions } from "../enums";

class PeriodPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPeriod: props.period
    };
  }

  /**
   * Handles the period change
   * @memberof PeriodPicker
   */
  handleChangePeriod = () => {
    const { onChangePeriod } = this.props;
    const period = this.selectDifferentPeriod();
    this.setState({
      currentPeriod: period
    });
    onChangePeriod(period);
  };

  /**
   * Gets the new value for the period
   * @returns the new value for the period
   * @memberof UnitTimePicker
   */
  selectDifferentPeriod = () => {
    const { currentPeriod } = this.state;
    return currentPeriod === PeriodPickerOptions.AM
      ? PeriodPickerOptions.PM
      : PeriodPickerOptions.AM;
  };

  /**
   * Renders the PeriodPicker
   * @memberof UnitTimePicker
   */
  render() {
    const { classes } = this.props;
    const { currentPeriod } = this.state;

    return (
      <div className={classes.periodContainer}>
        <UpIcon className={classes.upIcon} onClick={this.handleChangePeriod} />
        <div className={classes.periodText}>{currentPeriod}</div>
        <DownIcon
          className={classes.downIcon}
          onClick={this.handleChangePeriod}
        />
      </div>
    );
  }
}

PeriodPicker.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the input/popper
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Callback function called when the period value changes
   */
  onChangePeriod: PropTypes.func.isRequired,
  /**
   * Default period value
   */
  period: PropTypes.oneOf([PeriodPickerOptions.AM, PeriodPickerOptions.PM])
};

PeriodPicker.defaultProps = {
  period: getPeriodForDate()
};

export default PeriodPicker;
