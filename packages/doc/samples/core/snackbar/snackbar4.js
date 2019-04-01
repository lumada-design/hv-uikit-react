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
import HvSnackbar from "@hv-ui/react/core/Snackbar";
import Button from "@material-ui/core/Button";

class SimpleSnackbar extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const {
      message,
      variant,
      showIcon,
      anchorOrigin,
      action,
      customIcon
    } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button
          onClick={this.handleClick}
          variant="contained"
          color="primary"
          style={{ width: "150px" }}
        >
          Click Me
        </Button>
        <HvSnackbar
          open={open}
          message={message}
          onClose={this.handleClose}
          anchorOrigin={anchorOrigin}
          variant={variant}
          customIcon={customIcon}
          showIcon={showIcon}
          action={action}
        />
      </div>
    );
  }
}

const actionComponent = (
  <a
    href="https://i.imgflip.com/yrj3h.jpg"
    style={{
      color: "#146BD2",
      fontSize: "14px",
      letterSpacing: "0.02em",
      lineHeight: "20px",
      fontWeight: "600",
      "textDecoration": "none"
    }}
  >
    Event
  </a>
);

export default (
  <SimpleSnackbar
    message="This is a snackbar"
    variant="default"
    showIcon
    action={actionComponent}
  />
);
