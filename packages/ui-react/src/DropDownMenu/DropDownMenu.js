/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";

class DropDownMenu extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { icon, classes, children } = this.props;
    const { open } = this.state;

    return (
      <div>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div
            className={classNames(classes.icon, {
              [classes.iconSelected]: open
            })}
          >
            <IconButton
              className={classes.iconButton}
              onClick={this.handleClick}
            >
              {icon}
              {open && <div className={classes.menuList}>{children}</div>}
            </IconButton>
          </div>
        </ClickAwayListener>
      </div>
    );
  }
}

DropDownMenu.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  icon: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired
};

export default DropDownMenu;
