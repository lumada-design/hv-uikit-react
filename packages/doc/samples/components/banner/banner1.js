import React, { useState, memo } from "react";
import HvBanner from "@hv/uikit-react-core/dist/Banner";
import Button from "@hv/uikit-react-core/dist/Button";

const find = (array, value) => array.findIndex(element => element === value);

// Simple controller for the offset of the banners.
class Controller extends React.Component {
  state = { banners: [] };

  openCallback = id => {
    const { banners } = this.state;
    banners.push(id);
    this.setState({ banners });
  };

  closeCallback = id => {
    const { banners } = this.state;
    banners.splice(find(banners, id), 1);
    this.setState({ banners });
  };

  calculateOffset = id => 60 * (find(this.state.banners, id) + 1);

  isOpen = id => find(this.state.banners, id) !== -1;

  render() {
    return (
      <div>
        <SimpleBanner
          id={"0"}
          label="default"
          variant="default"
          offset={this.calculateOffset("0")}
          open={this.isOpen("0")}
          openCallback={this.openCallback}
          closeCallback={this.closeCallback}
        />
        <p />
        <SimpleBanner
          id={"1"}
          label="Success"
          variant="success"
          showIcon
          offset={this.calculateOffset("1")}
          open={this.isOpen("1")}
          openCallback={this.openCallback}
          closeCallback={this.closeCallback}
        />
        <p />
        <SimpleBanner
          id={"2"}
          label="Error"
          variant="error"
          showIcon
          offset={this.calculateOffset("2")}
          open={this.isOpen("2")}
          openCallback={this.openCallback}
          closeCallback={this.closeCallback}
        />
      </div>
    );
  }
}

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.open === nextProps.open && prevProps.offset === nextProps.offset;

const HvBannerMemo = memo(HvBanner, arePropsEqual);

const SimpleBanner = ({
  label,
  id,
  variant,
  showIcon,
  offset,
  open,
  openCallback,
  closeCallback
}) => {
  const handleClick = () => {
    openCallback(id);
  };

  const handleClose = (action, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeCallback(id);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{ width: "150px" }}
        disabled={open}
      >
        {label}
      </Button>
      <HvBannerMemo
        id={id}
        open={open}
        label={`This is ${label}`}
        onClose={handleClose}
        variant={variant}
        showIcon={showIcon}
        offset={offset}
      />
    </div>
  );
};

export default <Controller />;
