/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

  return (
    <FormControlLabel
      label={label}
      labelPlacement={labelPlacement}
      disabled={disabled}
      className={labelClass}
      classes={{
        disabled: classes.labelDisabled,
        label: classes.labelTypography
      }}
      control={
        <Checkbox
          className={classes.checkBox}
          icon={icons.emptyIcon}
          indeterminateIcon={icons.indeterminateIcon}
          checkedIcon={icons.checkedIcon}
          color={materialPrimaryColor}
          disabled={disabled}
          disableRipple
          onChange={onChange}
          value={value}
          checked={checked}
          indeterminate={indeterminate}
          {...propsLabel}
        />
      }
      {...propsIcon}
    />
  );
};

HvCheckbox.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the checkbox.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the label typography.
     */
    labelTypography: PropTypes.string,
    /**
     * Styles applied to the component when the label is disable.
     */
    labelDisabled: PropTypes.string,
    /**
     *  Styles applied to the label when the position is end.
     */
    labelEnd: PropTypes.string,
    /**
     * Styles applied to the label when the position is start.
     */
    labelStart: PropTypes.string,
    /**
     * Styles applied to the checkbox core element (material-ui).
     */
    checkBox: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon when not selected.
     */
    iconEmpty: PropTypes.string,
    /**
     * Styles applied to the icon when selected.
     */
    iconFull: PropTypes.string,
    /**
     * Styles applied to the icon when disable.
     */
    iconDisable: PropTypes.string,
    /**
     * Styles applied to the icon when indeterminate.
     */
    iconIndeterminate: PropTypes.string
  }).isRequired,
  /**
   * If `true` the checkbox is disabled and the onClick function will not be called.
   */
  disabled: PropTypes.bool,
  /**
   * The function executed when the checkbox is pressed.
   */
  onChange: PropTypes.func,
  /**
   * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   * note: if this value is specified the state of the checkbox must be managed
   */
  checked: PropTypes.bool,
  /**
   * If `true` the checkbox uses the intermediate state, if set to `false` the checkbox will not use the intermediate state.
   */
  indeterminate: PropTypes.bool,
  /**
   * The value of the checkbox. This value will be returned in the event object generated for the onChange callback
   */
  value: PropTypes.string,
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
  checked: undefined,
  indeterminate: undefined,
  disabled: false,
  onChange: () => {},
  propsIcon: undefined,
  propsLabel: undefined,
  labelPlacement: "end"
};

export default HvCheckbox;
