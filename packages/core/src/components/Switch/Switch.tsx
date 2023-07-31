import React, { useCallback } from "react";

import { clsx } from "clsx";

import { SwitchProps as MuiSwitchProps } from "@mui/material";

import { useUniqueId } from "@core/hooks/useUniqueId";
import { useControlled } from "@core/hooks/useControlled";
import { setId } from "@core/utils/setId";
import {
  HvWarningText,
  HvLabelProps,
  HvFormStatus,
} from "@core/components/Forms";
import { HvBaseSwitch } from "@core/components/BaseSwitch";
import { HvBaseProps } from "@core/types/generic";
import { isInvalid } from "@core/components/Forms/FormElement/validationStates";

import {
  StyledFormElement,
  StyledLabel,
  StyledSwitchContainer,
} from "./Switch.styles";
import switchClasses, { HvSwitchClasses } from "./switchClasses";

export interface HvSwitchProps
  extends Omit<MuiSwitchProps, "onChange" | "classes">,
    HvBaseProps<HTMLButtonElement, "onChange" | "color"> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the switch.
   */
  classes?: HvSwitchClasses;
  /**
   * Id to be applied to the form element root node.
   */
  id?: string;
  /**
   * The form element name.
   */
  name?: string;
  /**
   * The value of the form element.
   *
   * Is up to the application's logic when to consider the submission of this value.
   * Generally it should be used only when the switch is neither unchecked nor indeterminate.
   *
   * The default value is "on".
   */
  value?: any;
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be inputted via inputProps.
   */
  label?: React.ReactNode;
  /**
   * @ignore
   */
  "aria-label"?: string;
  /**
   * @ignore
   */
  "aria-labelledby"?: string;
  /**
   * @ignore
   */
  "aria-describedby"?: string;
  /**
   * Properties passed on to the label element.
   */
  labelProps?: HvLabelProps;
  /**
   * Indicates that the form element is disabled.
   */
  disabled?: boolean;
  /**
   * Indicates that the form element is not editable.
   */
  readOnly?: boolean;
  /**
   * Indicates that user input is required on the form element.
   */
  required?: boolean;
  /**
   * If `true` the switch is selected, if set to `false` the switch is not selected.
   *
   * When defined the switch state becomes controlled.
   */
  checked?: boolean;
  /**
   * When uncontrolled, defines the initial checked state.
   */
  defaultChecked?: boolean;
  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to `checked`, depending of the values of both `required` and `checked`.
   */
  status?: HvFormStatus;
  /**
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage?: string;
  /**
   * Identifies the element that provides an error message for the switch.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;
  /**
   * The callback fired when the switch is pressed.
   */
  onChange?: (event: React.ChangeEvent, checked: boolean, value: any) => void;
  /**
   * Properties passed on to the input element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * A Switch is <b>binary</b> and work as a digital on/off button.
 *
 * Use when two states are <b>opposite</b> and to trigger immediate
 * changes in the system.
 */
export const HvSwitch = (props: HvSwitchProps) => {
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

  const [isChecked, setIsChecked] = useControlled(
    checked,
    Boolean(defaultChecked)
  );

  const [validationState, setValidationState] = useControlled(
    status,
    "standBy"
  );

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
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));

  const isStateInvalid = isInvalid(validationState);

  let errorMessageId: string | undefined;
  if (isStateInvalid) {
    errorMessageId = canShowError
      ? setId(elementId, "error")
      : ariaErrorMessage;
  }

  return (
    <StyledFormElement
      id={id}
      name={name}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(className, switchClasses.root, classes?.root)}
    >
      {label && (
        <StyledLabel
          id={setId(elementId, "label")}
          htmlFor={setId(elementId, "input")}
          label={label}
          className={clsx(switchClasses.label, classes?.label)}
          {...labelProps}
        />
      )}
      <StyledSwitchContainer
        className={clsx(
          switchClasses.switchContainer,
          classes?.switchContainer,
          isStateInvalid &&
            clsx(switchClasses.invalidSwitch, classes?.invalidSwitch)
        )}
        $invalid={isStateInvalid}
      >
        <HvBaseSwitch
          id={label ? setId(elementId, "input") : setId(id, "input")}
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
      </StyledSwitchContainer>
      {canShowError && (
        <HvWarningText
          id={setId(elementId, "error")}
          className={clsx(switchClasses.error, classes?.error)}
          disableBorder
          disableAdornment
          hideText
        >
          {validationMessage}
        </HvWarningText>
      )}
    </StyledFormElement>
  );
};
