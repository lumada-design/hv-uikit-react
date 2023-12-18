import React, { forwardRef, useCallback, useState } from "react";

import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";

import {
  CheckboxCheck as CheckboxCheckIcon,
  CheckboxPartial as CheckboxPartialIcon,
  Checkbox as CheckboxIcon,
} from "@hitachivantara/uikit-react-icons";

import { ExtractNames } from "../utils/classes";
import { useDefaultProps } from "../hooks/useDefaultProps";

import { staticClasses, useClasses } from "./BaseCheckBox.styles";

export { staticClasses as baseCheckBoxClasses };

export type HvBaseCheckBoxClasses = ExtractNames<typeof useClasses>;

export interface HvBaseCheckBoxProps
  extends Omit<MuiCheckboxProps, "onChange" | "classes"> {
  /**
   * The input name.
   */
  name?: string;
  /**
   * The value of the input.
   *
   * Is up to the application's logic when to consider the submission of this value.
   * Generally it should be used only when the checkbox is neither unchecked nor indeterminate.
   *
   * The default value is "on".
   */
  value?: any;
  /**
   * Indicates that the input is disabled.
   */
  disabled?: boolean;
  /**
   * Indicates that the input is not editable.
   */
  readOnly?: boolean;
  /**
   * Indicates that user input is required.
   */
  required?: boolean;
  /**
   * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   *
   * When defined the checkbox state becomes controlled.
   */
  checked?: boolean;
  /**
   * When uncontrolled, defines the initial checked state.
   */
  defaultChecked?: boolean;
  /**
   * If `true` the checkbox visually shows the indeterminate state.
   */
  indeterminate?: boolean;
  /**
   * The callback fired when the checkbox is pressed.
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
  /**
   * Callback fired when the component is blurred.
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * A Jss Object used to override or extend the styles applied to the checkbox.
   */
  classes?: HvBaseCheckBoxClasses;
}

const getSelectorIcons = (
  options: {
    disabled: boolean;
    semantic: boolean;
  },
  classes: HvBaseCheckBoxClasses
) => {
  const { disabled, semantic } = options;
  const color =
    (disabled && ["atmo3", "secondary_60"]) ||
    (semantic && ["base_light", "base_dark"]) ||
    undefined;
  const checkedColor =
    (disabled && ["atmo3", "secondary_60"]) ||
    (semantic && ["base_dark", "base_light"]) ||
    undefined;

  // Default colors: ["atmo1","secondary"]
  return {
    checkbox: <CheckboxIcon color={color} className={classes.icon} />,
    checkboxPartial: (
      <CheckboxPartialIcon color={color} className={classes.icon} />
    ),
    checkboxChecked: (
      <CheckboxCheckIcon color={checkedColor} className={classes.icon} />
    ),
  };
};

/**
 * A Checkbox is a mechanism that allows user to select one or more options.
 *
 * The Base Checkbox is a building block of the Checkbox form element. Don't use unless
 * implementing a custom use case not covered by the Checkbox form element.
 */
export const HvBaseCheckBox = forwardRef<
  HTMLButtonElement,
  HvBaseCheckBoxProps
>((props, ref) => {
  const {
    id,
    classes: classesProp,
    className,
    name,
    inputProps,
    onChange,
    onFocusVisible,
    onBlur,
    checked,
    indeterminate,
    defaultChecked,
    value = "on",
    required = false,
    readOnly = false,
    disabled = false,
    semantic = false,
    ...others
  } = useDefaultProps("HvBaseCheckBox", props);

  const { classes, cx } = useClasses(classesProp);

  const [focusVisible, setFocusVisible] = useState<boolean>(false);

  const icons = getSelectorIcons({ disabled, semantic }, classes);

  const onChangeCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly) {
        return;
      }

      onChange?.(event, event.target.checked, value);
    },
    [onChange, readOnly, value]
  );

  const onBlurCallback = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      setFocusVisible(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const onFocusVisibleCallback = useCallback(
    (event: React.FocusEvent<any>) => {
      setFocusVisible(true);
      onFocusVisible?.(event);
    },
    [onFocusVisible]
  );

  return (
    <MuiCheckbox
      ref={ref}
      id={id}
      name={name}
      value={value}
      className={cx(
        classes.root,
        { [classes.disabled]: disabled, [classes.focusVisible]: focusVisible },
        className
      )}
      icon={icons.checkbox}
      indeterminateIcon={icons.checkboxPartial}
      checkedIcon={icons.checkboxChecked}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      checked={checked}
      defaultChecked={defaultChecked}
      indeterminate={indeterminate}
      inputProps={inputProps}
      onChange={onChangeCallback}
      onFocusVisible={onFocusVisibleCallback}
      onBlur={onBlurCallback}
      color="default"
      disableRipple
      {...others}
    />
  );
});
