import React, { useCallback } from "react";

import PropTypes from "prop-types";
import clsx from "clsx";

import { Checkbox, withStyles } from "@material-ui/core";

import { Checkbox as CheckboxIcon, CheckboxCheck, CheckboxPartial } from "@hv/uikit-react-icons";

import styles from "./styles";

export const getSelectorIcons = (classes, options) => {
  const { disabled, semantic } = options;
  const color = (disabled && ["atmo3", "atmo5"]) || (semantic && ["base1", "base2"]) || undefined;
  const checkedColor =
    (disabled && ["atmo3", "atmo5"]) || (semantic && ["base2", "base1"]) || undefined;

  return {
    checkbox: <CheckboxIcon color={color} className={classes.icon} />,
    checkboxPartial: <CheckboxPartial color={color} className={classes.icon} />,
    checkboxChecked: <CheckboxCheck color={checkedColor} className={classes.icon} />,
  };
};

/**
 * A Checkbox is a mechanism that allows user to select one or more options.
 *
 * The Base Checkbox is a building block of the Checkbox form element. Don't use unless
 * implementing a custom use case not covered by the Checkbox form element.
 */
const HvBaseCheckbox = (props) => {
  const {
    classes,
    className,
    id,
    name,
    value = "on",
    disabled = false,
    required = false,
    readOnly = false,
    checked,
    indeterminate,
    defaultChecked,
    semantic = false,
    onChange,
    inputProps,
    ...others
  } = props;

  const icons = getSelectorIcons(classes, { disabled, semantic });

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
    <Checkbox
      id={id}
      name={name}
      className={clsx(className, classes.root, { [classes.disabled]: disabled })}
      icon={icons.checkbox}
      indeterminateIcon={icons.checkboxPartial}
      checkedIcon={icons.checkboxChecked}
      color="default"
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      disableRipple
      onChange={onLocalChange}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
      indeterminate={indeterminate}
      inputProps={inputProps}
      {...others}
    />
  );
};

HvBaseCheckbox.propTypes = {
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
     * Styles applied to the checkbox when it is disabled.
     */
    disabled: PropTypes.string,
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
   * Is up to the application's logic when to consider the submition of this value.
   * Generaly it should be used only when the checkbox is neither unchecked nor indeterminate.
   *
   * The default value is "on".
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,

  /**
   * Indicates that the input is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that the input is not editable.
   */
  readOnly: PropTypes.bool,
  /**
   * Indicates that user input is required.
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
   * If `true` the checkbox visualy shows the indeterminate state.
   */
  indeterminate: PropTypes.bool,

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
};

export default withStyles(styles, { name: "HvBaseCheckbox" })(HvBaseCheckbox);
