import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

import Map from "@hv/uikit-react-icons/dist/Map";
import LocationPin from "@hv/uikit-react-icons/dist/LocationPin";

const buttonsDefinitions = [
  { id: "map", value: "Map", icon: <Map /> },
  {
    id: "satellite",
    value: "Satellite",
    icon: <LocationPin />
  },
  { id: "map1", value: "Chart", icon: <Map /> },
  { id: "satellite1", value: "Location 1", icon: <LocationPin /> },
  { id: "satellite2", value: "Location 2", icon: <LocationPin /> },
  { id: "satellite3", value: "Location 3", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "1000px" }}>
    <MultiButton
      buttons={buttonsDefinitions}
      type={"mixed"}
      multi
      maxSelection={2}
    />
  </div>
);
