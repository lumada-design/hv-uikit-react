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
import BaseSwitch from "@material-ui/core/Switch";

import classnames from "classnames";
import uniqueId from "lodash/uniqueId";
import CheckMark from "@hv/uikit-react-icons/dist/Generic/Good";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";
import HvTypography from "../Typography";
import Focus from "../Focus";

const Switch = props => {
  const {
    classes,
    checked,
    disabled,
    onChange,
    labels,
    id,
    showLabels,
    value,
    displayIconChecked,
    ...other
  } = props;

  const [clickState, setClicked] = useState(checked);
  const DEFAULT_ID_PREFIX = "hv-switch-";
  const internalId = id || uniqueId(DEFAULT_ID_PREFIX);

  const handleChange = event => {
    setClicked(event.target.checked);
    onChange(event);
  };

  const createLabel = (
    label,
    right,
    labelId,
    labelDisabled,
    onClickHandler
  ) => {
    const internalLabelId = right
      ? `${labelId}_rightButton`
      : `${labelId}_leftButton`;
    return (
      <div id={internalLabelId}>
        <HvTypography
          className={classnames({
            [classes.disabledLabel]: labelDisabled,
            [classes.labelRightPositioning]: right,
            [classes.labelLeftPositioning]: !right
          })}
          onClick={labelDisabled ? undefined : onClickHandler}
          aria-disabled={disabled}
        >
          {label}
        </HvTypography>
      </div>
    );
  };

  const onKeyDownHandler = event => {
    if (isKeypress(event, KeyboardCodes.SpaceBar)) {
      const newState = !clickState;
      setClicked(newState);
      onChange(event, newState);
    }
  };

  const onClickHandler = event => {
    const newState = !clickState;
    setClicked(newState);
    onChange(event, newState);
  };

  return (
    <div className={classes.root} id={`${internalId}_root`}>
      {showLabels &&
        createLabel(labels.left, false, internalId, disabled, onClickHandler)}
      <Focus strategy="card" useFalseFocus>
        <div
          className={classes.root}
          onClick={disabled ? undefined : onClickHandler}
          role="checkbox"
          tabIndex="0"
          aria-checked={clickState}
          onKeyDown={disabled ? undefined : onKeyDownHandler}
          aria-disabled={disabled}
          id={internalId}
          {...other}
        >
          <BaseSwitch
            tabIndex="-1"
            checked={clickState}
            onChange={handleChange}
            disabled={disabled}
            value={value}
            inputProps={
              {
                // dummy aria-label this component is not tabbable and it is just presentational.
                // the accesibility test were always failing because of the missing aria label.
                "aria-label": "base switch"
              }
            }
            classes={{
              root: classes.switchRoot,
              switchBase: classes.switchBase,
              checked: classes.checked,
              bar: classes.bar,
              icon: classes.icon,
              disabled: classes.disabled,
              iconChecked: classes.iconChecked
            }}
            {...(displayIconChecked && {
              checkedIcon: (
                <div className={classes.checkedIcon}>
                  <CheckMark width="12px" height="12px" color={["acce1"]} />
                </div>
              )
            })}
          />
        </div>
      </Focus>
      {showLabels &&
        createLabel(labels.right, true, internalId, disabled, onClickHandler)}
    </div>
  );
};

Switch.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the Switch Component.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the internal SwitchBase component's root class.
     */
    switchBase: PropTypes.string,
    /**
     * Pseudo-class applied to the internal SwitchBase component's checked class.
     */
    checked: PropTypes.string,
    /**
     * Styles applied to the bar element.
     */
    bar: PropTypes.string,
    /**
     * Styles used to create the icon passed to the internal SwitchBase component icon prop.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the internal SwitchBase component's disabled class.
     */
    disabled: PropTypes.string
  }).isRequired,
  /**
   * Denotes selection state of switch component.
   */
  checked: PropTypes.bool,
  /**
   * Denotes if component is active or not.
   */
  disabled: PropTypes.bool,
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: PropTypes.func,
  /**
   * An Object containing the various text associated with the switch.
   *
   * - left: Label placed at the left of the switch.
   * - right: Label placed at the right of the switch.
   */
  labels: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string
  }),
  /**
   * The ID associated with the switch component.
   */
  id: PropTypes.string,
  /**
   * Value assigned to the Switch Component.
   */
  value: PropTypes.string,
  /**
   * Determine if labels should be displayed alongside component
   */
  showLabels: PropTypes.bool,
  /**
   * Determine if custom icon in button should be displayed
   * */
  displayIconChecked: PropTypes.bool
};

Switch.defaultProps = {
  checked: true,
  disabled: false,
  onChange: () => {},
  labels: {
    left: "Off",
    right: "On"
  },
  id: undefined,
  value: "",
  showLabels: true,
  displayIconChecked: false
};

export default Switch;
