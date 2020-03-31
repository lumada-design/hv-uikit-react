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

import React, { useState } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import CheckBoxIcon from "@hv/uikit-react-icons/dist/Generic/Checkbox";
import CheckBoxCheckedIcon from "@hv/uikit-react-icons/dist/Generic/CheckboxCheck";
import CheckBoxPartialIcon from "@hv/uikit-react-icons/dist/Generic/CheckboxPartial";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
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
 * @param {Object} props - HvCheckbox props.
 * @returns {Object} - an Object with the selected icons.
 */
const prepareIcon = ({ classes, theme, disabled }) => {
  const color = disabled
    ? [theme.hv.palette.atmosphere.atmo4, theme.hv.palette.atmosphere.atmo6]
    : null;

  return {
    emptyIcon: <CheckBoxIcon color={color} className={classes.icon} />,
    checkedIcon: <CheckBoxCheckedIcon color={color} className={classes.icon} />,
    indeterminateIcon: (
      <CheckBoxPartialIcon color={color} className={classes.icon} />
    )
  };
};

const HvCheckbox = props => {
  const {
    classes,
    className,
    id,
    checked,
    indeterminate,
    disabled,
    onChange,
    value,
    label,
    labelPlacement,
    formControlLabelProps,
    propsIcon,
    checkboxProps,
    propsLabel,
    ...other
  } = props;
  const materialPrimaryColor = "primary";
  const icons = prepareIcon(props);
  const labelClass = prepareLabelStyles(classes, labelPlacement, label);
  const [isFocusDisabled, disableFocus] = useState(false);
  const [internalId] = useState(id || uniqueId("hv-checkbox-"));

  const onLocalChange = evt => {
    const isKeyEvent =
      window.event.screenX === 0 &&
      window.event.screenY === 0 &&
      window.event.clientX === 0 &&
      window.event.clientY === 0;

    disableFocus(!isKeyEvent);
    onChange(evt);
  };

  const onBlur = () => {
    disableFocus(false);
  };

  return (
    <FormControlLabel
      label={label}
      labelPlacement={labelPlacement}
      disabled={disabled}
      className={classNames(labelClass, classes.truncate, className, {
        [classes.disableFocus]: isFocusDisabled
      })}
      id={internalId}
      classes={{
        disabled: classes.labelDisabled,
        label: classes.labelTypography
      }}
      control={
        <Checkbox
          id={`${internalId}-input`}
          className={classes.checkBox}
          icon={icons.emptyIcon}
          indeterminateIcon={icons.indeterminateIcon}
          checkedIcon={icons.checkedIcon}
          color={materialPrimaryColor}
          disabled={disabled}
          disableRipple
          onChange={onLocalChange}
          onBlur={onBlur}
          value={value}
          checked={checked}
          indeterminate={indeterminate}
          {...checkboxProps}
          {...propsLabel}
          {...other}
        />
      }
      {...formControlLabelProps}
      {...propsIcon}
    />
  );
};

HvCheckbox.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
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
    icon: PropTypes.string
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
   * Extra properties passed to the MUI FormControlLabel component.
   */
  formControlLabelProps: PropTypes.instanceOf(Object),
  /**
   * @deprecated Instead use the formControlLabelProps property
   */
  propsIcon: deprecatedPropType(
    PropTypes.string,
    "Instead use the formControlLabelProps property"
  ),
  /**
   * Extra properties passed to the MUI Checkbox component.
   */
  checkboxProps: PropTypes.instanceOf(Object),
  /**
   * @deprecated Instead use the checkboxProps property
   */
  propsLabel: deprecatedPropType(
    PropTypes.string,
    "Instead use the checkboxProps property"
  ),
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object)
};

HvCheckbox.defaultProps = {
  className: "",
  id: undefined,
  value: "",
  label: "",
  checked: undefined,
  indeterminate: undefined,
  disabled: false,
  onChange: () => {},
  formControlLabelProps: undefined,
  propsIcon: undefined,
  checkboxProps: undefined,
  propsLabel: undefined,
  labelPlacement: "end",
  theme: null
};

export default HvCheckbox;
