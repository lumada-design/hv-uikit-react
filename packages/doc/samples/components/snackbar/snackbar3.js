import React, { useState } from "react";
import HvSnackbar from "@hv/uikit-react-core/dist/Snackbar";
import Button from "@hv/uikit-react-core/dist/Button";

const SimpleSnackbar = props => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
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
      <HvSnackbar open={open} onClose={handleClose} offset={60} {...props} />
    </div>
  );
};

export default (
  <SimpleSnackbar label="This is a snackbar without icon" variant="default" />
);
