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

  const { variant, ...other } = props;
  return (
    <div>
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{ width: "150px", textTransform: "capitalize" }}
      >
        {variant}
      </Button>
      <HvSnackbar open={open} onClose={handleClose} offset={60} variant={variant} {...other} />
    </div>
  );
};

export default (
  <div>
    <SimpleSnackbar label="This is a snackbar." variant="default" showIcon />
    <p />
    <SimpleSnackbar label="This is a success." variant="success" showIcon />
    <p />
    <SimpleSnackbar label="This is an error." variant="error" showIcon />
  </div>
);
