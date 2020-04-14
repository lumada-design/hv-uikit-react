import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

const buttonsDefinitions = [
  { id: "map", value: "Map", selected: true },
  { id: "satellite", value: "Satellite" }
];

export default (
  <div style={{ width: "200px" }}>
    <MultiButton buttons={buttonsDefinitions} type="text" />
  </div>
);
