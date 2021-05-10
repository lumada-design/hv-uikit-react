import React, { useCallback } from "react";

import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import { HvFormElement, HvLabel, HvWarningText, useUniqueId } from "..";
import { isInvalid } from "../Forms/FormElement/validationStates";

import { setId, useControlled } from "../utils";

import HvBaseSwitch from "../BaseSwitch";

import styles from "./styles";

/**
 * A Switch is <b>binary</b> and work as a digital on/off button.
 *
 * Use when two states are <b>opposite</b> and to trigger immediate
 * changes in the system.
 */
const HvSwitch = (props) => {
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

    onChange,

    status,
    statusMessage,
    "aria-errormessage": ariaErrorMessage,

    inputProps,

    ...others
  } = props;

  const elementId = useUniqueId(id, "hvswitch");

  const [isChecked, setIsChecked] = useControlled(checked, Boolean(defaultChecked));

  const [validationState, setValidationState] = useControlled(status, "standBy");

  const [validationMessage] = useControlled(statusMessage, "Required");

  const onLocalChange = useCallback(
    (evt, newChecked) => {
      setIsChecked(() => {
        // this will only run if uncontrolled
        if (required && !newChecked) {
          setValidationState("invalid");
        } else {
          setValidationState("valid");
        }

        return newChecked;
      });

      onChange?.(evt, newChecked, value);
    },
    [onChange, required, setIsChecked, setValidationState, value]
  );

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) || (status === undefined && required));

  const isStateInvalid = isInvalid(validationState);

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError ? setId(elementId, "error") : ariaErrorMessage;
  }

  return (
    <HvFormElement
      id={id}
      name={name}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(className, classes.root)}
    >
      {label && (
        <HvLabel
          id={setId(elementId, "label")}
          htmlFor={setId(elementId, "input")}
          label={label}
          className={clsx(classes.label)}
          {...labelProps}
        />
      )}
      <div className={clsx(classes.switchContainer, { [classes.invalidSwitch]: isStateInvalid })}>
        <HvBaseSwitch
          id={label ? setId(elementId, "input") : null}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={onLocalChange}
          value={value}
          checked={isChecked}
          inputProps={{
            "aria-invalid": isStateInvalid ? true : undefined,
            "aria-errormessage": errorMessageId,
            "aria-label": ariaLabel,
            "aria-labelledby": ariaLabelledBy,
            "aria-describedby": ariaDescribedBy,
            ...inputProps,
          }}
          {...others}
        />
      </div>
      {canShowError && (
        <HvWarningText
          id={setId(elementId, "error")}
          className={clsx(classes.error)}
          disableBorder
          disableAdornment
          hideText
        >
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvSwitch.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the switch.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the error area.
     */
    error: PropTypes.string,
    /**
     * Styles applied to the switch container.
     */
    switchContainer: PropTypes.string,
    /**
     * Styles applied to the switch container when the validations status is invalid.
     */
    invalidSwitch: PropTypes.string,
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
   * Generally it should be used only when the switch is neither unchecked nor indeterminate.
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
   * If `true` the switch is selected, if set to `false` the switch is not selected.
   *
   * When defined the switch state becomes controlled.
   */
  checked: PropTypes.bool,
  /**
   * When uncontrolled, defines the initial checked state.
   */
  defaultChecked: PropTypes.bool,

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
   * Identifies the element that provides an error message for the switch.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage": PropTypes.string,

  /**
   * The callback fired when the switch is pressed.
   */
  onChange: PropTypes.func,

  /**
   * Properties passed on to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvSwitch" })(HvSwitch);
