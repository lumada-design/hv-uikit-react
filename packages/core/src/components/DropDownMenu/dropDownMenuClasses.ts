import { getClasses } from "@core/utils";

export interface HvDropDownMenuClasses {
  /** Styles applied to the root. */
  root?: string;
  /** Styles applied to the container. */
  container?: string;
  /** Styles applied to the BaseDropdown container. */
  baseContainer?: string;
  /** Styles applied to the icon. */
  icon?: string;
  /** Styles applied to the icon when selected. */
  iconSelected?: string;
  /** Styles applied to the list. */
  menuList?: string;
}

const classKeys: (keyof HvDropDownMenuClasses)[] = [
  "root",
  "container",
  "baseContainer",
  "icon",
  "iconSelected",
  "menuList",
];

const dropDownMenuClasses = getClasses(classKeys, "HvDropDownMenu");

export default dropDownMenuClasses;
