import React from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";

const exampleStyles = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "800px",
  padding: "0 30px 0 0",
  justifyContent: "space-between"
};

export default (
  <div style={exampleStyles}>
    <HvBadge count={0} text="Events" textVariant="sTitle" />

    <HvBadge count={1} text="Events" textVariant="sTitle" />

    <HvBadge showCount count={2} text="Events" textVariant="sTitle" />

    <HvBadge showCount count={18} maxCount={9} text="Events" textVariant="sTitle" />

    <HvBadge showCount count={888} text="Events" textVariant="sTitle" />
  </div>
);
