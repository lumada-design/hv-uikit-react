import React, { useState, useCallback } from "react";

import PropTypes from "prop-types";
import clsx from "clsx";

import { Switch } from "@mui/material";
import { withStyles } from "@mui/styles";

import styles from "./styles";

/**
 * A Switch is <b>binary</b> and work as a digital on/off button.
 *
 * The Base Switch is a building block of the Switch form element. Don't use unless
 * implementing a custom use case not covered by the Switch form element.
 */
const HvBaseSwitch = (props) => {
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

  const onLocalChange = useCallback(
    (evt) => {
      if (readOnly) {
        return;
      }

      onChange?.(evt, evt.target.checked, value);
    },
    [onChange, readOnly, value]
  );

  return (
    <Switch
      id={id}
      name={name}
      className={clsx(className, classes.root, {
        [classes.disabled]: disabled,
        [classes.readOnly]: readOnly,
        [classes.focusVisible]: focusVisible,
      })}
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
};

HvBaseSwitch.propTypes = {
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
     * Styles applied to the switch when it is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied to the switch when it is in read only mode.
     */
    readOnly: PropTypes.string,
    /**
     * Styles applied to the internal Switch component's root class.
     */
    switch: PropTypes.string,
    /**
     * Styles applied to the internal SwitchBase component's root class.
     */
    switchBase: PropTypes.string,
    /**
     * Pseudo-class applied to the internal SwitchBase component's checked class.
     */
    checked: PropTypes.string,
    /**
     * Styles applied to the track element.
     */
    track: PropTypes.string,
    /**
     * Styles used to create the thumb passed to the internal SwitchBase component icon prop.
     */
    thumb: PropTypes.string,
    /**
     * Class applied to the root element if keyboard focused.
     */
    focusVisible: PropTypes.string,
  }).isRequired,

  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,

  /**
   * The input name.
   */
  name: PropTypes.string,
  /**
   * The value of the input.
   *
   * Is up to the application's logic when to consider the submission of this value.
   * Generally it should be used only when the switch is neither unchecked nor indeterminate.
   *
   * The default value is "on".
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,

  /**
   * Indicates that user input is required.
   */
  required: PropTypes.bool,
  /**
   * Indicates that the input is not editable.
   */
  readOnly: PropTypes.bool,
  /**
   * Indicates that the input is disabled.
   */
  disabled: PropTypes.bool,

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
   * The callback fired when the switch is pressed.
   */
  onChange: PropTypes.func,

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

export default withStyles(styles, { name: "HvBaseSwitch" })(HvBaseSwitch);
