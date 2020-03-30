import React from "react";
import DropDownMenu from "@hv/uikit-react-core/dist/DropDownMenu";
import Button from "@hv/uikit-react-core/dist/Button";

const menuOptions = [
  {
    label: "Label 1"
  },
  {
    label: "Label 2",
    disabled: true
  },
  {
    label: "Label 3"
  }
];

export default (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <Button id="button1">button1</Button>
    <DropDownMenu
      id="dpmKeepOpenedFalse"
      dataList={menuOptions}
      onClick={(e, item) => console.log(item.label)}
      keepOpened={false}
    />
    <Button id="button2">button2</Button>
  </div>
);
