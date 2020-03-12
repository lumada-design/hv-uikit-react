import React from "react";
import Switch from "@hv/uikit-react-core/dist/Switch";

const labels = {
  left: "Disconnect",
  right: "Connect"
};

export default (
  <Switch checked={false} disabled={false} labels={labels} aria-label="Server online" />
);
