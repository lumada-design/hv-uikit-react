import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";
import { LocationPin, Map } from "@hv/uikit-react-icons/dist";

const buttonsDefinitions = [
  { id: "map", value: "Map", icon: <Map />, selected: true },
  { id: "satellite", value: "Satellite", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "120px" }}>
    <MultiButton buttons={buttonsDefinitions} vertical type="mixed" />
  </div>
);
