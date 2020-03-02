import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

import Map from "@hv/uikit-react-icons/dist/Map";
import LocationPin from "@hv/uikit-react-icons/dist/LocationPin";

const buttonsDefinitions = [
  { id: "map", icon: <Map />, selected: true },
  { id: "location", icon: <LocationPin /> },
  { id: "map1", icon: <Map /> },
  { id: "location1", icon: <LocationPin /> },
  { id: "map2", icon: <Map /> },
  { id: "location2", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "32px" }}>
    <MultiButton buttons={buttonsDefinitions} type={"icon"} vertical />
  </div>
);
