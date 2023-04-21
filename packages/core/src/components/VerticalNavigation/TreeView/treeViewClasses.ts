import { getClasses } from "@core/utils";

export interface HvVerticalNavigationTreeViewClasses {
  root?: string;
}

const classKeys: string[] = ["root"];

const treeViewClasses = getClasses<HvVerticalNavigationTreeViewClasses>(
  classKeys,
  "HvVerticalNavigationTreeView"
);

export default treeViewClasses;
