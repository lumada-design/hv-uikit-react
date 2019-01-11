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
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { HvPopperContent } from "./PopperContent";

export default function withPopper(Component, popperContent) {
  class HvPopper extends React.Component {
    state = {
      anchorEl: null,
      open: false
    };

    togglePopper = (event, isOn) => {
      const { currentTarget } = event;
      this.setState(() => ({
        anchorEl: isOn ? currentTarget : null,
        open: isOn
      }));
    };

    render() {
      const { classes } = this.props;
      const { anchorEl, open } = this.state;
      const id = open ? "simple-popper" : null;

      return (
        <div>
          <Component
            onMouseEnter={e => this.togglePopper(e, true)}
            onMouseLeave={e => this.togglePopper(e, false)}
          />
          <HvPopperContent
            id={id}
            open={open}
            anchorEl={anchorEl}
            popperContent={popperContent}
            classes={classes}
          />
        </div>
      );
    }
  }

  return withStyles(styles)(HvPopper);
}
