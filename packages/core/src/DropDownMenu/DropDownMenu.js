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
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";

const DropDownMenu = ({ icon, classes, position, children }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div className={classes.root}>
      <div
        className={classNames(classes.icon, {
          [classes.iconSelected]: open
        })}
      >
        <div className={classes.column}>
          <IconButton
            className={classNames(classes.iconButton)}
            onClick={event => {
              setOpen(!open);
              setAnchorEl(event.currentTarget);
            }}
          >
            {icon}
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
              setOpen(false);
              setAnchorEl(null);
            }}
            placement={position}
            disablePortal
            modifiers={{
              flip: {
                enabled: false
              },
              preventOverflow: {
                enabled: false,
                boundariesElement: "scrollParent"
              },
              hide: {
                enabled: false
              }
            }}
          >
            <ClickAwayListener
              onClickAway={() => {
                setOpen(false);
                setAnchorEl(null);
              }}
            >
              <Paper className={classes.paperRoot}>
                <div className={classes.extenderLine} />
                <MenuList>{children}</MenuList>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </div>
      </div>
    </div>
  );
};

DropDownMenu.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  icon: PropTypes.element.isRequired,
  position: PropTypes.oneOf([
    // Material UI Popper positions
    "top-start",
    "top",
    "top-end",
    "left-start",
    "left",
    "left-end",
    "bottom-start",
    "bottom",
    "bottom-end",
    "right-start",
    "right",
    "right-end"
  ]),
  children: PropTypes.node.isRequired
};

DropDownMenu.defaultProps = {
  position: "bottom-end"
};

export default DropDownMenu;
