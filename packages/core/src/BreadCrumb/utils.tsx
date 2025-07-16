import { HvDropdownMenu, HvDropdownMenuProps } from "../DropdownMenu";
import { HvIcon } from "../icons";
import { setId } from "../utils/setId";

export const removeExtension = (label: string) =>
  label.includes(".") ? label.slice(0, label.lastIndexOf(".")) : label;

export const pathWithSubMenu = (
  id: string | undefined,
  listRoute: any,
  maxVisible: number,
  onClick?: (event: React.MouseEvent<HTMLElement>, data: any) => void,
  dropDownMenuProps?: Partial<HvDropdownMenuProps>,
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
    <HvDropdownMenu
      id={setId(id, "submenu")}
      icon={<HvIcon name="DotsHorizontal" />}
      dataList={subMenuList}
      {...dropDownMenuProps}
      onClick={onClick != null ? handleClick : undefined}
    />,
  );

  return listRoute;
};
