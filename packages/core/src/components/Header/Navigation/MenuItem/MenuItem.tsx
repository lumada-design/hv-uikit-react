import React, { useContext } from "react";
import { HvHeaderNavigationItemProp, HvTypography } from "@core/components";
import { HvBaseProps } from "@core/types";
import { isKeypress, keyboardCodes } from "@core/utils";
import { HvMenuBar } from "../MenuBar";
import { FocusContext } from "../utils/FocusContext";
import { SelectionContext } from "../utils/SelectionContext";
import { MenuItemLabel, MenuItemLi, MenuItemLink } from "./MenuItem.styles";

export interface MenuItemProps extends HvBaseProps<HTMLDivElement, "onClick"> {
  item: HvHeaderNavigationItemProp;
  type?: string;
  onClick?: (event: MouseEvent, selection: HvHeaderNavigationItemProp) => void;
}

// Traverse the tree of items and return the first href it finds
const traverseItem = (node: HvHeaderNavigationItemProp) => {
  let href;
  let target;

  if (node?.href) {
    href = node?.href;
    target = node?.target;
  } else if (node?.data != null && node?.data?.length > 0) {
    let i = 0;
    while (href == null && i < node.data.length) {
      traverseItem(node?.data[i]);
      i += 1;
    }
  }

  return { href, target };
};

export const HvMenuItem = ({ id, item, type, onClick }: MenuItemProps) => {
  const selectionPath = useContext(SelectionContext);
  const { dispatch } = useContext(FocusContext);

  const { data } = item;
  const hasSubLevel = data && data.length;
  const isMenu = type === "menu";
  const isSelected = selectionPath?.[isMenu ? 1 : 0] === item.id;
  const isCurrent = isSelected
    ? selectionPath?.length > (isMenu ? 2 : 1)
      ? true
      : "page"
    : undefined;

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

  const handleFocus = (event: React.FocusEvent) => {
    dispatch?.({ type: "setItemFocused", itemFocused: event.currentTarget });
  };

  const itemProps = {
    onClick: actionHandler,
    onKeyDown: actionHandler,
    onFocus: handleFocus,
  };

  const label = (
    <HvTypography
      component="span"
      variant={isSelected ? "label" : "body"}
      data-text={item.label}
    >
      {item.label}
    </HvTypography>
  );

  let itemHref = item?.href;
  let itemTarget = item?.target;

  // apps should configure the href even on parent items without content
  // so the fallback logic is theirs, but if not we'll do our best to find a link
  if (item?.href == null) {
    const { href, target } = traverseItem(item);
    itemHref = href;
    itemTarget = target;
  }

  return (
    <MenuItemLi
      id={id}
      key={item.label}
      $selected={!!isSelected}
      $isMenu={isMenu}
    >
      {itemHref ? (
        <MenuItemLink
          href={itemHref}
          target={itemTarget}
          {...itemProps}
          $isSelected={isSelected}
          $isMenu={isMenu}
          aria-current={isCurrent}
        >
          {label}
        </MenuItemLink>
      ) : (
        // keeping this code path for backwards compatibility, but
        // shouldn't really be used as it's not accessible
        <MenuItemLabel
          role="button"
          {...itemProps}
          tabIndex={0}
          $isSelected={isSelected}
          $isMenu={isMenu}
          aria-current={isCurrent}
        >
          {label}
        </MenuItemLabel>
      )}
      {hasSubLevel && <HvMenuBar data={data} onClick={onClick} type="menu" />}
    </MenuItemLi>
  );
};
