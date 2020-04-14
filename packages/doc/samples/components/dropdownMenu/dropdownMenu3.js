import React from "react";
import DropDownMenu from "@hv/uikit-react-core/dist/DropDownMenu";
import { Calendar, Plane, User } from "@hv/uikit-react-icons/dist";

const menuOptions = [
  {
    label: "Label 1",
    iconCallback: ({ isSelected }) => <User color={isSelected ? "atmo1" : undefined} />
  },
  {
    label: "Label 2",
    iconCallback: ({ isSelected }) => <Calendar color={isSelected ? "atmo1" : undefined} />
  },
  {
    label: "Label 3",
    iconCallback: ({ isSelected }) => <Plane color={isSelected ? "atmo1" : undefined} />
  }
];

export default (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <DropDownMenu
      dataList={menuOptions}
      placement="right"
      onClick={(e, item) => console.log(item.label)}
      aria-label="dropdownMenu-3"
    />
  </div>
);
