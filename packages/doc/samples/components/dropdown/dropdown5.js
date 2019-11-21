import React from "react";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

const smallData = [
  {
    id: "id-1",
    label: "value 1",
    selected: false
  },
  {
    id: "id-2",
    label: "value 1",
    selected: true
  },
  {
    id: "id-3",
    label: "value 3",
    selected: false
  },
  {
    id: "id-4",
    label: "value 4",
    selected: false
  }
];

export default <HvDropdown id="dropdown5" values={smallData} onChange={item=>console.log(item)} multiSelect showSearch={false} />;
