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
      id="dropMenu"
      dataList={menuOptions}
      onToggleOpen={isOpen =>
        alert(`Dropdown is ${isOpen ? "open" : "closed"}`)
      }
      onClick={item => alert(item.label)}
      disablePortal={false}
      aria-label="dropdownMenu-1"
      keepOpened={false}
    />
  </div>
);
