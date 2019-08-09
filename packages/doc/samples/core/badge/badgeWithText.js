import React from "react";

import HvBadge from "@hv/uikit-react-core/dist/Badge";

const exampleStyles = {
  display: "flex",
  width: "800px",
  justifyContent: "space-between"
};

export default (
  <div style={exampleStyles}>
    <HvBadge count={0} text="Events" textVariant="sTitle" />

    <HvBadge count={1} text="Events" textVariant="sTitle" />

    <HvBadge showCount count={8} text="Events" textVariant="sTitle" />

    <HvBadge showCount count={88} text="Events" textVariant="sTitle" />

    <HvBadge showCount count={888} text="Events" textVariant="sTitle" />
  </div>
);
