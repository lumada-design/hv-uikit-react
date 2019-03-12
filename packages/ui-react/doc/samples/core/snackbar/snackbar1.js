import React from "react";
import HvSnackbar from "@hv-ui/react/core/Snackbar";
import Button from "@material-ui/core/Button";
import HvShowCase from "../../../../stories/snackbar";


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
          {message}
        </Button>
        <HvSnackbar
          open={open}
          message={`This is ${message}`}
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
      <SimpleSnackbar message="default" variant="default" showIcon />
    </div>
    <p />
    <div>
      <SimpleSnackbar message="success" variant="success" showIcon />
    </div>
    <p />
    <div>
      <SimpleSnackbar message="info" variant="info" showIcon />
    </div>
    <p />
    <div>
      <SimpleSnackbar message="warning" variant="" showIcon />
    </div>
    <p />
    <div>
      <SimpleSnackbar message="error" variant="error" showIcon />
    </div>
  </div>


  //<SimpleSnackbar message="Click Me" variant="default" showIcon />
);