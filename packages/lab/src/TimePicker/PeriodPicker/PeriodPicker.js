import React from "react";
import PropTypes from "prop-types";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import { DropUpXS as UpIcon, DropDownXS as DownIcon } from "@hitachivantara/uikit-react-icons";
import { getPeriodForDate } from "../timePickerUtils";
import { PeriodPickerOptions } from "../enums";

class PeriodPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPeriod: props.period,
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
      currentPeriod: period,
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
        <UpIcon className={classes.icon} onClick={this.handleChangePeriod} />
        <HvTypography variant="highlightText" className={classes.periodText}>
          {currentPeriod}
        </HvTypography>
        <DownIcon className={classes.icon} onClick={this.handleChangePeriod} />
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
  period: PropTypes.oneOf([PeriodPickerOptions.AM, PeriodPickerOptions.PM]),
};

PeriodPicker.defaultProps = {
  period: getPeriodForDate(),
};

export default PeriodPicker;
