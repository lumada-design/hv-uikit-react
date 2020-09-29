import React, { useCallback } from "react";

import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import { HvFormElement, HvLabel, HvWarningText, useUniqueId } from "..";

import { setId, useControlled } from "../utils";

import HvBaseCheckBox from "../BaseCheckBox";

import styles from "./styles";

/**
 * A Checkbox is a mechanism that allows user to select one or more options.
 *
 * Usually used in a Checkbox Group to present the user with a range of options from
 * which the user <b>may select any number of options</b> to complete their task.
 *
 * It can also be used individually to represent the toggle of a single option, when
 * the Toogle Switch and Toggle Button aren't more appropriate.
 */
const HvCheckBox = (props) => {
  const {
    classes,
    className,

    id,
    name,
    value = "on",
    required = false,
    readOnly = false,
    disabled = false,

    label,

    checked,
    defaultChecked = false,
    indeterminate,

    onChange,

    status,
    statusMessage,

    semantic = false,

    inputProps,
    ...others
  } = props;

  const elementId = useUniqueId(id, "hvcheckbox");

  const [isChecked, setIsChecked] = useControlled({
    controlled: checked,
    default: Boolean(defaultChecked),
    name: "HvCheckbox",
    state: "checked",
  });

  const [isIndeterminate, setIsIndeterminate] = useControlled({
    controlled: checked !== undefined ? indeterminate : undefined,
    default: Boolean(indeterminate),
    name: "HvCheckbox",
    state: "indeterminate",
  });

  const [validationState, setValidationState] = useControlled({
    controlled: status,
    default: "standBy",
    name: "HvCheckbox",
    state: "status",
  });

  const [validationMessage] = useControlled({
    controlled: statusMessage,
    default: "Required",
    name: "HvCheckbox",
    state: "statusMessage",
  });

  const onLocalChange = useCallback(
    (evt, newChecked) => {
      setIsChecked(() => {
        // this will only run if uncontrolled
        setIsIndeterminate(false);

        if (required && !newChecked) {
          setValidationState("invalid");
        } else {
          setValidationState("valid");
        }

        return newChecked;
      });

      onChange?.(evt, newChecked, value);
    },
    [onChange, required, setIsChecked, setIsIndeterminate, setValidationState, value]
  );

  // error message area will only be needed if the status is being controlled
  // or if the checked state is uncontrolled and required is true
  const canShowError = status !== undefined || (required && checked === undefined);

  const checkbox = (
    <HvBaseCheckBox
      id={label ? setId(elementId, "input") : null}
      name={name}
      className={clsx(classes.checkBox)}
      disabled={disabled}
      readOnly={readOnly}
      onChange={onLocalChange}
      value={value}
      checked={isChecked}
      indeterminate={isIndeterminate}
      semantic={semantic}
      inputProps={{
        "aria-invalid": validationState === "invalid" ? true : undefined,
        "aria-errormessage": validationState === "invalid" ? setId(elementId, "error") : undefined,
        ...inputProps,
      }}
    />
  );

  return (
    <HvFormElement
      id={id}
      name={name}
      value={value}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(className, classes.root)}
      {...others}
    >
      {label ? (
        <div
          className={clsx(classes.container, {
            [classes.disabled]: disabled,
          })}
        >
          {checkbox}
          <HvLabel
            id={setId(elementId, "label")}
            htmlFor={setId(elementId, "input")}
            label={label}
            className={clsx(classes.label)}
          />
        </div>
      ) : (
        checkbox
      )}
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")}>{validationMessage}</HvWarningText>
      )}
    </HvFormElement>
  );
};

HvCheckBox.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the checkbox.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the checkbox+label container (only when a label is provided).
     */
    container: PropTypes.string,
    /**
     * Styles applied to the checkbox+label container when checkbox is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied to the HvBaseCheckbox.
     */
    checkBox: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
  }).isRequired,

  /**
   * Id to be applied to the form element root node.
   */
  id: PropTypes.string,

  /**
   * The form element name.
   */
  name: PropTypes.string,
  /**
   * The value of the form element.
   *
   * Is up to the application's logic when to consider the submition of this value.
   * Generaly it should be used only when the checkbox is neither unchecked nor indeterminate.
   *
   * The default value is "on".
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be inputted via inputProps.
   */
  label: PropTypes.node,

  /**
   * Indicates that the form element is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that the form element is not editable.
   */
  readOnly: PropTypes.bool,
  /**
   * Indicates that user input is required on the form element.
   */
  required: PropTypes.bool,

  /**
   * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   *
   * When defined the checkbox state becomes controlled.
   */
  checked: PropTypes.bool,
  /**
   * When uncontrolled, defines the initial checked state.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true` the checkbox visualy shows the indeterminate state.
   *
   * When the checkbox is uncontrolled the indeterminate state is cleared after any change
   * to the checked state. However, if controlled the user must also control the indeterminate
   * state.
   */
  indeterminate: PropTypes.bool,

  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to `checked`, depending of the values of both `required` and `checked`.
   */
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * The error message to show when `status` is "invalid". Defaults to "Required".
   */
  statusMessage: PropTypes.string,

  /**
   * The callback fired when the checkbox is pressed.
   */
  onChange: PropTypes.func,

  /**
   * Whether the selector should use semantic colors.
   */
  semantic: PropTypes.bool,

  /**
   * Properties passed on to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvCheckBox" })(HvCheckBox);
