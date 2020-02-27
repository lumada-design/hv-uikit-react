import React, { useEffect, useState } from "react";
import HvBanner from "@hv/uikit-react-core/dist/Banner";

const BannerController = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!open) setOpen(true);
    }, 10000);

    return () => clearInterval(interval);
  });

  const handleClose = () => setOpen(false);

  return (
    <HvBanner
      id="banner"
      offset={60}
      open={open}
      label="This is an example"
      onClose={handleClose}
    />
  );
};

export default BannerController;
