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

  const { labelButton, ...other } = props;
  return (
    <div>
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{ width: "150px" }}
      >
        {labelButton}
      </Button>
      <HvBanner open={open} onClose={handleClose} {...other} />
    </div>
  );
};

export default (
  <SimpleBanner
    id="actionStructure"
    label="This could be a one-line message text string with two actions on a tablet or on a desktop. This could be a two-lines message text string with two actions on a tablet or on a desktop. However, this is actually a three-lines message text string with two actions on a tablet or on a desktop."
    labelButton="Click me"
    variant="default"
    actions={[
      { id: "action1", label: "Action 1", disabled: false },
      { id: "action2", label: "Action 2", disabled: false }
    ]}
    actionsCallback={(id, action) =>
      alert(`clicked ${id} with ${action.label}`)
    }
    actionsPosition="bottom-right"
  />
);
