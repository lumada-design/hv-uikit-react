import { MoreOptionsHorizontal } from "@hitachivantara/uikit-icons";
import { HvDropDownMenu } from "components";
import { setId } from "utils";

export const removeExtension = (label) =>
  label.includes(".") ? label.substring(0, label.lastIndexOf(".")) : label;

export const pathWithSubMenu = (
  id,
  classes,
  listRoute,
  maxVisible,
  dropDownMenuProps
) => {
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
