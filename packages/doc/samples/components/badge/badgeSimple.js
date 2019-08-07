import React from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";

const exampleStyles = {
  display: "flex",
  width: "400px",
  justifyContent: "space-between"
};

export default (
  <div style={exampleStyles}>
    <HvBadge count={1} />
    <HvBadge showCount count={8} />
    <HvBadge showCount count={22} />
    <HvBadge showCount count={100} />
  </div>
);
