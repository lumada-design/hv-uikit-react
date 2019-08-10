import React from "react";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

const smallData = [
  {
    label: "value 1"
  },
  {
    label: "value 2"
  },
  {
    label: "value 3"
  },
  {
    label: "value 4"
  },
  {
    label: "value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5"
  }
];

export default (
  <HvDropdown
    values={smallData}
    multiSelect={false}
    showSearch={false}
    selectDefault={false}
  />
);
