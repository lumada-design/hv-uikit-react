/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
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
