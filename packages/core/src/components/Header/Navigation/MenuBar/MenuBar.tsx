import clsx from "clsx";
import { useContext } from "react";
import { HvNavigationItemProp } from "components";
import { HvBaseProps } from "../../../../types";
import { HvMenuItem } from "../MenuItem";
import { SelectionContext } from "../utils/SelectionContext";
import { MenuBarRoot, MenuBarUl } from "./MenuBar.styles";

export type HvMenuBarProps = HvBaseProps<"div", { onClick }> & {
  data: HvNavigationItemProp[];
  type: string;
  onClick?: (event: MouseEvent, selection: HvNavigationItemProp) => void;
};

export const HvMenuBar = ({
  id,
  data = [],
  onClick,
  type = "menubar",
  className,
}: HvMenuBarProps) => {
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
        {data.map((item: HvNavigationItemProp) => (
          <HvMenuItem key={item.id} item={item} type={type} onClick={onClick} />
        ))}
      </MenuBarUl>
    </MenuBarRoot>
  );
};
