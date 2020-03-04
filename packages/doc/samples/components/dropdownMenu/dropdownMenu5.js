import React, { useState } from "react";
import DropDownMenu from "@hv/uikit-react-core/dist/DropDownMenu";
import Button from "@hv/uikit-react-core/dist/Button";

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

const ControlledDropdownMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          category="ghost"
          onClick={() => setOpen(prevState => !prevState)}
        >
          {open ? "Close" : "Open"}
        </Button>
        <DropDownMenu
          id="dropMenu"
          dataList={menuOptions}
          onClick={item => alert(item.label)}
          onToggleOpen={value => setOpen(value)}
          disablePortal={false}
          aria-label="dropdownMenu-1"
          keepOpened={false}
          expanded={open}
        />
      </div>
    </>
  );
};

export default <ControlledDropdownMenu />;
