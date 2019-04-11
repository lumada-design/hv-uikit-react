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
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Content from "./Content";

const withPopper = (Component, content) => {
  class Popper extends React.Component {
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
        <>
          <Component
            onMouseEnter={e => this.togglePopper(e, true)}
            onMouseLeave={e => this.togglePopper(e, false)}
          />
          <Content
            id={id}
            open={open}
            anchorEl={anchorEl}
            content={content}
            classes={classes}
          />
        </>
      );
    }
  }

  Popper.propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
  };

  return withStyles(styles)(Popper);
};

export default withPopper;
