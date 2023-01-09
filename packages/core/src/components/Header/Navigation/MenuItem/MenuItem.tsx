import { useContext } from "react";
import { HvNavigationItemProp, HvTypography } from "components";
import { HvMenuBar } from "../MenuBar";
import { HvBaseProps } from "types";
import { isKeypress, keyboardCodes } from "utils";
import { FocusContext } from "../utils/FocusContext";
import { SelectionContext } from "../utils/SelectionContext";
import { MenuItemLabel, MenuItemLi, MenuItemLink } from "./MenuItem.styles";

export type MenuItemProps = HvBaseProps<HTMLDivElement, { onClick }> & {
  item: HvNavigationItemProp;
  type?: string;
  onClick?: (event: MouseEvent, selection: HvNavigationItemProp) => void;
};

export const HvMenuItem = ({ id, item, type, onClick }: MenuItemProps) => {
  const selectionPath = useContext(SelectionContext);
  // @ts-ignore
  const { dispatch } = useContext(FocusContext);

  const { data } = item;
  const hasSubLevel = data && data.length;
  const isMenu = type === "menu";
  const isSelected =
    (selectionPath && selectionPath[isMenu ? 1 : 0] === item.id) || false;

  const actionHandler = (event) => {
    if (
      event.type === "click" ||
      isKeypress(event, keyboardCodes.Enter) ||
      isKeypress(event, keyboardCodes.SpaceBar)
    ) {
      if (event.type === "click") {
        event.currentTarget.blur();
      }
      onClick?.(event, item);
    }
  };

  const handleFocus = (event) => {
    dispatch({ type: "setItemFocused", itemFocused: event.currentTarget });
  };

  const itemProps = {
    onClick: actionHandler,
    onKeyDown: actionHandler,
    tabIndex: 0,
    onFocus: handleFocus,
  };

  const label = (
    <HvTypography variant={isSelected ? "label" : "body"}>
      {item.label}
    </HvTypography>
  );

  return (
    <MenuItemLi
      id={id}
      key={item.label}
      selected={!isMenu && isSelected ? "selectedItem" : "notSelectedItem"}
    >
      {item?.href ? (
        <MenuItemLink href={item?.href} target={item?.target} {...itemProps}>
          {label}
        </MenuItemLink>
      ) : (
        <MenuItemLabel role="button" {...itemProps} isSelected={isSelected}>
          {label}
        </MenuItemLabel>
      )}
      {hasSubLevel && <HvMenuBar data={data} onClick={onClick} type="menu" />}
    </MenuItemLi>
  );
};
