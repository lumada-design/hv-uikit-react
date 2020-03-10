import React, { useState } from "react";
import HvBanner from "@hv/uikit-react-core/dist/Banner";
import Button from "@hv/uikit-react-core/dist/Button";

const SimpleBanner = props => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (action, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const { id, ...other } = props;
  return (
    <div>
      <Button
        id={id ? `${id}-open-button` : undefined}
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{ width: "150px" }}
      >
        Click me
      </Button>
      <HvBanner id={id} open={open} onClose={handleClose} {...other} />
    </div>
  );
};

export default (
  <SimpleBanner
    id="banner6"
    label="This is a success banner."
    variant="success"
    showIcon
    actions={<Button category="semantic">Action</Button>}
    actionsPosition="inline"
  />
);
