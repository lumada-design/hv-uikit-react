import React from "react";
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

const buttonsDefinitions = [
  { id: "monday", value: "M", selected: true, buttonProps: { "aria-label": "monday" } },
  { id: "tuesday", value: "T", buttonProps: { "aria-label": "tuesday" } },
  { id: "wednesday", value: "W", buttonProps: { "aria-label": "wednesday" }, selected: true },
  { id: "thursday", value: "T", buttonProps: { "aria-label": "thursday" }, selected: true },
  { id: "friday", value: "F", buttonProps: { "aria-label": "friday" } },
  { id: "saturday", value: "S", buttonProps: { "aria-label": "saturday" }, selected: true },
  { id: "sunday", value: "S", buttonProps: { "aria-label": "sunday" } }
];

export default (
  <div style={{ width: "224px" }}>
    <MultiButton buttons={buttonsDefinitions} type="text" multi />
  </div>
);
