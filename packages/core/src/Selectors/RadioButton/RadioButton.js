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
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioButtonSelected from "@hv/uikit-react-icons/dist/Generic/RadioButtonSelected";
import RadioButtonUnSelected from "@hv/uikit-react-icons/dist/Generic/RadioButtonUnselected";
import Radio from "@material-ui/core/Radio";
import classNames from "classnames";
import labelPositions from "../labelPositions";

/**
 * Returns the correct label styles to be applied based on label position.
 *
 * @param {String} classes - The classes object containing the classes names needed to be applied.
 * @param {Object} labelPosition - an Object containing the available label positions.
 * @returns {Object} - an Object with the name of the class for the required styling.
 */
const getLabelStyles = (classes, labelPosition, label) => {
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
 * Returns the icons to be used based on the disable value.
 *
 * @param {Object} classes - A JSS Object that contains the css classes to apply.
 * @param {Boolean} disabled - `true` if the disabled icon is required.
 * @returns {Object} - an Object with the selected icons.
 */
const getIcons = ({ classes, disabled, theme }) => {
  const color = disabled
    ? [theme.hv.palette.atmosphere.atmo4, theme.hv.palette.atmosphere.atmo6]
    : null;

  return {
    emptyIcon: <RadioButtonUnSelected color={color} className={classes.icon} />,
    checkedIcon: <RadioButtonSelected color={color} className={classes.icon} />
  };
};

const HvRadio = props => {
  const {
    classes,
    className,
    id,
    checked,
    disabled,
    onChange,
    value,
    label,
    labelPlacement,
    formControlLabelProps,
    propsLabel,
    radioProps,
    propsIcons
  } = props;

  const icons = getIcons(props);
  const labelStyles = getLabelStyles(classes, labelPlacement, label);
  const materialPrimaryColor = "primary";
  const [isFocusDisabled, disableFocus] = useState(false);
  const [internalId] = useState(id || uniqueId("hv-radiobutton-"));

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
      id={internalId}
      className={classNames(labelStyles, className, {
        [classes.disableFocus]: isFocusDisabled
      })}
      classes={{
        disabled: classes.labelDisabled,
        label: classes.labelTypography
      }}
      control={
        <Radio
          id={`${internalId}-input`}
          className={classes.radio}
          icon={icons.emptyIcon}
          checkedIcon={icons.checkedIcon}
          color={materialPrimaryColor}
          disabled={disabled}
          disableRipple
          onChange={onLocalChange}
          onBlur={onBlur}
          value={value}
          checked={checked}
          {...radioProps}
          {...propsIcons}
        />
      }
      {...formControlLabelProps}
      {...propsLabel}
    />
  );
};

HvRadio.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the Radio button.
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
    radio: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string
  }).isRequired,
  /**
   * If `true` the Radio button is disabled and the onChange function will not be called.
   */
  disabled: PropTypes.bool,
  /**
   * The function executed when the Radio button changes from unselected to selected.
   */
  onChange: PropTypes.func,
  /**
   * If `true` the Radio button is selected, if set to `false` the Radio button is not selected.
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
   * Extra properties passed to the MUI FormControlLabel component.
   */
  formControlLabelProps: PropTypes.instanceOf(Object),
  /**
   * @deprecated Instead use the formControlLabelProps property
   */
  propsLabel: deprecatedPropType(
    PropTypes.string,
    "Instead use the formControlLabelProps property"
  ),
  /**
   * Extra properties passed to the MUI Radio component.
   */
  radioProps: PropTypes.instanceOf(Object),
  /**
   * @deprecated Instead use the radioProps property
   */
  propsIcons: deprecatedPropType(
    PropTypes.string,
    "Instead use the radioProps property"
  ),
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object)
};

HvRadio.defaultProps = {
  className: "",
  id: undefined,
  value: "",
  label: "",
  checked: undefined,
  disabled: false,
  onChange: () => {},
  formControlLabelProps: undefined,
  propsLabel: undefined,
  radioProps: undefined,
  propsIcons: undefined,
  labelPlacement: labelPositions.end,
  theme: null
};

export default HvRadio;
