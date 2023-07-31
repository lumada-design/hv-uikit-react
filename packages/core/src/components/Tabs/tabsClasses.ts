import { getClasses } from "@core/utils/classes";

export interface HvTabsClasses {
  root?: string;
  flexContainer?: string;
  indicator?: string;
  scroller?: string;
}

const classKeys: (keyof HvTabsClasses)[] = [
  "root",
  "flexContainer",
  "indicator",
  "scroller",
];

const tabsClasses = getClasses(classKeys, "HvTabs");

export default tabsClasses;
