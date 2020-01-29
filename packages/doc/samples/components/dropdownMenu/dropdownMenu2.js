import React from "react";
import DropDownMenu from "@hv/uikit-react-core/dist/DropDownMenu";

const menuOptions = [
  {
    label: "Label 1"
  },
  {
    label: "Label 2"
  },
  {
    label: "Label 3"
  }
];

export default (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <DropDownMenu
      dataList={menuOptions}
      placement="right"
      aria-label="dropdownMenu-2"
      onClick={e => console.log(e.label)}
    />
  </div>
);
