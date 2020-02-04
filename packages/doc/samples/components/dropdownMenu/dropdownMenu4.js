import React from "react";
import DropDownMenu from "@hv/uikit-react-core/dist/DropDownMenu";
import MoreVert from "@hv/uikit-react-icons/dist/Generic/MoreOptionsVertical";

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
      id="dropMenu"
      dataList={menuOptions}
      onClick={e => alert(e.label)}
      disablePortal={false}
      aria-label="dropdownMenu-4"
      disabled
    />
  </div>
);
