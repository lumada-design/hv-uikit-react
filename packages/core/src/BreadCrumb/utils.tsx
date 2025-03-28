import { MoreOptionsHorizontal } from "@hitachivantara/uikit-react-icons";

import { HvDropDownMenu, HvDropDownMenuProps } from "../DropDownMenu";
import { setId } from "../utils/setId";

export const removeExtension = (label: string) =>
  label.includes(".") ? label.substring(0, label.lastIndexOf(".")) : label;

export const pathWithSubMenu = (
  id: string | undefined,
  listRoute: any,
  maxVisible: number,
  onClick?: (event: React.MouseEvent<HTMLElement>, data: any) => void,
  dropDownMenuProps?: Partial<HvDropDownMenuProps>,
) => {
  const nbrElemToSubMenu = listRoute.length - maxVisible;
  const subMenuList = listRoute.slice(1, nbrElemToSubMenu + 1);

  const handleClick = (event: any, data: any) => {
    event.preventDefault();

    onClick?.(event, data);
  };

  listRoute.splice(
    1,
    nbrElemToSubMenu,
    <HvDropDownMenu
      id={setId(id, "submenu")}
      icon={<MoreOptionsHorizontal iconSize="S" color="text" />}
      dataList={subMenuList}
      {...dropDownMenuProps}
      onClick={onClick != null ? handleClick : undefined}
    />,
  );

  return listRoute;
};
