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
import Popover from "@material-ui/core/Popover";

class ActionsPopover extends React.Component {
  state = {
    isActive: false,
    anchorEl: null
  };

  handleClick = evt => {
    this.setState({
      isActive: true,
      anchorEl: evt.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      isActive: false,
      anchorEl: null
    });
  };

  render() {
    const { classes, children } = this.props;
    const { isActive, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        <div
          className={classNames([
            classes.root,
            {
              [classes.active]: isActive
            }
          ])}
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          role="presentation"
        />
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          {React.cloneElement(children, { close: this.handleClose })}
        </Popover>
      </React.Fragment>
    );
  }
}

ActionsPopover.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.element.isRequired
};

export default ActionsPopover;
