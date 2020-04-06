import React from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";
import Alert from "@hv/uikit-react-icons/dist/Generic/Alert";

const exampleStyles = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "800px",
  padding: "0 30px 0 0",
  justifyContent: "space-between"
};

const boxStyles = {
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center"
};

const svgStyles = {
  margin: "0 auto"
};

export default (
  <div style={exampleStyles}>
    <HvBadge
      count={0}
      icon={<Alert boxStyles={boxStyles} style={svgStyles} />}
    />

    <HvBadge
      count={1}
      icon={<Alert boxStyles={boxStyles} style={svgStyles} />}
    />

    <HvBadge
      showCount
      count={2}
      icon={<Alert boxStyles={boxStyles} style={svgStyles} />}
    />

    <HvBadge
      showCount
      count={88}
      maxCount={9}
      icon={<Alert boxStyles={boxStyles} style={svgStyles} />}
    />

    <HvBadge
      showCount
      count={888}
      icon={<Alert boxStyles={boxStyles} style={svgStyles} />}
    />
  </div>
);
