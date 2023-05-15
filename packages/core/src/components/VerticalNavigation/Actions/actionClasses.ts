import { getClasses } from "@core/utils";

export interface HvVerticalNavigationActionClasses {
  action?: string;
  noIcon?: string;
  minimized?: string;
}

const classKeys: (keyof HvVerticalNavigationActionClasses)[] = [
  "action",
  "noIcon",
  "minimized",
];

const actionClasses = getClasses(classKeys, "HvVerticalNavigationAction");

export default actionClasses;
