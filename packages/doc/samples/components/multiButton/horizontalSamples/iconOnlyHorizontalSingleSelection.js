import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

import Map from "@hv/uikit-react-icons/dist/Generic/Map";
import LocationPin from "@hv/uikit-react-icons/dist/Generic/LocationPin";

const buttonsDefinitions = [
  { id: "map", icon: <Map />, selected: true },
  { id: "location", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "64px" }}>
    <MultiButton buttons={buttonsDefinitions} type={"icon"} />
  </div>
);
