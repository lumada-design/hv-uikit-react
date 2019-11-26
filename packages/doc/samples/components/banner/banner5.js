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
      labelButton,
      variant,
      showIcon,
      anchorOrigin,
      actions,
      actionsCallback,
      actionsPosition,
      customIcon,
      offset
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
          {labelButton}
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
          actionsCallback={actionsCallback}
          actionsPosition={actionsPosition}
          offset={offset}
        />
      </div>
    );
  }
}

export default (
  <SimpleBanner
    id="actionStructure"
    label="This could be a one-line success message text string with one action on a tablet or on a desktop. However, this is actually a two-lines message text string."
    labelButton="Action structure"
    variant="error"
    showIcon
    actions={[{ id: "action1", label: "Action", disabled: false }]}
    actionsCallback={(id, action) =>
      alert(`clicked ${id} with ${action.label}`)
    }
    actionsPosition="inline"
  />
);
