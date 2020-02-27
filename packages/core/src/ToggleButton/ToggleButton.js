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

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import uniqueId from "lodash/uniqueId";
import { withStyles } from "@material-ui/core";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import styles from "./styles";

const DEFAULT_ID_PREFIX = "hv-toggle-button-";

/**
 * Toggle Button.
 *
 * @param classes
 * @param selected
 * @param notSelectedTitle
 * @param notSelectedIcon
 * @param selectedIcon
 * @param selectedTitle
 * @param onClick
 * @returns {*}
 * @constructor
 */
const ToggleButton = ({
  classes,
  className,
  id,
  selected,
  notSelectedTitle,
  notSelectedIcon,
  selectedIcon,
  selectedTitle,
  animated,
  onClick,
  disabled,
  ...other
}) => {
  const [isSelected, setIsSelected] = useState(selected);
  const [classSvg, setClassSvg] = useState("default");

  /**
   * Update state when prop selected is changed.
   */
  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  let Icon;
  if (animated) {
    Icon = notSelectedIcon;
  } else {
    Icon = isSelected ? selectedIcon : notSelectedIcon;
  }
  const title = isSelected ? selectedTitle : notSelectedTitle;

  /**
   * Toggle the classes for the case of an animated SVG.
   */
  const toggleClass = () => {
    if (isSelected) setClassSvg("notSelected");
    else setClassSvg("selected");
  };

  /**
   * Toggle the state. If the key pressed is tab it should be ignored.
   *
   * @param e
   */
  const toggle = e => {
    if (isKeypress(e, KeyboardCodes.Tab)) return;
    setIsSelected(!isSelected);
    if (animated) toggleClass();
    if (onClick) onClick(isSelected);
  };

  const internalId = id || uniqueId(DEFAULT_ID_PREFIX);

  return (
    <div
      id={internalId}
      className={clsx(className, classes.root, {
        [classes.disabled]: disabled
      })}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={toggle}
      title={title}
      {...other}
    >
      <Icon className={clsx(classes.icon, { [classSvg]: animated })} />
    </div>
  );
};

ToggleButton.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root.
     */
    root: PropTypes.string,
    /**
     * Style applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Style applied when disabled.
     */
    disabled: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Defines if the button is selected.
   */
  selected: PropTypes.bool,
  /**
   * Icon for when not selected.
   */
  notSelectedIcon: PropTypes.instanceOf(Object).isRequired,
  /**
   * Description for not selected.
   */
  notSelectedTitle: PropTypes.string,
  /**
   * Icon for when selected.
   */
  selectedIcon: PropTypes.instanceOf(Object),
  /**
   * Description for selected.
   */
  selectedTitle: PropTypes.string,
  /**
   * Function called when icon is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Defines if it is a animated SVG.
   */
  animated: PropTypes.bool,
  /**
   * Denotes if component is active or not.
   */
  disabled: PropTypes.bool
};

ToggleButton.defaultProps = {
  className: "",
  id: null,
  selected: false,
  selectedIcon: null,
  onClick: undefined,
  notSelectedTitle: "",
  selectedTitle: "",
  animated: false,
  disabled: false
};

export default withStyles(styles, { name: "HvToggleButton" })(ToggleButton);
