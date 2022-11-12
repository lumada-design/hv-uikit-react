import { Typography } from "components/Typography";
import { useContext } from "react";
import { BaseProps } from "types/base";
import { isKeypress, KeyboardCodes } from "utils/KeyboardUtils";
import { MenuBar } from "..";
import { NavigationItemProp } from "../Navigation";
import { FocusContext } from "../utils/FocusContext";
import SelectionContext from "../utils/SelectionContext";
import { MenuItemLabel, MenuItemLi, MenuItemLink } from "./MenuItem.styles";

export interface MenuItemProps extends BaseProps<"div", { onClick }> {
  item: NavigationItemProp;
  type?: string;
  onClick?: (event: MouseEvent, selection: NavigationItemProp) => void;
}

export const MenuItem = ({ id, item, type, onClick }: MenuItemProps) => {
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
      isKeypress(event, KeyboardCodes.Enter) ||
      isKeypress(event, KeyboardCodes.SpaceBar)
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
    <Typography variant={isSelected ? "label" : "body"}>
      {item.label}
    </Typography>
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
      {hasSubLevel && <MenuBar data={data} onClick={onClick} type="menu" />}
    </MenuItemLi>
  );
};
