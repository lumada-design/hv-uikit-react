import React, { useCallback, useState } from "react";

import { RadioProps as MuiRadioProps } from "@mui/material";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvBaseProps } from "@core/types/generic";
import { HvBaseRadio } from "@core/components/BaseRadio";
import {
  HvWarningText,
  HvLabelProps,
  isInvalid,
  HvFormElement,
  HvLabel,
} from "@core/components/Forms";
import { useUniqueId } from "@core/hooks/useUniqueId";
import { useControlled } from "@core/hooks/useControlled";
import { setId } from "@core/utils/setId";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Radio.styles";

export { staticClasses as radioClasses };

export type HvRadioClasses = ExtractNames<typeof useClasses>;

export type HvRadioStatus = "standBy" | "valid" | "invalid";

export interface HvRadioProps
  extends Omit<MuiRadioProps, "onChange" | "classes">,
    HvBaseProps<HTMLButtonElement, "onChange" | "color"> {
  /**
   * A Jss Object used to override or extend the styles applied to the radio button.
   */
  classes?: HvRadioClasses;
  /**
   * The form element name.
   */
  name?: string;
  /**
   * The value of the form element.
   *
   * The default value is "on".
   */
  value?: any;
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided.
   */
  label?: React.ReactNode;
  /**
   * Properties passed on to the label element.
   */
  labelProps?: HvLabelProps;
  /**
   * Indicates that user input is required on the form element.
   *
   * If a single radio button in a group has the required attribute, a radio button in
   * that group must be check, though it doesn't have to be the one with the attribute is applied.
   *
   * For that reason, the component doesn't make any uncontrolled changes to its validation status.
   * That should ideally be managed in the context of a radio button group.
   */
  required?: boolean;
  /**
   * Indicates that the form element is not editable.
   */
  readOnly?: boolean;
  /**
   * Indicates that the form element is disabled.
   */
  disabled?: boolean;
  /**
   * If `true` the radio button is selected, if set to `false` the radio button is not selected.
   *
   * When defined the radio button state becomes controlled.
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
   */
  status?: HvRadioStatus;
  /**
   * The error message to show when `status` is "invalid".
   */
  statusMessage?: string;
  /**
   * Identifies the element that provides an error message for the radio button.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;
  /**
   * The callback fired when the radio button is pressed.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    value: any
  ) => void;
  /**
   * Whether the selector should use semantic colors.
   */
  semantic?: boolean;
  /**
   * Properties passed on to the input element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible?: (event: React.FocusEvent<any>) => void;
  /** @ignore */
  ref?: MuiRadioProps["ref"];
  /** @ignore */
  component?: MuiRadioProps["component"];
}

/**
 * A Radio Button is a mechanism that allows user to select just an option from a group of options.
 *
 * It should used in a Radio Button Group to present the user with a range of options from
 * which the user <b>may select just one option</b> to complete their task.
 *
 * Individual use of radio buttons, at least uncontrolled, is unadvised as React state management doesn't
 * respond to the browser's native management of radio inputs checked state.
 */
export const HvRadio = (props: HvRadioProps) => {
  const {
    classes: classesProp,
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
    status = "standBy",
    statusMessage,
    "aria-errormessage": ariaErrorMessage,
    semantic = false,
    inputProps,
    onFocusVisible,
    onBlur,
    ...others
  } = useDefaultProps("HvRadio", props);

  const { classes, cx } = useClasses(classesProp);

  const elementId = useUniqueId(id, "hvradio");

  const [focusVisible, setFocusVisible] = useState(false);

  const onFocusVisibleCallback = useCallback(
    (evt: React.FocusEvent<any>) => {
      setFocusVisible(true);
      onFocusVisible?.(evt);
    },
    [onFocusVisible]
  );

  const onBlurCallback = useCallback(
    (evt: React.FocusEvent<any>) => {
      setFocusVisible(false);
      onBlur?.(evt);
    },
    [onBlur]
  );

  const [isChecked, setIsChecked] = useControlled(
    checked,
    Boolean(defaultChecked)
  );

  const onLocalChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>, newChecked: boolean) => {
      setIsChecked(newChecked);

      onChange?.(evt, newChecked, value);
    },
    [onChange, setIsChecked, value]
  );

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled
  const canShowError =
    ariaErrorMessage == null &&
    status !== undefined &&
    statusMessage !== undefined;

  const hasLabel = label != null;

  const isStateInvalid = isInvalid(status);

  let errorMessageId: string | undefined;
  if (isStateInvalid) {
    errorMessageId = canShowError
      ? setId(elementId, "error")
      : ariaErrorMessage;
  }

  const radio = (
    <HvBaseRadio
      id={label ? setId(elementId, "input") : setId(id, "input")}
      name={name}
      className={cx(classes.radio, { [classes.invalidRadio]: isStateInvalid })}
      disabled={disabled}
      readOnly={readOnly}
      onChange={onLocalChange}
      value={value}
      checked={isChecked}
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
      status={status || "standBy"}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={cx(classes.root, className)}
    >
      {hasLabel ? (
        <div
          className={cx(classes.container, {
            [classes.disabled]: disabled,
            [classes.focusVisible]: !!(focusVisible && label),
            [classes.invalidContainer]: isStateInvalid,
          })}
        >
          {radio}
          <HvLabel
            id={setId(elementId, "label")}
            htmlFor={setId(elementId, "input")}
            label={label}
            className={classes.label}
            {...labelProps}
          />
        </div>
      ) : (
        radio
      )}
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} disableBorder>
          {statusMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};
