import React from "react";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

const smallData = [
  {
    id: "id-1",
    label: "value 1"
  },
  {
    id: "id-2",
    label: "value 2"
  },
  {
    id: "id-3",
    label: "value 3"
  },
  {
    id: "id-4",
    label: "value 4"
  }
];

export default (
  <div style={{ width: "310px" }}>
    <HvDropdown
      values={smallData}
      onChange={item => console.log(item)}
      multiSelect={false}
      showSearch={false}
    />
  </div>
);
