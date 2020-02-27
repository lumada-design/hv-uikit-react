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
import clsx from "clsx";
import {
  ClickAwayListener,
  IconButton,
  Popper,
  useTheme,
  withStyles
} from "@material-ui/core";
import FocusTrap from "focus-trap-react";
import uniqueId from "lodash/uniqueId";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import MoreVert from "@hv/uikit-react-icons/dist/Generic/MoreOptionsVertical";
import List from "../List";
import getPrevNextFocus from "../utils/focusableElementFinder";
import styles from "./styles";

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
  icon,
  classes,
  placement,
  dataList,
  id,
  disabled,
  disablePortal,
  onClick,
  keepOpened,
  expanded,
  ...others
}) => {
  const [open, setOpen] = useState(expanded && !disabled);
  const [internalId] = useState(id || uniqueId("hv-dropdown-menu"));
  const anchorRef = React.useRef(null);
  const focusNodes = getPrevNextFocus(`${internalId}-icon-button`);
  const theme = useTheme();

  const bottom = `bottom-${placement === "right" ? "start" : "end"}`;

  const handleToggle = event => {
    setOpen(prevOpen => !prevOpen);
    if (onClick) onClick(null, event);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  /**
   * If the ESCAPE key is pressed the close handler must beSpace called.
   *Space
   * @param event
   */
  const handleKeyDown = event => {
    if (isKeypress(event, KeyboardCodes.Esc)) {
      handleClose(event);
    }
    if (isKeypress(event, KeyboardCodes.Tab)) {
      const node = event.shiftKey ? focusNodes.prevFocus : focusNodes.nextFocus;
      if (node) setTimeout(() => node.focus(), 0);
      handleToggle(event);
    }
    event.preventDefault();
  };

  const handleKeyboardToggle = event => {
    if (
      isKeypress(event, KeyboardCodes.SpaceBar) ||
      isKeypress(event, KeyboardCodes.Enter) ||
      (isKeypress(event, KeyboardCodes.ArrowDown) && !open) ||
      (isKeypress(event, KeyboardCodes.ArrowUp) && open)
    ) {
      handleToggle(event);
      event.preventDefault();
    }
  };

  const IconRender = icon || (
    <MoreVert
      boxStyles={{ width: "32px", height: "32px" }}
      color={disabled ? "atmo7" : undefined}
    />
  );

  return (
    <div id={internalId} className={classes.root}>
      <IconButton
        id={`${internalId}-icon-button`}
        buttonRef={anchorRef}
        aria-controls={open ? `${internalId}-list` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? true : undefined}
        onClick={handleToggle}
        onKeyDown={handleKeyboardToggle}
        className={clsx(classes.icon, {
          [classes.iconSelected]: open
        })}
        disabled={disabled}
        {...others}
      >
        {IconRender}
      </IconButton>
      <Popper
        disablePortal={disablePortal}
        open={open}
        anchorEl={anchorRef.current}
        placement={bottom}
        popperOptions={{}}
        style={{ zIndex: theme.zIndex.tooltip }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <FocusTrap
            createOptions={{
              escapeDeactivates: false,
              allowOutsideClick: true,
              fallbackFocus: document.getElementById(
                `${internalId}-icon-button`
              )
            }}
          >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div className={classes.menuList} onKeyDown={handleKeyDown}>
              <List
                id={`${internalId}-list`}
                values={dataList}
                selectable={false}
                onClick={(item, event) => {
                  if (!keepOpened) setOpen(false);
                  if (onClick) onClick(item, event);
                }}
                condensed
              />
            </div>
          </FocusTrap>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

DropDownMenu.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root of the component.
     */
    root: PropTypes.string,
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
  icon: PropTypes.element,
  /**
   * A list containing the elements to be rendered.
   *
   * - label: The label of the element to be rendered.
   * - selected: The selection state of the element.
   * - disabled: The disabled state of the element.
   * - iconCallback: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   */
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
      iconCallback: PropTypes.func,
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
  onClick: PropTypes.func,
  /**
   * Keep the Dropdown Menu opened after clicking one option
   */
  keepOpened: PropTypes.bool,
  /**
   * Defines if the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If true it should be displayed open.
   */
  expanded: PropTypes.bool
};

DropDownMenu.defaultProps = {
  id: undefined,
  placement: "left",
  disablePortal: false,
  onClick: null,
  keepOpened: true,
  disabled: false,
  icon: undefined,
  expanded: false
};

export default withStyles(styles, { name: "HvDropDownMenu" })(DropDownMenu);
