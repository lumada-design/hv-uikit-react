import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { Remove } from "@hitachivantara/uikit-react-icons";
import clsx from "clsx";
import styles from "./styles";
import { HvInput, setId } from "../..";
import { knobsValuesToString, stringValuesToKnobs } from "../utils";

const HvSliderInput = (props) => {
  const {
    classes,
    className,
    id,
    label,
    values: valuesProp = [],
    inputProps = [],
    status,
    onChange,
    readOnly = false,
    disabled = false,
    markDigits = 0,
    ...others
  } = props;

  const [inputValues, setInputValues] = useState(knobsValuesToString(valuesProp, markDigits));
  const handleChange = (index) => {
    if (disabled) return;
    onChange(stringValuesToKnobs(inputValues), index);
  };

  useEffect(() => {
    setInputValues(knobsValuesToString(valuesProp, markDigits));
  }, [markDigits, valuesProp]);

  return (
    <div className={clsx(className, classes.inputRoot)} {...others}>
      {inputValues.map((value, index) => (
        <div key={setId(id, index)} className={clsx(classes.inputContainer)}>
          {index !== 0 && <Remove color={disabled ? ["atmo4"] : undefined} />}
          <HvInput
            id={setId(id, index)}
            aria-label={`${label}-${index}`}
            className={classes.input}
            disabled={disabled}
            type="number"
            value={Number.isNaN(value) || value == null ? "" : value.toString()}
            onEnter={() => handleChange(index)}
            onBlur={() => handleChange(index)}
            onChange={(e, inputValue) => {
              const newValues = [...inputValues];
              newValues[index] = inputValue;
              setInputValues(newValues);
            }}
            status={status[index] || "standBy"}
            readOnly={readOnly}
            disableClear
            {...inputProps[index]}
          />
        </div>
      ))}
    </div>
  );
};

HvSliderInput.propTypes = {
  /**
   * Styles applied from the theme.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the external div containing the whole calendar.
     */
    inputRoot: PropTypes.string,
    input: PropTypes.string,
    inputContainer: PropTypes.string,
  }).isRequired,
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * Used to generate the aria-label for the inputs
   */
  label: PropTypes.string,
  status: PropTypes.arrayOf(PropTypes.string),
  /**
   * The class name to add at the root of the single calendar
   */
  className: PropTypes.string,
  /**
   * The values array to apply to the component
   */
  values: PropTypes.arrayOf(PropTypes.number),
  /**
   * Callback function to be triggered when the selected date has changed.
   */
  onChange: PropTypes.func,
  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  /**
   * Indicates that the form element is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that the form element is read only.
   */
  readOnly: PropTypes.bool,
  /**
   * Indicates how many decimals to use.
   */
  markDigits: PropTypes.number,
};

export default withStyles(styles, { name: "HvSliderInput" })(HvSliderInput);
