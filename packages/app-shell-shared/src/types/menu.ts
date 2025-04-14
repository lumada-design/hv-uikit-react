import type { HvAppShellIcon } from "./Config";

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  data?: MenuItem[];
  icon?: HvAppShellIcon;
  parent?: MenuItem;
}

export interface MenuItemsContext {
  items: MenuItem[];
  selectedMenuItemId: string | undefined;
  rootMenuItemId: string | undefined;
}
