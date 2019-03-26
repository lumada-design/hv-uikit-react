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
import IconButton from "@material-ui/core/IconButton";

const DropDownMenu = ({ icon, classes, position, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div
          className={classNames(classes.icon, {
            [classes.iconSelected]: open
          })}
        >
          <IconButton
            className={classNames(classes.iconButton, classes[position])}
            onClick={() => setOpen(!open)}
          >
            {icon}
          </IconButton>
          {open && (
            <div
              className={classNames(classes.menuList, classes[`${position}Px`])}
            >
              {children}
            </div>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

DropDownMenu.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  icon: PropTypes.element.isRequired,
  position: PropTypes.oneOf(["left", "center", "right"]),
  children: PropTypes.node.isRequired
};

DropDownMenu.defaultProps = {
  position: "left"
};

export default DropDownMenu;
