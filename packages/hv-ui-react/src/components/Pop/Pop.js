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
import Link from "../Link";

class HvPop extends React.Component {
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

  activateBtn = () => {
    this.setState({
      activated: true
    });
  };

  deactivateBtn = () => {
    this.setState({
      activated: false
    });
  };

  render() {
    const { classes, PopBtn, popItems, popPosition } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const items = popItems.map((elem, i) => {
      const key = `${elem.label}_${i}`;
      const path = `${elem.path}`;

      return (
        <Link key={key} href={path} useRouter={elem.router}>
          <Button className={elem.isActive ? classes.actionBtn : ""}>
            {elem.label}
          </Button>
        </Link>
      );
    });

    return (
      <div className={classes.moreVertContainer}>
        <div
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          onMouseOver={this.activateBtn}
          onMouseLeave={this.deactivateBtn}
          onClick={this.handleClick}
          className={classNames(classes.moreVertBtn, {
            [classes.activated]: anchorEl
          })}
        >
          <PopBtn isActive={this.state.activated || anchorEl} />
        </div>
        <Popover
          id="simple-popper"
          classes={{
            paper: classes.paper
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={popPosition[0]}
          transformOrigin={popPosition[1]}
        >
          {items}
        </Popover>
      </div>
    );
  }
}

export default HvPop;
