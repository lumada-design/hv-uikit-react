import React from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";
import AlertS from "@hv/uikit-react-icons/dist/DawnTheme/Alert.S";

const exampleStyles = {
  display: "flex",
  width: "800px",
  justifyContent: "space-between"
};

export default (
  <div style={exampleStyles}>
    <HvBadge count={0} icon={<AlertS />} />

    <HvBadge count={1} icon={<AlertS />} />

    <HvBadge showCount count={8} icon={<AlertS />} />

    <HvBadge showCount count={88} icon={<AlertS />} />

    <HvBadge showCount count={888} icon={<AlertS />} />
  </div>
);
