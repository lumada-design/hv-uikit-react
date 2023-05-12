import { getClasses } from "@core/utils";

export interface HvNavigationClasses {
  root?: string;
  icon?: string;
  disabled?: string;
  text?: string;
  textWithoutHover?: string;
}

const classKeys: (keyof HvNavigationClasses)[] = [
  "root",
  "icon",
  "disabled",
  "text",
  "textWithoutHover",
];

const navigationClasses = getClasses(classKeys, "HvNavigation");

export default navigationClasses;
