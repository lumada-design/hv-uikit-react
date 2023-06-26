import { MoreOptionsHorizontal } from "@hitachivantara/uikit-react-icons";
import { HvBreadCrumbProps, HvDropDownMenu } from "@core/components";
import { setId } from "@core/utils";

export const removeExtension = (label: string) =>
  label.includes(".") ? label.substring(0, label.lastIndexOf(".")) : label;

export const pathWithSubMenu = (
  id: string | undefined,
  onClick: HvBreadCrumbProps["onClick"],
  listRoute: any,
  maxVisible: number,
  dropDownMenuProps?: HvBreadCrumbProps["dropDownMenuProps"]
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
      icon={<MoreOptionsHorizontal iconSize="S" color="secondary" />}
      dataList={subMenuList}
      {...dropDownMenuProps}
      onClick={onClick != null ? handleClick : undefined}
    />
  );

  return listRoute;
};
