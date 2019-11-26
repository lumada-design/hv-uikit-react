import React from "react";
import HvSnackbar from "@hv/uikit-react-core/dist/Snackbar";
import Button from "@hv/uikit-react-core/dist/Button";

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
          style={{ width: "150px", textTransform: "capitalize" }}
        >
          {variant}
        </Button>
        <HvSnackbar
          open={open}
          label={label}
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
  <div>
    <div>
      <SimpleSnackbar label="This is a snackbar." variant="default" showIcon />
    </div>
    <p />
    <div>
      <SimpleSnackbar label="This is a success message." variant="success" showIcon />
    </div>
    <p />
    <div>
      <SimpleSnackbar label="This is an error message." variant="error" showIcon />
    </div>
  </div>
);
