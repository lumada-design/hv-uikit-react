import React from "react";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvBanner } from "../../src";
import styles from "../../src/Banner/styles";
import HvBannerContentWrapper from "../../src/Banner/BannerWrapper";

export class SimpleBanner extends React.Component {
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
        <HvBanner
          open={open}
          message={`This is ${message}`}
          onClose={this.handleClose}
          anchorOrigin={anchorOrigin}
          variant={variant}
          customIcon={customIcon}
          showIcon={showIcon}
          actionsOnMessage={action}
        />
      </div>
    );
  }
}

export const ActionButton = () => (
  <a
    href="https://i.imgflip.com/yrj3h.jpg"
    style={{
      color: "#146BD2",
      fontSize: "14px",
      letterSpacing: "0.02em",
      lineHeight: "20px",
      fontWeight: "600",
      "text-decoration": "none"
    }}
  >
    Action
  </a>
);

export const ActionButtonCollection = () => (
  <div
    style={{ display: "flex", width: "100px", justifyContent: "space-between" }}
  >
    <ActionButton />
    <ActionButton />
  </div>
);

export const BigDiv = props => (
  <div style={{ width: "95vw" }}>{props.elem}</div>
);

export const BannerContentWrapper = withStyles(styles)(HvBannerContentWrapper);
