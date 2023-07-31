import { clsx } from "clsx";

import { useContext } from "react";

import { HvBaseProps } from "@core/types/generic";

import { SelectionContext } from "../utils/SelectionContext";
import { MenuBarRoot, MenuBarUl } from "./Bar.styles";
import headerMenuBarClasses from "./menuBarClasses";
import { HvHeaderNavigationItemProp } from "../useSelectionPath";

export interface BarProps extends HvBaseProps {
  data: HvHeaderNavigationItemProp[];
  type?: string;
}

export const Bar = ({
  id,
  data = [],
  type = "menubar",
  className,
  children,
}: BarProps) => {
  const selectionPath = useContext(SelectionContext);

  const isMenu = type === "menu";

  const isActive =
    isMenu && data.filter((item) => item.id === selectionPath?.[1]).length > 0;

  return (
    <MenuBarRoot
      className={clsx(
        className,
        isMenu && headerMenuBarClasses.hidden,
        isActive && headerMenuBarClasses.active
      )}
      $type={type}
      $hidden={isMenu}
      $active={isActive}
    >
      <MenuBarUl id={id} onFocus={() => {}}>
        {children}
      </MenuBarUl>
    </MenuBarRoot>
  );
};
