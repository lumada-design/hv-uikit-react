import React from "react";
import { HvEmptyState } from "@hv/uikit-react-core/dist";
import { Fail } from "@hv/uikit-react-icons/dist";

export default (
  <HvEmptyState
    title="No data routes"
    message="After you start adding Data Routes, they will appear in here."
    icon={<Fail iconSize="L" color="atmo7" />}
  />
);
