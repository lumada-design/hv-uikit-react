import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";
import { LocationPin, Map } from "@hv/uikit-react-icons/dist";

const buttonsDefinitions = [
  { id: "map", icon: <Map />, selected: true, buttonProps: { "aria-label": "map" } },
  { id: "location", icon: <LocationPin />, buttonProps: { "aria-label": "location" } },
  { id: "map1", icon: <Map />, buttonProps: { "aria-label": "map1" } },
  { id: "location1", icon: <LocationPin />, buttonProps: { "aria-label": "location1" } },
  { id: "map2", icon: <Map />, buttonProps: { "aria-label": "map2" } },
  { id: "location2", icon: <LocationPin />, buttonProps: { "aria-label": "location2" } }
];

export default (
  <div style={{ width: "32px" }}>
    <MultiButton buttons={buttonsDefinitions} type="icon" vertical />
  </div>
);
