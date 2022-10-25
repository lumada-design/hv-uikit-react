import { Typography } from "components/Typography";
import { useContext } from "react";
import { MenuBar } from "../";
import SelectionContext from "../utils/SelectionContext";
import { MenuItemLabel, MenuItemLi, MenuItemLink } from "./MenuItem.styles";

export const MenuItem = ({ item, type, onClick }: MenuItemProps) => {
  const selectionPath = useContext(SelectionContext);

  const { data } = item;
  const hasSubLevel = data && data.length;
  const isMenu = type === "menu";
  const isSelected =
    (selectionPath && selectionPath[isMenu ? 1 : 0] === item.id) || false;

  const actionHandler = (event) => {
    if (
      event.type === "click"
      // ||
      // isKeypress(event, KeyboardCodes.Enter) ||
      // isKeypress(event, KeyboardCodes.SpaceBar)
    ) {
      if (event.type === "click") {
        event.currentTarget.blur();
      }
      onClick?.(event, item);
    }
  };

  const itemProps = {
    onClick: actionHandler,
    //onKeyDown: actionHandler,
    tabIndex: 0,
    //onFocus: handleFocus,
  };

  const label = (
    <Typography variant={isSelected ? "label" : "body"}>
      {item.label}
    </Typography>
  );

  return (
    <MenuItemLi
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
