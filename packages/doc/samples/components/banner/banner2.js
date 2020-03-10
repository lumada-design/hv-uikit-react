import React, { useState } from "react";
import HvBanner from "@hv/uikit-react-core/dist/Banner";
import Button from "@hv/uikit-react-core/dist/Button";
import { Info } from "@hv/uikit-react-icons/dist";

const SimpleBanner = props => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (action, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{ width: "150px" }}
      >
        Click me
      </Button>
      <HvBanner open={open} onClose={handleClose} {...props} />
    </div>
  );
};

export default (
  <SimpleBanner
    label="This is a default banner."
    variant="default"
    customIcon={<Info />}
  />
);
