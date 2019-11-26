import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvSnackbar from "@hv/uikit-react-core/dist/Snackbar";
import Button from "@hv/uikit-react-core/dist/Button";
import Info from "@hv/uikit-react-icons/dist/Generic/Info";

const styles = {
  rootS: {
    width: "30px",
    height: "30px",
    "&>svg": {
      margin: "0 auto"
    }
  }
};

const StyledInfo = withStyles(styles, { withTheme: true })(Info);

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
      id,
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
          id={id ? `${id}-open-button` : undefined}
          onClick={this.handleClick}
          variant="contained"
          color="primary"
          style={{ width: "150px" }}
        >
          Click me
        </Button>
        <HvSnackbar
          id={id}
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
  <SimpleSnackbar
    id="snackbar2"
    label="This is a snackbar with a custom icon."
    variant="default"
    customIcon={<StyledInfo iconSize="S" />}
  />
);
