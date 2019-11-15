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
      actionsOnlabel,
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
        <HvBanner
          open={open}
          label={`This is ${label}`}
          onClose={this.handleClose}
          anchorOrigin={anchorOrigin}
          variant={variant}
          customIcon={customIcon}
          showIcon={showIcon}
          actionsOnMessage={actionsOnlabel}
        />
      </div>
    );
  }
}

const ActionButton = () => (
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
  <SimpleBanner
    label="default"
    variant="default"
    showIcon
    actionsOnlabel={<ActionButton />}
  />
);
