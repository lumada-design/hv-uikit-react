import React from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";
import { Alert } from "@hv/uikit-react-icons/dist";

const exampleStyles = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "800px",
  padding: "0 30px 0 0",
  justifyContent: "space-between"
};

export default (
  <div style={exampleStyles}>
    <HvBadge count={0} icon={<Alert />} />
    <HvBadge count={1} icon={<Alert />} />
    <HvBadge showCount count={8} icon={<Alert />} />
    <HvBadge showCount count={88} icon={<Alert />} />
    <HvBadge showCount count={888} icon={<Alert />} />
  </div>
);
