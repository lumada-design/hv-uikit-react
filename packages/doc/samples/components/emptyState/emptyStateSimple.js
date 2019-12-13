import React from "react";
import HvEmptyState from "@hv/uikit-react-core/dist/EmptyState";
import Level3 from "@hv/uikit-react-icons/dist/Generic/Level3.Bad";

export default (
  <HvEmptyState
    title="No data routes."
    message="After you start adding Data Routes, they will appear in here."
    icon={<Level3 inverted />}
  />
);
