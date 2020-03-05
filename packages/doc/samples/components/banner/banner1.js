import React, { memo } from "react";
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

  calculateOffset = id => {
    const { banners } = this.state;
    return 60 * (find(banners, id) + 1);
  };

  isOpen = id => {
    const { banners } = this.state;
    return find(banners, id) !== -1;
  };

  render() {
    return (
      <div>
        <SimpleBanner
          id="0"
          label="This is a default banner."
          variant="default"
          offset={this.calculateOffset("0")}
          open={this.isOpen("0")}
          openCallback={this.openCallback}
          closeCallback={this.closeCallback}
        />
        <p />
        <SimpleBanner
          id="1"
          label="This is a success banner."
          variant="success"
          showIcon
          offset={this.calculateOffset("1")}
          open={this.isOpen("1")}
          openCallback={this.openCallback}
          closeCallback={this.closeCallback}
        />
        <p />
        <SimpleBanner
          id="2"
          label="This is an error banner."
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
        style={{ width: "150px", textTransform: "capitalize" }}
        disabled={open}
      >
        {variant}
      </Button>
      <HvBannerMemo
        id={id}
        open={open}
        label={label}
        onClose={handleClose}
        variant={variant}
        showIcon={showIcon}
        offset={offset}
      />
    </div>
  );
};

export default <Controller />;
