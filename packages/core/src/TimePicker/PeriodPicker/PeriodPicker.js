import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { DropUpXS as UpIcon, DropDownXS as DownIcon } from "@hitachivantara/uikit-react-icons";
import { HvToggleButton } from "../..";
import { PeriodPickerOptions } from "../enums";

const PeriodPicker = (props) => {
  const { classes, period, onChangePeriod } = props;
  const [currentPeriod, setCurrentPeriod] = useState(period ?? PeriodPickerOptions.AM);

  /**
   * Gets the new value for the period
   * @returns the new value for the period
   * @memberof UnitTimePicker
   */
  const selectDifferentPeriod = () => {
    return currentPeriod === PeriodPickerOptions.AM
      ? PeriodPickerOptions.PM
      : PeriodPickerOptions.AM;
  };

  /**
   * Handles the period change
   * @memberof PeriodPicker
   */
  const handleChangePeriod = () => {
    const newPeriod = selectDifferentPeriod();
    setCurrentPeriod(newPeriod);
    onChangePeriod(newPeriod);
  };

  /**
   * Renders the PeriodPicker
   * @memberof UnitTimePicker
   */
  return (
    <div className={classes.periodContainer}>
      <UpIcon className={classes.icon} onClick={handleChangePeriod} />
      <HvToggleButton
        className={classes.periodToggle}
        selected={currentPeriod === PeriodPickerOptions.PM}
        onClick={handleChangePeriod}
      >
        {currentPeriod}
      </HvToggleButton>
      <DownIcon className={clsx(classes.icon, classes.subtractIcon)} onClick={handleChangePeriod} />
    </div>
  );
};
// }

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
