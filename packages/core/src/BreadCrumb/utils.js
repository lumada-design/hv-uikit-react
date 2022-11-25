import React from "react";
import { MoreOptionsHorizontal } from "@hitachivantara/uikit-react-icons";
import { HvDropDownMenu } from "..";
import { setId } from "../utils";

const pathWithSubMenu = (id, classes, listRoute, maxVisible, dropDownMenuProps) => {
  const nbrElemToSubMenu = listRoute.length - maxVisible;
  const subMenuList = listRoute.slice(1, nbrElemToSubMenu + 1);

  listRoute.splice(
    1,
    nbrElemToSubMenu,
    <HvDropDownMenu
      id={setId(id, "submenu")}
      icon={<MoreOptionsHorizontal iconSize="S" color="acce1" />}
      dataList={subMenuList}
      {...dropDownMenuProps}
    />
  );

  return listRoute;
};

export default pathWithSubMenu;
