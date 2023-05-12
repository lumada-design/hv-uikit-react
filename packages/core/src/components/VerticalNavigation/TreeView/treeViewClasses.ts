import { getClasses } from "@core/utils";

export interface HvVerticalNavigationTreeViewClasses {
  root?: string;
}

const classKeys: (keyof HvVerticalNavigationTreeViewClasses)[] = ["root"];

const treeViewClasses = getClasses(classKeys, "HvVerticalNavigationTreeView");

export default treeViewClasses;
