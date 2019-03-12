import React from "react";
import HvSnackbar from "@hv-ui/react/core/Snackbar";
import Button from "@material-ui/core/Button";
import { FastForward16 } from "@hv-ui/icons/core";

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
          Click me
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
export default (
  <SimpleSnackbar
    message="This is a snackbar without icon"
    variant="default"
  />
);
