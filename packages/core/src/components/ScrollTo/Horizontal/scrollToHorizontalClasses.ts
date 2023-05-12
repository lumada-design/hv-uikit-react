import { getClasses } from "@core/utils";

export interface HvScrollToHorizontalClasses {
  root?: string;
  positionSticky?: string;
  positionFixed?: string;
  notSelectedRoot?: string;
  notSelected?: string;
  selected?: string;
}

const classKeys: (keyof HvScrollToHorizontalClasses)[] = [
  "root",
  "positionSticky",
  "positionFixed",
  "notSelectedRoot",
  "notSelected",
  "selected",
];

const scrollToHorizontalClasses = getClasses(classKeys, "HvScrollToHorizontal");

export default scrollToHorizontalClasses;
