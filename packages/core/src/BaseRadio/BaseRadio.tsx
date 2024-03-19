import { useState, useCallback, forwardRef } from "react";

import MuiRadio, { RadioProps as MuiRadioProps } from "@mui/material/Radio";

import {
  RadioButtonUnselected,
  RadioButtonSelected,
} from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { ExtractNames } from "../utils/classes";

import { staticClasses, useClasses } from "./BaseRadio.styles";

export { staticClasses as baseRadioClasses };

export type HvBaseRadioClasses = ExtractNames<typeof useClasses>;

export interface HvBaseRadioProps
  extends Omit<MuiRadioProps, "onChange" | "classes"> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the radio button.
   */
  classes?: HvBaseRadioClasses;
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
  /**
   * @ignore
   */
  onBlur?: (event: React.FocusEvent<any>) => void;
}

export const getSelectorIcons = (
  options: { disabled: boolean; semantic: boolean },
  classes: HvBaseRadioClasses
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

  return {
    radio: <RadioButtonUnselected color={color} className={classes.icon} />,
    radioChecked: (
      <RadioButtonSelected color={checkedColor} className={classes.icon} />
    ),
  };
};

/**
 * A Radio Button is a mechanism that allows user to select one or more options.
 *
 * The Base Radio Button is a building block of the Radio Button form element. Don't
 * use unless implementing a custom use case not covered by the Radio Button form element.
 */
export const HvBaseRadio = forwardRef<HTMLButtonElement, HvBaseRadioProps>(
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
      semantic = false,
      inputProps,
      onFocusVisible,
      onBlur,
      ...others
    } = useDefaultProps("HvBaseRadio", props);

    const { classes, cx } = useClasses(classesProp);

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

    const icons = getSelectorIcons({ disabled, semantic }, classes);

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
      <MuiRadio
        ref={ref}
        id={id}
        name={name}
        className={cx(
          classes.root,
          {
            [classes.disabled]: disabled,
            [classes.focusVisible]: focusVisible,
          },
          className
        )}
        icon={icons.radio}
        checkedIcon={icons.radioChecked}
        color="default"
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        disableRipple
        onChange={onLocalChange}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        inputProps={inputProps}
        onFocusVisible={onFocusVisibleCallback}
        onBlur={onBlurCallback}
        {...others}
      />
    );
  }
);
