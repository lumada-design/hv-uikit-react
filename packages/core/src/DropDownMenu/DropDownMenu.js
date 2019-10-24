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
import classNames from "classnames";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "../utils/Popper";
import List from "../List";

/**
 * Dropdown component with a menu.
 *
 * @param icon
 * @param classes
 * @param placement
 * @param dataList
 * @param id
 * @returns {*}
 * @constructor
 */
const DropDownMenu = ({
  theme,
  icon,
  classes,
  placement,
  dataList,
  id,
  disablePortal,
  onClick
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const bottom = `bottom-${placement === "right" ? "start" : "end"}`;

  /**
   * Open the dropdown.
   *
   * @param event
   */
  const handleClick = event => {
    const { currentTarget } = event;
    setOpen(!open);
    setAnchorEl(currentTarget);
  };

  /**
   * Open the dropdown on Enter or Space.
   *
   * @param event
   */
  const handleKeyDown = event => {
    const { currentTarget, key } = event;
    const openingKeys = ["Enter", " "];
    if (openingKeys.includes(key)) setOpen(!open);
    setAnchorEl(currentTarget);
  };

  /**
   * Close the dropdown.
   */
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div {...id && { id }} className={classes.root}>
        <div
          role="button"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className={classNames(classes.icon, {
            [classes.iconSelected]: open
          })}
          onClick={handleClick}
        >
          {icon}
        </div>
        <Popper
          disablePortal={disablePortal}
          open={open}
          anchorEl={anchorEl}
          placement={bottom}
          popperOptions={{}}
          style={{ zIndex: theme.zIndex.tooltip }}
        >
          <div className={classes.menuList}>
            <List
              values={dataList}
              selectable={false}
              onClick={onClick}
              condensed
            />
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

DropDownMenu.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon when selected.
     */
    iconSelected: PropTypes.string,
    /**
     * Styles applied to the list.
     */
    menuList: PropTypes.string
  }).isRequired,
  /**
   * Icon.
   */
  icon: PropTypes.element.isRequired,
  /**
   * A list containing the elements to be rendered.
   *
   * - label: The label of the element to be rendered.
   * - selected: The selection state of the element.
   * - disabled: The disabled state of the element.
   * - leftIcon: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   */
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
      leftIcon: PropTypes.func,
      showNavIcon: PropTypes.bool
    })
  ).isRequired,
  /**
   * Placement of the dropdown.
   */
  placement: PropTypes.oneOf(["left", "right"]),
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Function executed in each onClick. Should received the clicked element.
   */
  onClick: PropTypes.func
};

DropDownMenu.defaultProps = {
  id: undefined,
  placement: "left",
  disablePortal: true,
  onClick: null
};

export default DropDownMenu;
