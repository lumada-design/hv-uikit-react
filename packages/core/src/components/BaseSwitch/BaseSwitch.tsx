import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { SwitchProps as MuiSwitchProps } from "@mui/material";
import { StyledSwitch } from "./BaseSwitch.styles";
import { HvBaseProps, HvExtraProps } from "../../types";
import { baseSwitchClasses, HvBaseSwitchClasses } from ".";

export type HvBaseSwitchProps = Omit<MuiSwitchProps, "onChange"> &
  HvBaseProps<HTMLInputElement, { onChange }> & {
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
  } & HvExtraProps;

/**
 * A Switch is <b>binary</b> and work as a digital on/off button.
 *
 * The Base Switch is a building block of the Switch form element. Don't use unless
 * implementing a custom use case not covered by the Switch form element.
 */
export const HvBaseSwitch = (props: HvBaseSwitchProps) => {
  const {
    classes,
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
  } = props;

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
    <StyledSwitch
      id={id}
      name={name}
      className={clsx(
        className,
        baseSwitchClasses.root,
        classes?.root,
        disabled && clsx(baseSwitchClasses.disabled, classes?.disabled),
        readOnly && clsx(baseSwitchClasses.readOnly, classes?.readOnly),
        focusVisible &&
          clsx(baseSwitchClasses.focusVisible, classes?.focusVisible)
      )}
      $focusVisible={focusVisible}
      $readOnly={readOnly}
      $disabled={disabled}
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
        root: clsx(baseSwitchClasses.switch, classes?.switch),
        switchBase: clsx(baseSwitchClasses.switchBase, classes?.switchBase),
        checked: clsx(baseSwitchClasses.checked, classes?.checked),
        track: clsx(baseSwitchClasses.track, classes?.track),
        thumb: clsx(baseSwitchClasses.thumb, classes?.thumb),
        disabled: clsx(baseSwitchClasses.disabled, classes?.disabled),
      }}
      inputProps={inputProps}
      onFocusVisible={onFocusVisibleCallback}
      onBlur={onBlurCallback}
      {...others}
    />
  );
};
