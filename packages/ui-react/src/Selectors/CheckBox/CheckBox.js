/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import classNames from "classnames";
import labelPositions from "../labelPositions";

/**
 * Chooses the correct label styling to applied based on position.
 *
 * @param {String} classes - The classes object containing the classes names needed to be applied.
 * @param {Object} labelPosition - an Object containing the avaible label positions.
 * @returns {Object} - an Object with the name of the class for the required styling.
 */
const prepareLabelStyles = (classes, labelPosition, label) => {
  if (label) {
    switch (labelPosition) {
      default:
      case labelPositions.end:
        return classNames(classes.container, classes.labelEnd);
      case labelPositions.start:
        return classNames(classes.container, classes.labelStart);
    }
  }
  return classes.container;
};

/**
 * Chooses the correct icon to used based on the disable value.
 *
 * @param {String} classes - The classes object containing the classes names needed to be applied.
 * @param {Boolean} disabled - `true` if the disabled icon is required.
 * @returns {Object} - an Object with the selected icons.
 */
const prepareIcon = (classes, disabled) => {
  const disabledIcon = (
    <div className={classNames(classes.icon, classes.iconDisable)} />
  );

  const icons = {
    emptyIcon: disabledIcon,
    checkedIcon: disabledIcon,
    indeterminate: disabledIcon
  };

  if (disabled) {
    return icons;
  }

  icons.emptyIcon = (
    <div className={classNames(classes.icon, classes.iconEmpty)} />
  );
  icons.checkedIcon = (
    <div className={classNames(classes.icon, classes.iconFull)} />
  );
  icons.indeterminateIcon = (
    <div className={classNames(classes.icon, classes.iconIndeterminate)} />
  );

  return icons;
};

const HvCheckbox = props => {
  const {
    classes,
    className,
    checked,
    indeterminate,
    disabled,
    onChange,
    value,
    label,
    labelPlacement,
    propsLabel,
    propsIcon
  } = props;

  const materialPrimaryColor = "primary";
  const icons = prepareIcon(classes, disabled);
  const labelClass = prepareLabelStyles(classes, labelPlacement, label);
  const formClasses = classNames(labelClass, className);
  const transformedValue = value.toString(10);

  return (
    <FormControlLabel
      label={label}
      labelPlacement={labelPlacement}
      disabled={disabled}
      className={formClasses}
      classes={{
        disabled: classes.labelDisabled,
        label: classes.labelTypography
      }}
      control={(
        <Checkbox
          className={classes.checkBox}
          icon={icons.emptyIcon}
          indeterminateIcon={icons.indeterminateIcon}
          checkedIcon={icons.checkedIcon}
          color={materialPrimaryColor}
          disabled={disabled}
          disableRipple
          onChange={onChange}
          value={transformedValue}
          checked={checked}
          indeterminate={indeterminate}
          {...propsLabel}
        />
      )}
      {...propsIcon}
    />
  );
};

HvCheckbox.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the checkbox.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /** 
   * a classname that will be applied at the root object. 
   */
  className: PropTypes.string,
  /**
   * If set to `true` the checkbox is disabled and the onClick function will not be called.
   */
  disabled: PropTypes.bool,
  /**
   * The function executed when the checkbox is pressed.
   */
  onChange: PropTypes.instanceOf(Function),
  /**
   * If set to `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   * note: if this value is specified the state of the checkbox must be managed
   */
  checked: PropTypes.bool,
  /**
   * If set to `true` the checkbox uses the intermediate state, if set to `false` the checkbox will not use the intermediate state.
   */
  indeterminate: PropTypes.bool,
  /**
   * the value of the checkbox.
   * this value will be returned in the event object generated for the onChange callback
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * The label to be added to the checkbox.
   */
  label: PropTypes.string,
  /**
   * The position of the checkbox label.
   *  - Accepted values:
   *    --"start",
   *    --"end"
   *  - note: the labelPositions object should be used to set this value.
   */
  labelPlacement: PropTypes.oneOf(["start", "end"]),
  /**
   * Extra properties passed to the icon.
   */
  propsIcon: PropTypes.instanceOf(Object),
  /**
   * Extra properties passed to the label.
   */
  propsLabel: PropTypes.instanceOf(Object)
};

HvCheckbox.defaultProps = {
  value: "",
  label: "",
  className: "",
  checked: undefined,
  indeterminate: undefined,
  disabled: false,
  onChange: () => { },
  propsIcon: undefined,
  propsLabel: undefined,
  labelPlacement: labelPositions.end
};

export default HvCheckbox;
