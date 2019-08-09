import React from "react";
import Switch from "@hv/uikit-react-lab/dist/Switch";

const labels = {
  left: "Disconnect",
  right: "Connect"
};

export default <Switch checked={false} disabled={false} labels={labels} />;
