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

  const { label, action, ...other } = props;
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
      <HvBanner
        open={open}
        label={`This is ${label}`}
        onClose={handleClose}
        actionsOnlabel={action}
        {...other}
      />
    </div>
  );
};

export default <SimpleBanner label="Banner" variant="default" />;
