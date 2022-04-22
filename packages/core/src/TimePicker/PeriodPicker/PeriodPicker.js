import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { DropUpXS as UpIcon, DropDownXS as DownIcon } from "@hitachivantara/uikit-react-icons";
import { HvToggleButton } from "../..";
import { PeriodPickerOptions } from "../enums";

class PeriodPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPeriod: props.period ?? PeriodPickerOptions.AM,
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
        <HvToggleButton
          className={classes.periodToggle}
          selected={currentPeriod === PeriodPickerOptions.PM}
          onClick={this.handleChangePeriod}
        >
          {currentPeriod}
        </HvToggleButton>
        <DownIcon
          className={clsx(classes.icon, classes.subtractIcon)}
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
  period: PropTypes.oneOf([PeriodPickerOptions.AM, PeriodPickerOptions.PM]),
};

export default PeriodPicker;
