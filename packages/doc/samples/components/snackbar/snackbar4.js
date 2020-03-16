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
      <HvSnackbar id={id} open={open} onClose={handleClose} offset={60} {...other} />
    </div>
  );
};

export default (
  <SimpleSnackbar
    id="actionStructure"
    label="This is a snackbar."
    variant="default"
    showIcon
    action={{
      id: "post",
      label: "Action",
      disabled: false
    }}
    actionCallback={(id, action) => alert(`clicked ${id} with ${action.label}`)}
  />
);
