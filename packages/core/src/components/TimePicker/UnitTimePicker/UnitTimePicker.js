import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  DropDownXS as SubtractTimeIcon,
  DropUpXS as AddTimeIcon,
} from "@hitachivantara/uikit-react-icons";
import { HvInput, isKeypress, KeyboardCodes } from "../..";
import { isUnitTimeInValidRange } from "../timePickerUtils";
import { padTime } from "../timePickerFormatter";
import { TimePickerUnits } from "../enums";

const UnitTimePicker = (props) => {
  const { classes, id, placeholder, unit, unitValue, onChangeUnitTimeValue } =
    props;

  const minValue = TimePickerUnits[unit].min;
  const maxValue = TimePickerUnits[unit].max;

  const [currentValue, setCurrentValue] = useState(unitValue ?? "");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  /**
   * Changes the time unit value in the state.
   *
   * @param {Number} value - new time unit value
   * @memberof UnitTimePicker
   */
  const changeTimeUnit = (value, callback = false) => {
    setCurrentValue(value);
    setIsValid(isUnitTimeInValidRange(value, unit));

    if (callback) {
      onChangeUnitTimeValue(value !== "" ? value : null);
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
    if (unitTime.toString().length <= 2) {
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

    onChangeUnitTimeValue(currentValue !== "" ? currentValue : null);
  };

  const handleKeyPressed = (event) => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      onChangeUnitTimeValue(currentValue !== "" ? currentValue : null);
    }
  };

  /**
   * Handles the action to increase the unit time value
   * If the new value surpasses the max allowed, it updates the time to the min value.
   * @memberof UnitTimePicker
   */
  const handleAddTime = () => {
    let newUnitTime = currentValue === "" ? minValue : currentValue + 1;
    if (newUnitTime < minValue) {
      newUnitTime = minValue;
    } else if (newUnitTime > maxValue) {
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
    } else if (newUnitTime > maxValue) {
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
    return isFocused
      ? currentValue.toString()
      : padTime(currentValue).toString();
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
          inputRoot: clsx(classes.unitTimeInputRoot),
        }}
        required
        status={isValid ? "valid" : "invalid"}
        value={currentValue !== "" ? renderTimeUnit() : ""}
        onChange={handleCurrentValueChange}
        onFocus={handleFocusChange}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyPressed}
        placeholder={placeholder}
        inputProps={{
          autoComplete: "off",
          type: "number",
          min: TimePickerUnits[unit].min,
          max: TimePickerUnits[unit].max,
        }}
      />
      <SubtractTimeIcon
        className={classes.subtractIcon}
        onClick={handleSubtractTime}
      />
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
   * The placeholder when empty.
   */
  placeholder: PropTypes.string,
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
  unitValue: PropTypes.number,
  /**
   * Callback function called when the unit time value changes
   */
  onChangeUnitTimeValue: PropTypes.func.isRequired,
};

export default UnitTimePicker;
