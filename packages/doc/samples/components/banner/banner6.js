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
      id,
      label,
      variant,
      showIcon,
      anchorOrigin,
      actions,
      actionsPosition,
      customIcon
    } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button
          id={id ? `${id}-open-button` : undefined}
          onClick={this.handleClick}
          variant="contained"
          color="primary"
          style={{ width: "150px" }}
        >
          Click me
        </Button>
        <HvBanner
          id={id}
          open={open}
          label={label}
          onClose={this.handleClose}
          anchorOrigin={anchorOrigin}
          variant={variant}
          customIcon={customIcon}
          showIcon={showIcon}
          actions={actions}
          actionsPosition={actionsPosition}
        />
      </div>
    );
  }
}

export default (
  <SimpleBanner
    id="banner6"
    label="This is a success banner."
    variant="success"
    showIcon
    actions={<Button category="semantic">Action</Button>}
    actionsPosition="inline"
  />
);
