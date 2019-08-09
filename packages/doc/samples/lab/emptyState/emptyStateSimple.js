import React from "react";
import HvEmptyState from "@hv/uikit-react-lab/dist/EmptyState";
import AlertIcon from "@hv/uikit-react-icons/dist/Level3.M";

export default (
  <HvEmptyState
    title="No data routes."
    message="After you start adding Data Routes, they will appear in here."
    icon={<AlertIcon />}
  />
);
