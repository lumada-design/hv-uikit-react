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
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import MoreVert from "@material-ui/icons/MoreVert";

class Popup extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.moreVertContainer}>
        <Button
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classNames(classes.moreVertBtn, {
            [classes.activated]: anchorEl
          })}
        >
          <MoreVert />
        </Button>
        <Popover
          id="simple-popper"
          classes={{
            paper: classes.paper
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <Button className={classes.actionBtn}>View</Button>
          <Button className={classes.actionBtn}>Dismiss</Button>
        </Popover>
      </div>
    );
  }
}

export default Popup;
