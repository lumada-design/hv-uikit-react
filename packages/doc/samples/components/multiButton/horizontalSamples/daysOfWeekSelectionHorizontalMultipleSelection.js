import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

const buttonsDefinitions = [
  { id: "monday", value: "M", selected: true },
  { id: "tuesday", value: "T" },
  { id: "wednesday", value: "W", selected: true },
  { id: "thursday", value: "T", selected: true },
  { id: "friday", value: "F" },
  { id: "saturday", value: "S", selected: true },
  { id: "sunday", value: "S" }
];

export default (
  <div style={{ width: "224px" }}>
    <MultiButton buttons={buttonsDefinitions} type={"text"} multi />
  </div>
);
