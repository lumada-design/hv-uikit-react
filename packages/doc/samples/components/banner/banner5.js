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

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="primary" style={{ width: "150px" }}>
        Action structure
      </Button>
      <HvBanner open={open} onClose={handleClose} {...props} />
    </div>
  );
};

export default (
  <SimpleBanner
    id="actionStructure"
    label="This could be a one-line success message text string with one action on a tablet or on a desktop. However, this is actually a two-lines message text string."
    variant="error"
    showIcon
    actions={[{ id: "action1", label: "Action", disabled: false }]}
    actionsCallback={(e, id, action) => alert(`clicked ${id} with ${action.label}`)}
    actionsPosition="inline"
  />
);
