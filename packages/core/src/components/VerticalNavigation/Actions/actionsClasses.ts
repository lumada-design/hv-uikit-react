import { getClasses } from "@core/utils";

export interface HvVerticalNavigationActionsClasses {
  root?: string;
  hide?: string;
}

const classKeys: (keyof HvVerticalNavigationActionsClasses)[] = [
  "root",
  "hide",
];

const actionsClasses = getClasses(classKeys, "HvVerticalNavigationActions");

export default actionsClasses;
