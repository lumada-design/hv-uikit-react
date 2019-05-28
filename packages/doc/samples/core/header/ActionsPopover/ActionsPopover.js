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

import React from "react";
import PropTypes from "prop-types";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist/KeyboardUtils";
import Popover from "@material-ui/core/Popover";

class ActionsPopover extends React.Component {
  state = {
    isActive: false,
    anchorEl: null
  };

  handleClick = evt => {
    if (isKeypress(evt, KeyboardCodes.Enter) === false) return;
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
          className={classes.root}
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          onKeyDown={this.handleClick}
          role="button"
          tabIndex={0}
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
