import clsx from "clsx";
import { useContext } from "react";
import { BaseProps } from "types/base";
import { MenuItem } from "../MenuItem";
import { NavigationItemProp } from "../Navigation";
import SelectionContext from "../utils/SelectionContext";
import { MenuBarRoot, MenuBarUl } from "./MenuBar.styles";

export interface MenuBarProps extends BaseProps<"div", { onClick }> {
  data: NavigationItemProp[];
  type: string;
  onClick?: (event: MouseEvent, selection: NavigationItemProp) => void;
}

export const MenuBar = ({
  id,
  data = [],
  onClick,
  type = "menubar",
  className,
}: MenuBarProps) => {
  const selectionPath = useContext(SelectionContext);

  const isMenu = type === "menu";

  const isActive =
    isMenu && data.filter((item) => item.id === selectionPath?.[1]).length > 0;

  return (
    <MenuBarRoot
      className={clsx(className, isMenu && "hidden", isActive && "active")}
      type={type}
      hidden={isMenu}
      active={isActive}
    >
      <MenuBarUl id={id} onFocus={() => {}}>
        {data.map((item: NavigationItemProp) => (
          <MenuItem key={item.id} item={item} type={type} onClick={onClick} />
        ))}
      </MenuBarUl>
    </MenuBarRoot>
  );
};

MenuBar.displayName = "MenuBar";
