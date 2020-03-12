import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";
import { LocationPin, Map } from "@hv/uikit-react-icons/dist";

const buttonsDefinitions = [
  { id: "map", value: "Map", icon: <Map /> },
  {
    id: "satellite",
    value: "Satellite",
    icon: <LocationPin />,
    selected: true
  },
  { id: "map1", value: "Chart", icon: <Map />, selected: true },
  { id: "satellite1", value: "Location 1", icon: <LocationPin /> },
  { id: "satellite2", value: "Location 2", icon: <LocationPin /> },
  { id: "satellite3", value: "Location 3", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "1000px" }}>
    <MultiButton buttons={buttonsDefinitions} type="mixed" multi minSelection={2} />
  </div>
);
