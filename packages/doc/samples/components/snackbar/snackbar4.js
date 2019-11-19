import React from "react";
import HvSnackbar from "@hv/uikit-react-core/dist/Snackbar";
import HvButton from "@hv/uikit-react-core/dist/Button";
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
          style={{ width: "150px" }}
        >
          Click Me
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

const ActionButton = (
  <a
    style={{
      cursor: "pointer",
      color: "#414141",
      fontSize: "14px",
      letterSpacing: "0.02em",
      lineHeight: "20px",
      fontWeight: "600",
      textDecoration: "none"
    }}
  >
    Action
  </a>
);

export default (
  <SimpleSnackbar
    label="This is a snackbar"
    variant="default"
    showIcon
    action={ActionButton}
  />
);
