import React, { useEffect, useState } from "react";
import { HvSnackbar } from "@hitachivantara/uikit-react-core";

const SnackbarController = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!open) setOpen(true);
    }, 10000);

    return () => clearInterval(interval);
  });

  return (
    <HvSnackbar
      id="snackbar"
      offset={60}
      open={open}
      label="This is an example"
      onClose={handleClose}
      variant="success"
      showIcon
    />
  );
};

export default SnackbarController;
