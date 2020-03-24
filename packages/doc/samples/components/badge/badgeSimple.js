import React from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";

const exampleStyles = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "800px",
  padding: "0",
  justifyContent: "space-between"
};

export default (
  <div style={exampleStyles}>
    <HvBadge count={1} />
    <HvBadge showCount count={2} />
    <HvBadge showCount count={22} maxCount={9} />
    <HvBadge showCount count={100} />
  </div>
);
