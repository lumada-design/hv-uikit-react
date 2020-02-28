import React from "react";
import Switch from "@hv/uikit-react-core/dist/Switch";

export default (
  <Switch
    checked={false}
    onChange={e => alert(e.target.checked ? "On" : "Off")}
    aria-label="Engine Control"
  />
);
