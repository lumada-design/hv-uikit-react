import React from "react";
import HvBanner from "@hv/uikit-react-core/dist/Banner";
import Button from "@hv/uikit-react-core/dist/Button";

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
      label,
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
          {label}
        </Button>
        <HvBanner
          id="test"
          open={open}
          label={`This is ${label}`}
          onClose={this.handleClose}
          anchorOrigin={anchorOrigin}
          variant={variant}
          customIcon={customIcon}
          showIcon={showIcon}
          actionsOnlabel={action}
        />
      </div>
    );
  }
}

export default (
  <div>
    <div>
      <SimpleBanner
        label="default"
        variant="default"
        anchorOrigin="top"
      />
    </div>
    <p />
    <div>
      <SimpleBanner label="Success" variant="success" showIcon />
    </div>
    <p />
    <div>
      <SimpleBanner label="Error" variant="error" showIcon />
    </div>
  </div>
);
