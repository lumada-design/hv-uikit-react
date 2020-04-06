import React from "react";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

const smallData = [
  { label: "value 1" },
  { label: "value 2", selected: true },
  { label: "value 3" },
  { label: "value 4" }
];

export default <HvDropdown id="dropdown5" values={smallData} multiSelect showSearch />;
