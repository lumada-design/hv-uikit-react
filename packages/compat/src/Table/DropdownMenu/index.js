import React from "react";
import { MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";
import { HvDropDownMenu } from "@hitachivantara/uikit-react-core";

// eslint-disable-next-line react/prop-types
const DropDownMenu = ({ id, secondaryActions, dropdownMenuProps, original }) => {
  return (
    <HvDropDownMenu
      id={id}
      disablePortal={false}
      icon={<MoreOptionsVertical style={{ width: 30, height: 30 }} />}
      dataList={secondaryActions}
      onClick={(event, item) => {
        event.stopPropagation();
        item?.action?.(event, original);
      }}
      keepOpened={false}
      placement="left"
      {...dropdownMenuProps}
    />
  );
};

export default DropDownMenu;
