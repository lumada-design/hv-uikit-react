/** @jsxImportSource @emotion/react */
import clsx from "clsx";
import { useContext } from "react";
import { BaseProps } from "types/base";
import { NavigationItemProp } from "../HeaderNavigation";
import { MenuItem } from "../MenuItem";
import SelectionContext from "../utils/SelectionContext";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MenuBarRootTwo, MenuBarUl } from "./MenuBar.styles";

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
    isMenu &&
    data.filter((item) => {
      return item.id === selectionPath[1];
    }).length > 0;

  return (
    <MenuBarRootTwo
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
    </MenuBarRootTwo>

    // <MenuBarRoot
    //   className={clsx(className, isMenu && "hidden", isActive && "active")}
    // type={type}
    // hidden={isMenu}
    // active={isActive}
    // >
    // <MenuBarUl id={id} onFocus={() => {}}>
    //   {data.map((item: NavigationItemProp) => (
    //     <MenuItem key={item.id} item={item} type={type} onClick={onClick} />
    //   ))}
    // </MenuBarUl>
    // </MenuBarRoot>

    // <div
    //   className={clsx(className, isMenu && "hidden", isActive && "active")}
    //   css={styles({ type, hidden: isMenu, active: isActive })}
    // >
    //   <MenuBarUl id={id} onFocus={() => {}}>
    //     {data.map((item: NavigationItemProp) => (
    //       <MenuItem key={item.id} item={item} type={type} onClick={onClick} />
    //     ))}
    //   </MenuBarUl>
    // </div>
  );
};

MenuBar.displayName = "MenuBar";
