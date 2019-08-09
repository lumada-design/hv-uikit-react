import React from "react";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

const smallData = [
  {
    label: "value 1",
    selected: false
  },
  {
    label: "value 2",
    selected: true
  },
  {
    label: "value 3",
    selected: false
  },
  {
    label: "value 4",
    selected: false
  }
];

export default <HvDropdown values={smallData} multiSelect showSearch />;
