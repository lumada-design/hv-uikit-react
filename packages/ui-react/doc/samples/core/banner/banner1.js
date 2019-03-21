import React from "react";
import HvBanner from "@hv-ui/react/core/Banner";
import Button from "@material-ui/core/Button";

class SimpleBanner extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (action, reason) => {
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
          {message}
        </Button>
        <HvBanner
          open={open}
          message={`This is ${message}`}
          onClose={this.handleClose}
          anchorOrigin={anchorOrigin}
          variant={variant}
          customIcon={customIcon}
          showIcon={showIcon}
          actionsOnMessage={action}
        />
      </div>
    );
  }
}

export default (
  <div>
    <div>
      <SimpleBanner
        message="default"
        variant="default"
        anchorOrigin="top"
        showIcon
      />
    </div>
    <p />
    <div>
      <SimpleBanner message="Success" variant="success" showIcon />
    </div>
    <p />
    <div>
      <SimpleBanner message="Error" variant="error" showIcon />
    </div>
  </div>
);
