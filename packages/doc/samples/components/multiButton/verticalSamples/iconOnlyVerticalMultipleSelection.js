import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";
import { LocationPin, Map } from "@hv/uikit-react-icons/dist";

const buttonsDefinitions = [
  { id: "map", icon: <Map />, selected: true, buttonProps: { "aria-label": "map" } },
  { id: "satellite", icon: <LocationPin />, buttonProps: { "aria-label": "satellite" } }
];

export default (
  <div style={{ width: "32px" }}>
    <MultiButton buttons={buttonsDefinitions} type="icon" vertical multi />
  </div>
);
