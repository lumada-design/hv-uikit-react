import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";
import { LocationPin, Map } from "@hv/uikit-react-icons/dist";

const buttonsDefinitions = [
  { id: "map", value: "Map", icon: <Map />, selected: true, enforced: true },
  { id: "satellite", value: "Satellite", icon: <LocationPin /> },
  { id: "map1", value: "Chart", icon: <Map />, selected: true },
  { id: "satellite1", value: "Place", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "500px" }}>
    <MultiButton buttons={buttonsDefinitions} type={"mixed"} multi />
  </div>
);
