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
      id,
      label,
      buttonLabel,
      variant,
      showIcon,
      anchorOrigin,
      action,
      actionCallback,
      customIcon,
      offset
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
          {buttonLabel}
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
          offset={offset}
          action={action}
          actionCallback={actionCallback}
        />
      </div>
    );
  }
}

export default (
  <SimpleSnackbar
    id="actionStructure"
    buttonLabel="Click me"
    label="This is a snackbar."
    variant="default"
    showIcon
    action={{
      id: "post",
      label: "Action",
      disabled: false
    }}
    actionCallback={(id, action) =>
      alert(`clicked ${id} with ${action.label}`)
    }
    offset={72}
  />
);
