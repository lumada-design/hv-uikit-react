import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvSnackbar from "@hv/uikit-react-core/dist/Snackbar";
import Button from "@hv/uikit-react-core/dist/Button";
import FastForward from "@hv/uikit-react-icons/dist/Generic/FastForwards";

const styles = {
  rootS: {
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    "&>svg": {
      margin: "0 auto"
    }
  }
};

const StyledFastForward = withStyles(styles, { withTheme: true })(FastForward);

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
          Click me
        </Button>
        <HvSnackbar
          open={open}
          label="This is a custom icon"
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
    label="This is a snackbar"
    variant="default"
    customIcon={<StyledFastForward iconSize="S" />}
  />
);
