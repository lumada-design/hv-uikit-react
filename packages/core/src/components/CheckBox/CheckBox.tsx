import { clsx } from "clsx";
import { useControlled, useUniqueId } from "@core/hooks";
import { useCallback, useState } from "react";
import { setId } from "@core/utils";
import { HvBaseCheckBoxProps } from "../BaseCheckBox";
import { HvLabelProps, HvFormStatus, HvWarningText, isInvalid } from "../Forms";
import {
  StyledBaseCheckBox,
  StyledFormElement,
  StyledLabel,
  StyledLabelContainer,
} from "./CheckBox.styles";
import checkBoxClasses, { HvCheckBoxClasses } from "./checkBoxClasses";

export interface HvCheckBoxProps extends Omit<HvBaseCheckBoxProps, "classes"> {
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be inputted via inputProps.
   */
  label?: React.ReactNode;
  /**
   * Properties passed on to the label element.
   */
  labelProps?: HvLabelProps;
  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: HvFormStatus;
  /**
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage?: React.ReactNode;
  /**
   * A Jss Object used to override or extend the styles applied to the checkbox.
   */
  classes?: HvCheckBoxClasses;
}

/**
 * A Checkbox is a mechanism that allows the user to select one or more options.
 *
 * Usually used in a Checkbox Group to present the user with a range of options from
 * which the user <b>may select any number of options</b> to complete their task.
 *
 * It can also be used individually to represent the toggle of a single option, when
 * the Toggle Switch and Toggle Button aren't more appropriate.
 */
export const HvCheckBox = ({
  id,
  classes,
  className,
  name,
  checked,
  status,
  indeterminate,
  statusMessage,
  label,
  labelProps,
  inputProps,
  value = "on",
  required = false,
  readOnly = false,
  disabled = false,
  semantic = false,
  defaultChecked = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-errormessage": ariaErrorMessage,
  onChange,
  onFocusVisible,
  onBlur,
  ...others
}: HvCheckBoxProps) => {
  const elementId = useUniqueId(id, "hvcheckbox");

  const [focusVisible, setFocusVisible] = useState<boolean>(false);

  const [validationState, setValidationState] = useControlled(
    status,
    "standBy"
  );

  const [validationMessage] = useControlled(statusMessage, "Required");

  const [isChecked, setIsChecked] = useControlled(
    checked,
    Boolean(defaultChecked)
  );

  const [isIndeterminate, setIsIndeterminate] = useControlled(
    checked !== undefined ? indeterminate : undefined,
    Boolean(indeterminate)
  );

  const isStateInvalid = isInvalid(validationState);

  const onChangeCallback = useCallback<
    NonNullable<HvBaseCheckBoxProps["onChange"]>
  >(
    (event, newChecked) => {
      setIsChecked(() => {
        // This will only run if uncontrolled
        setIsIndeterminate(false);

        if (required && !newChecked) {
          setValidationState("invalid");
        } else {
          setValidationState("valid");
        }

        return newChecked;
      });

      onChange?.(event, newChecked, value);
    },
    [
      onChange,
      required,
      setIsChecked,
      setIsIndeterminate,
      setValidationState,
      value,
    ]
  );

  const onFocusVisibleCallback: HvBaseCheckBoxProps["onBlur"] = (event) => {
    setFocusVisible(true);
    onFocusVisible?.(event);
  };

  const onBlurCallback: HvBaseCheckBoxProps["onBlur"] = (event) => {
    setFocusVisible(false);
    onBlur?.(event);
  };

  // The error message area will only be created if:
  //   - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));

  const hasLabel = label != null;

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError
      ? setId(elementId, "error")
      : ariaErrorMessage;
  }

  const checkbox = (
    <StyledBaseCheckBox
      id={hasLabel ? setId(elementId, "input") : setId(id, "input")}
      name={name}
      className={clsx(
        checkBoxClasses.checkbox,
        classes?.checkbox,
        isStateInvalid &&
          clsx(checkBoxClasses.invalidCheckbox, classes?.invalidCheckbox)
      )}
      $invalid={isStateInvalid}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      onChange={onChangeCallback}
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
    <StyledFormElement
      id={id}
      name={name}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(
        className,
        checkBoxClasses.root,
        classes?.root,
        !!(focusVisible && label) &&
          clsx(checkBoxClasses.focusVisible, classes?.focusVisible)
      )}
      $focusVisible={!!(focusVisible && label)}
    >
      {hasLabel ? (
        <StyledLabelContainer
          className={clsx(
            checkBoxClasses.container,
            classes?.container,
            disabled && clsx(checkBoxClasses.disabled, classes?.disabled),
            isStateInvalid &&
              clsx(checkBoxClasses.invalidContainer, classes?.invalidContainer)
          )}
          $disabled={disabled}
          $invalid={isStateInvalid}
        >
          {checkbox}
          <StyledLabel
            id={setId(elementId, "label")}
            htmlFor={setId(elementId, "input")}
            label={label}
            className={clsx(checkBoxClasses.label, classes?.label)}
            $disabled={disabled}
            {...labelProps}
          />
        </StyledLabelContainer>
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
    </StyledFormElement>
  );
};
