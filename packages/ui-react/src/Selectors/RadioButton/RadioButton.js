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
import Radio from "@material-ui/core/Radio";
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
    checkedIcon: disabledIcon
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

  return icons;
};

const HvRadio = props => {
  const {
    classes,
    checked,
    disabled,
    onChange,
    value,
    label,
    labelPlacement,
    propsLabel,
    propsIcon
  } = props;

  const icons = prepareIcon(classes, disabled);
  const labelClass = prepareLabelStyles(classes, labelPlacement, label);
  const materialPrimaryColor = "primary";

  return (
    <FormControlLabel
      label={label}
      labelPlacement={labelPlacement}
      className={labelClass}
      classes={{
        disabled: classes.labelDisabled,
        label: classes.labelTypography
      }}
      control={(
        <Radio
          className={classes.radio}
          icon={icons.emptyIcon}
          checkedIcon={icons.checkedIcon}
          color={materialPrimaryColor}
          disabled={disabled}
          disableRipple
          onChange={onChange}
          value={value}
          checked={checked}
          {...propsIcon}
        />
      )}
      {...propsLabel}
    />
  );
};

HvRadio.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the Radio button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * If set to `true` the Radio button is disabled and the onChange function will not be called.
   */
  disabled: PropTypes.bool,
  /**
   * The function executed when the Radio button changes from unselected to selected.
   */
  onChange: PropTypes.instanceOf(Function),
  /**
   * If set to `true` the Radio button is selected, if set to `false` the Radio button is not selected.
   */
  checked: PropTypes.bool,
  /**
   * The value of the Radio button.
   * this value will be returned in the event object generated for the onChange callback
   */
  value: PropTypes.string,
  /**
   * The label to be added to the checkbox.
   */
  label: PropTypes.string,
  /**
   * The position of the Radio button label.
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

HvRadio.defaultProps = {
  value: "",
  label: "",
  checked: undefined,
  disabled: false,
  onChange: () => {},
  propsIcon: undefined,
  propsLabel: undefined,
  labelPlacement: labelPositions.end
};

export default HvRadio;
