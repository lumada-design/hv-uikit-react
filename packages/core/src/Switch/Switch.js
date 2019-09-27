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
import { filter } from "lodash";

import isNil from "lodash/isNil";
import HvTypography from "../Typography";

import CheckMark from "./media/ToggleSuccess.XS.svg";

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
    displayIconChecked
  } = props;

  const [clickState, setClicked] = useState(checked);

  const handleLabelClick = event => {
    const labelClassRegex = /labelDeselected/;
    const labelIsDisabled = labelClassRegex.test(event.target.className);
    // verify checked property and if true enable clicking on labels
    if (!disabled && labelIsDisabled) {
      const status = !clickState;
      setClicked(status);
      // eslint-disable-next-line no-param-reassign
      event.target.checked = status;
      onChange(event);
    }
  };

  const auxiliaryElemExtractor = (nodes, regexMarker) => {
    const elem = filter(nodes, el => {
      const rg = RegExp(regexMarker);
      if (rg.test(el.className)) {
        return el;
      }
      return null;
    });

    return elem[0];
  };

  const nodeIterator = (node, depth, descriptor) => {
    let item = node;
    for (let i = 1; i <= depth; i += 1) {
      item = item.parentNode;
    }

    const htmlElems = auxiliaryElemExtractor(item.children, descriptor);

    return htmlElems;
  };

  const extractHoverableElements = event => [
    nodeIterator(event.target, 3, classes.bar),
    nodeIterator(event.target, 1, classes.icon)
  ];

  const switchHoverIn = event => {
    const hoverTargets = extractHoverableElements(event);

    if (clickState) {
      hoverTargets[0].classList.add(classes.checkedHoverClass);
    } else {
      hoverTargets[0].classList.add(classes.uncheckedHoverClass);
      hoverTargets[1].classList.add(classes.uncheckedIconHoverClass);
    }
  };

  const switchHoverOut = event => {
    const hoverTargets = extractHoverableElements(event);
    // clear out styling applied to border and icon
    hoverTargets[0].classList.remove(classes.checkedHoverClass);
    hoverTargets[0].classList.remove(classes.uncheckedHoverClass);

    if (hoverTargets[1]) {
      hoverTargets[1].classList.remove(classes.uncheckedIconHoverClass);
    }
  };

  const handleChange = event => {
    setClicked(event.target.checked);
    switchHoverOut(event);
    onChange(event);
  };

  const LeftLabel = () => (
    <div
      id={!isNil(id) ? `${id}_leftButton` : null}
      role="button"
      tabIndex={0}
      onClick={handleLabelClick}
      onKeyDown={() => {}}
    >
      <HvTypography
        className={classnames(
          disabled
            ? classes.disabledLabel
            : {
                [classes.labelSelected]: !clickState,
                [classes.labelDeselected]: clickState
              },
          classes.labelLeftPositioning
        )}
      >
        {labels.left}
      </HvTypography>
    </div>
  );

  const RightLabel = () => (
    <div
      id={!isNil(id) ? `${id}_rightButton` : null}
      role="button"
      tabIndex={0}
      onClick={handleLabelClick}
      onKeyDown={() => {}}
    >
      <HvTypography
        className={classnames(
          disabled
            ? classes.disabledLabel
            : {
                [classes.labelSelected]: clickState,
                [classes.labelDeselected]: !clickState
              },
          classes.labelRightPositioning
        )}
      >
        {labels.right}
      </HvTypography>
    </div>
  );

  return (
    <div className={classes.root}>
      {showLabels && <LeftLabel />}
      <BaseSwitch
        checked={clickState}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        value={value}
        inputProps={{
          onMouseOver: event => switchHoverIn(event),
          onMouseOut: event => switchHoverOut(event)
        }}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          checked: classes.checked,
          bar: classes.bar,
          icon: classes.icon,
          disabled: classes.disabled,
          iconChecked: classes.iconChecked
        }}
        {...(displayIconChecked && {
          checkedIcon: (
            <img
              alt="checkmark"
              className={classes.checkedIcon}
              src={CheckMark}
            />
          )
        })}
      />
      {showLabels && <RightLabel />}
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
  }),
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
  classes: {},
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
