import { isValidElement } from "react";

import type {
  HvPopperMenuGroup,
  HvPopperMenuItem,
  HvPopperMenuItems,
} from "./types";

export const normalizeGroups = (
  items: HvPopperMenuItems,
): HvPopperMenuGroup[] => {
  if (!items?.length) return [];
  const isFlatList = !("items" in (items[0] as HvPopperMenuGroup));
  if (isFlatList) {
    return [{ title: undefined, items: items as HvPopperMenuItem[] }];
  }
  return items as HvPopperMenuGroup[];
};

export const filterGroups = (
  search: string,
  searchProp: string | undefined,
  groups: HvPopperMenuGroup[],
) => {
  if (!search) return groups;
  if (searchProp !== undefined) return groups;

  return groups.map((group: HvPopperMenuGroup) => ({
    ...group,
    items: group.items.filter((item) => {
      // item.label.toLowerCase().includes(search.toLowerCase()),
      const labelText = getLabelText(item.label).toLowerCase();
      return labelText.includes(search.toLowerCase());
    }),
  }));
};

export const getLabelText = (label: React.ReactNode): string => {
  if (typeof label === "string") return label;
  if (typeof label === "number") return label.toString();
  if (Array.isArray(label)) return label.map(getLabelText).join(" ");
  if (isValidElement(label)) return getLabelText(label.props.children);
  return "";
};
