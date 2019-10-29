import React, { useState } from "react";
import Button from "@hv/uikit-react-core/dist/Button";

import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

import Map from "@hv/uikit-react-icons/dist/Generic/Map";
import LocationPin from "@hv/uikit-react-icons/dist/Generic/LocationPin";

const btnStyle = {
  width: "120px",
  height: "32px",
  margin: "0 10px 30px 0"
};

const initialButtonsDefinitions = [
  {
    id: "map",
    value: "map",
    icon: <Map />,
    selected: true,
    enforced: true
  },
  { id: "satellite", value: "satellite", icon: <LocationPin /> },
  { id: "map1", value: "chart", icon: <Map />, selected: true },
  { id: "satellite1", value: "place", icon: <LocationPin /> }
];

const finalButtonsDefinitions = [
  {
    id: "f1",
    value: "F1",
  },
  { id: "f2", value: "F2", icon: <LocationPin /> }
];

function WrapperComp() {
  const [value, setValue] = useState(initialButtonsDefinitions);

  return (
    <>
      <Button style={btnStyle} onClick={() => setValue(initialButtonsDefinitions)}>
        Initial Props{" "}
      </Button>
      <Button style={btnStyle} onClick={() => setValue(finalButtonsDefinitions)}>
        New Props{" "}
      </Button>
      <div style={{ width: "500px" }}>
        <MultiButton buttons={value} type={"mixed"} multi />
      </div>
    </>
  );
}

export default <WrapperComp />;
