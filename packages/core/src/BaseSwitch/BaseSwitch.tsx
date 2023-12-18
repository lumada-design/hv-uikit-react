import React, { useState, useCallback, forwardRef } from "react";

import MuiSwitch, { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { ExtractNames } from "../utils/classes";

import { useClasses, staticClasses } from "./BaseSwitch.styles";

export { staticClasses as baseSwitchClasses };

export type HvBaseSwitchClasses = ExtractNames<typeof useClasses>;

export interface HvBaseSwitchProps
  extends Omit<MuiSwitchProps, "onChange" | "classes"> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the switch.
   */
  classes?: HvBaseSwitchClasses;
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * The input name.
   */
  name?: string;
  /**
   * The value of the input.
   *
   * Is up to the application's logic when to consider the submission of this value.
   * Generally it should be used only when the switch is neither unchecked nor indeterminate.
   *
   * The default value is "on".
   */
  value?: any;
  /**
   * Indicates that user input is required.
   */
  required?: boolean;
  /**
   * Indicates that the input is not editable.
   */
  readOnly?: boolean;
  /**
   * Indicates that the input is disabled.
   */
  disabled?: boolean;
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
   * The callback fired when the switch is pressed.
   */
  onChange?: (event: React.ChangeEvent, checked: boolean, value: any) => void;
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
   * @ignore
   */
  onBlur?: (event: React.FocusEvent<any>) => void;
}

/**
 * A Switch is <b>binary</b> and work as a digital on/off button.
 *
 * The Base Switch is a building block of the Switch form element. Don't use unless
 * implementing a custom use case not covered by the Switch form element.
 */
export const HvBaseSwitch = forwardRef<HTMLButtonElement, HvBaseSwitchProps>(
  (props, ref) => {
    const {
      classes: classesProp,
      className,

      id,
      name,
      value = "on",

      required = false,
      readOnly = false,
      disabled = false,

      checked,
      defaultChecked,

      onChange,

      inputProps,

      onFocusVisible,
      onBlur,

      ...others
    } = useDefaultProps("HvBaseSwitch", props);

    const { classes, cx } = useClasses(classesProp);

    const [focusVisible, setFocusVisible] = useState(false);

    const onFocusVisibleCallback = useCallback(
      (evt: React.FocusEvent<any, Element>) => {
        setFocusVisible(true);
        onFocusVisible?.(evt);
      },
      [onFocusVisible]
    );

    const onBlurCallback = useCallback(
      (evt: React.FocusEvent<any, Element>) => {
        setFocusVisible(false);
        onBlur?.(evt);
      },
      [onBlur]
    );

    const onLocalChange = useCallback(
      (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (readOnly) {
          return;
        }

        onChange?.(evt, evt.target.checked, value);
      },
      [onChange, readOnly, value]
    );

    return (
      <MuiSwitch
        ref={ref}
        id={id}
        name={name}
        className={cx(
          classes.root,
          {
            [classes.disabled]: disabled,
            [classes.readOnly]: readOnly,
            [classes.focusVisible]: focusVisible,
          },
          className
        )}
        color="default"
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        disableRipple
        onChange={onLocalChange}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        classes={{
          root: classes.switch,
          switchBase: classes.switchBase,
          checked: classes.checked,
          track: classes.track,
          thumb: classes.thumb,
          disabled: classes.disabled,
        }}
        inputProps={inputProps}
        onFocusVisible={onFocusVisibleCallback}
        onBlur={onBlurCallback}
        {...others}
      />
    );
  }
);
