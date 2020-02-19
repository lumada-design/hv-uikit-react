import React from "react";
import Switch from "@hv/uikit-react-core/dist/Switch";

export default (
  <Switch
    checked={false}
    onChange={e => console.log(e.target.checked ? "On" : "Off")}
  />
);
