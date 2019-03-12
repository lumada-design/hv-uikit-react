import React from "react";
import HvEmptyState from "@hv-ui/react/core/EmptyState";
import AlertIcon from "@hv-ui/icons/core/L-icons/Level3Alert96";

export default (
  <HvEmptyState
    title="No data routes."
    message="After you start adding Data Routes, they will appear in here."
    icon={<AlertIcon />}
  />
);
