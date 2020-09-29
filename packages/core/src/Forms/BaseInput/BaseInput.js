import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Input, withStyles } from "@material-ui/core";
import { setId } from "../../utils";
import { HvFormElementContext } from "../FormElement";
import styles from "./styles";

/**
 * An Input component that only posses the most basic functionalities.
 * It should be used alongside the other form elements to construct a proper accessible form.
 */
const HvBaseInput = (props) => {
  const {
    placeholder,
    classes,
    className = "",
    id,
    disabled = false,
    inputProps,
    inputRef,
    onChange,
    value,
    multiline = false,
    defaultValue,
    required = false,
    invalid = false,
    ...others
  } = props;
  const {
    elementId,
    elementName,
    elementStatus,
    elementValue,
    elementDisabled,
    descriptors = {},
  } = useContext(HvFormElementContext);

  const onChangeHandler = (event) => {
    onChange?.(event, event.target.value);
  };

  const localInvalid = invalid || elementStatus === "invalid";
  const localValue = value ?? elementValue;
  const localDisabled = disabled || elementDisabled;
  const localId = id ?? setId(elementId, "input");
  const { HvLabel, HvHelperText, HvSuggestions } = descriptors;

  return (
    <Input
      id={localId}
      name={elementName}
      defaultValue={defaultValue}
      value={localValue}
      disabled={localDisabled}
      placeholder={placeholder}
      onChange={onChangeHandler}
      classes={{
        input: classes.input,
        focused: classes.inputRootFocused,
        disabled: classes.inputDisabled,
        multiline: classes.multiLine,
      }}
      className={clsx(classes.inputRoot, className, {
        [classes.inputRootDisabled]: localDisabled,
        [classes.inputRootInvalid]: localInvalid,
      })}
      inputProps={{
        required,
        "aria-required": required || undefined,
        "aria-invalid": localInvalid || undefined,
        "aria-describedby": HvHelperText?.[0]?.id,
        "aria-labelledby": HvLabel?.[0]?.id,
        "aria-controls": HvSuggestions?.[0]?.id,
        ...inputProps,
      }}
      inputRef={inputRef}
      multiline={multiline}
      {...others}
    />
  );
};

HvBaseInput.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root container of the input.
     */
    root: PropTypes.string,
    /**
     * Styles applied to input root which is comprising of everything but the labels and descriptions.
     */
    inputRoot: PropTypes.string,
    /**
     * Styles applied to input root when it is disabled.
     */
    inputRootDisabled: PropTypes.string,
    /**
     * Styles applied to input root when it is invalid.
     */
    inputRootInvalid: PropTypes.string,
    /**
     * Styles applied to input root when it is focused.
     */
    inputRootFocused: PropTypes.string,
    /**
     * Styles applied to input html element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to input html element when it is disabled.
     */
    inputDisabled: PropTypes.string,
    /**
     * Styles applied to input html element when it is multiline mode.
     */
    multiLine: PropTypes.string,
    /**
     * IE11 specific styling.
     */
    "@global": PropTypes.string,
  }).isRequired,
  /**
   * Label inside the input used to help user.
   */
  placeholder: PropTypes.string,
  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
  /**
   * Allows passing a ref to the underlying input
   */
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  /**
   * If ´true´ the input is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it.
   */
  onChange: PropTypes.func,
  /**
   * The value of the input, when controlled.
   */
  value: PropTypes.string,
  /**
   * The initial value of the input, when uncontrolled.
   */
  defaultValue: PropTypes.string,
  /**
   * If true, a textarea element will be rendered.
   */
  multiline: PropTypes.bool,
  /**
   * If true, the input element will be required.
   */
  required: PropTypes.bool,
  /**
   * Denotes if the input is in an invalid state.
   */
  invalid: PropTypes.bool,
};

export default withStyles(styles, { name: "HvBaseInput" })(HvBaseInput);
