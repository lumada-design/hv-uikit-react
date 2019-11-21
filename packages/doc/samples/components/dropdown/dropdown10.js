import React from "react";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

const data = [
  {
    label: "value 1"
  },
  {
    label: "value 2"
  },
  {
    label: "value 3",
    selected: true
  },
  {
    label: "value 4"
  },
  {
    label: "value 5 value 5 value 5 555555555555 value value 5"
  },
  {
    label: "value 6"
  },
  {
    label: "value 7"
  },
  {
    label: "value 8"
  },
  {
    label: "value 9"
  },
  {
    label: "value 10"
  },
  {
    label: "value 11"
  },
  {
    label: "value 12"
  }
];

export default (
  <HvDropdown id="dropdown10" values={data} multiSelect={false} showSearch={false} disabled />
);
