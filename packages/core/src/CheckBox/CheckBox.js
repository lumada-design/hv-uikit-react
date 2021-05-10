import React, { useCallback, useState } from "react";

import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import { HvFormElement, HvLabel, HvWarningText, useUniqueId } from "..";
import { isInvalid } from "../Forms/FormElement/validationStates";

import { setId, useControlled } from "../utils";

import HvBaseCheckBox from "../BaseCheckBox";

import styles from "./styles";

/**
 * A Checkbox is a mechanism that allows the user to select one or more options.
 *
 * Usually used in a Checkbox Group to present the user with a range of options from
 * which the user <b>may select any number of options</b> to complete their task.
 *
 * It can also be used individually to represent the toggle of a single option, when
 * the Toggle Switch and Toggle Button aren't more appropriate.
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
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    labelProps,

    checked,
    defaultChecked = false,
    indeterminate,

    onChange,

    status,
    statusMessage,
    "aria-errormessage": ariaErrorMessage,

    semantic = false,

    inputProps,

    onFocusVisible,
    onBlur,

    ...others
  } = props;

  const elementId = useUniqueId(id, "hvcheckbox");

  const [focusVisible, setFocusVisible] = useState(false);

  const onFocusVisibleCallback = useCallback(
    (evt) => {
      setFocusVisible(true);
      onFocusVisible?.(evt);
    },
    [onFocusVisible]
  );

  const onBlurCallback = useCallback(
    (evt) => {
      setFocusVisible(false);
      onBlur?.(evt);
    },
    [onBlur]
  );

  const [isChecked, setIsChecked] = useControlled(checked, Boolean(defaultChecked));

  const [isIndeterminate, setIsIndeterminate] = useControlled(
    checked !== undefined ? indeterminate : undefined,
    Boolean(indeterminate)
  );

  const [validationState, setValidationState] = useControlled(status, "standBy");

  const [validationMessage] = useControlled(statusMessage, "Required");

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

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) || (status === undefined && required));

  const hasLabel = label != null;

  const isStateInvalid = isInvalid(validationState);

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError ? setId(elementId, "error") : ariaErrorMessage;
  }

  const checkbox = (
    <HvBaseCheckBox
      id={hasLabel ? setId(elementId, "input") : null}
      name={name}
      className={clsx(classes.checkbox, { [classes.invalidCheckbox]: isStateInvalid })}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      onChange={onLocalChange}
      value={value}
      checked={isChecked}
      indeterminate={isIndeterminate}
      semantic={semantic}
      inputProps={{
        "aria-invalid": isStateInvalid ? true : undefined,
        "aria-errormessage": errorMessageId,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        ...inputProps,
      }}
      onFocusVisible={onFocusVisibleCallback}
      onBlur={onBlurCallback}
      {...others}
    />
  );

  return (
    <HvFormElement
      id={id}
      name={name}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(className, classes.root, {
        [classes.focusVisible]: focusVisible && label,
      })}
    >
      {hasLabel ? (
        <div
          className={clsx(classes.container, {
            [classes.disabled]: disabled,
            [classes.invalidContainer]: isStateInvalid,
          })}
        >
          {checkbox}
          <HvLabel
            id={setId(elementId, "label")}
            htmlFor={setId(elementId, "input")}
            label={label}
            className={clsx(classes.label)}
            {...labelProps}
          />
        </div>
      ) : (
        checkbox
      )}
      {canShowError && (
        <HvWarningText
          id={setId(elementId, "error")}
          disableAdornment={!hasLabel}
          hideText={!hasLabel}
          disableBorder
        >
          {validationMessage}
        </HvWarningText>
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
     * Styles applied to the HvBaseCheckbox (only when a label is provided).
     */
    invalidContainer: PropTypes.string,
    /**
     * Styles applied to the checkbox+label container when checkbox is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied to the HvBaseCheckbox.
     */
    checkbox: PropTypes.string,
    /**
     * Styles applied to the HvBaseCheckbox (only when a label is not provided).
     */
    invalidCheckbox: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
    /**
     * Class applied to the root element if keyboard focused.
     */
    focusVisible: PropTypes.string,
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
   * Is up to the application's logic when to consider the submission of this value.
   * Generally it should be used only when the checkbox is neither unchecked nor indeterminate.
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
   * @ignore
   */
  "aria-label": PropTypes.string,
  /**
   * @ignore
   */
  "aria-labelledby": PropTypes.string,
  /**
   * @ignore
   */
  "aria-describedby": PropTypes.string,
  /**
   * Properties passed on to the label element.
   */
  labelProps: PropTypes.instanceOf(Object),

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
   * If `true` the checkbox visually shows the indeterminate state.
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
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage: PropTypes.string,
  /**
   * Identifies the element that provides an error message for the checkbox.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage": PropTypes.string,

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

  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
};

export default withStyles(styles, { name: "HvCheckBox" })(HvCheckBox);
