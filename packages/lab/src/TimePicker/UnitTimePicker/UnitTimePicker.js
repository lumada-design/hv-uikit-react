import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { HvInput, isKeypress, KeyboardCodes } from "@hv/uikit-react-core";
import { DropDownXS as SubtractTimeIcon, DropUpXS as AddTimeIcon } from "@hv/uikit-react-icons";
import { isUnitTimeInValidRange } from "../timePickerUtils";
import { padTime } from "../timePickerFormatter";
import { TimePickerUnits } from "../enums";

const UnitTimePicker = (props) => {
  const { classes, id, unit, unitValue = 0, onChangeUnitTimeValue } = props;

  const minValue = TimePickerUnits[unit].min;
  const maxValue = TimePickerUnits[unit].max;

  const [currentValue, setCurrentValue] = useState(unitValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  /**
   * Checks if the unit time is valid, meaning that is between the min and max values for the specific unit time
   * @memberof UnitTimePicker
   */
  const isUnitTimeValid = (unitTime) => {
    const valid = isUnitTimeInValidRange(unitTime, unit);
    setIsValid(valid);
    return valid;
  };

  /**
   * Changes the time unit value in the state.
   * The onChange callback is only called if the new value is a valid one (in the allowed range)
   *
   * @param {Number} value - new time unit value
   * @memberof UnitTimePicker
   */
  const changeTimeUnit = (value, callback = false) => {
    setCurrentValue(value);
    if (callback && isUnitTimeValid(value)) {
      onChangeUnitTimeValue(value);
    }
  };

  /**
   * Handles the unit time value change when it is done through a change on the input.
   * It only reflects on the state if the number of digits is between 0 and 2   *
   * @param event - event
   * @param value - new unit time value
   * @memberof UnitTimePicker
   */
  const handleCurrentValueChange = (event, value) => {
    const unitTime = value === "" ? value : Number(value);
    if ((unitTime || unitTime === "") && unitTime.toString().length <= 2) {
      changeTimeUnit(unitTime);
    }
  };

  /**
   * Handles the change on the focus of the input
   * @memberof UnitTimePicker
   */
  const handleFocusChange = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);

    if (isUnitTimeValid(currentValue)) {
      onChangeUnitTimeValue(currentValue);
    }
  };

  const handleKeyPressed = (event) => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      if (isUnitTimeValid(currentValue)) {
        onChangeUnitTimeValue(currentValue);
      }
    }
  };

  /**
   * Handles the action to increase the unit time value
   * If the new value surpasses the max allowed, it updates the time to the min value.
   * @memberof UnitTimePicker
   */
  const handleAddTime = () => {
    let newUnitTime = currentValue === "" ? minValue : currentValue + 1;
    if (newUnitTime > maxValue) {
      newUnitTime = minValue;
    }
    changeTimeUnit(newUnitTime, true);
  };

  /**
   * Handles the action to decrease the unit time value
   * If the new value goes below the min allowed, it updates the time to the max value.
   * @memberof UnitTimePicker
   */
  const handleSubtractTime = () => {
    let newUnitTime = currentValue === "" ? maxValue : currentValue - 1;
    if (newUnitTime < minValue) {
      newUnitTime = maxValue;
    }
    changeTimeUnit(newUnitTime, true);
  };

  /**
   * Renderers
   */

  /**
   * Renders the time unit value input in the correct format
   * @memberof UnitTimePicker
   */
  const renderTimeUnit = () => {
    return isFocused ? currentValue.toString() : padTime(currentValue).toString();
  };

  return (
    <div className={classes.unitTimeContainer}>
      <AddTimeIcon onClick={handleAddTime} />
      <HvInput
        id={id}
        disableClear
        classes={{
          input: classes.unitTimeInput,
          root: classes.inputContainer,
          inputBorderContainer: classes.inputBorderContainer,
          inputRoot: clsx(classes.unitTimeInputRoot, {
            [classes.unitTimeInputRootInvalid]: !isValid,
          }),
        }}
        value={renderTimeUnit()}
        onChange={handleCurrentValueChange}
        onFocus={handleFocusChange}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyPressed}
        labels={{
          placeholder: "",
        }}
      />
      <SubtractTimeIcon className={classes.subtractIcon} onClick={handleSubtractTime} />
    </div>
  );
};

UnitTimePicker.propTypes = {
  /**
   * Id to be applied to the input node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the input/popper
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Type of Unit time picker (hour, minute or second)
   */
  unit: PropTypes.oneOf([
    TimePickerUnits.HOUR_24.type,
    TimePickerUnits.HOUR_12.type,
    TimePickerUnits.MINUTE.type,
    TimePickerUnits.SECOND.type,
  ]).isRequired,
  /**
   * Default unit time value
   */
  unitValue: (otherProps, propName, componentName) => {
    const minValue = TimePickerUnits[otherProps.unit].min;
    const maxValue = TimePickerUnits[otherProps.unit].max;
    const unitValue = otherProps[propName];
    if (unitValue > maxValue || unitValue < minValue) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Value not in the correct range ${minValue}-${maxValue}`
      );
    }
    return null;
  },
  /**
   * Callback function called when the unit time value changes
   */
  onChangeUnitTimeValue: PropTypes.func.isRequired,
};

export default UnitTimePicker;
