import { getClasses } from "@core/utils";

export interface HvScrollToVerticalClasses {
  root?: string;
  positionAbsolute?: string;
  positionFixed?: string;
}

const classKeys: (keyof HvScrollToVerticalClasses)[] = [
  "root",
  "positionAbsolute",
  "positionFixed",
];

const scrollToVerticalClasses = getClasses(classKeys, "HvScrollToVertical");

export default scrollToVerticalClasses;
