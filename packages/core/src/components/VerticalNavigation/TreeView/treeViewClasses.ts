import { getClasses } from "~/utils";

export type HvVerticalNavigationTreeViewClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

const treeViewClasses = getClasses<HvVerticalNavigationTreeViewClasses>(
  classKeys,
  "HvVerticalNavigationTreeView"
);

export default treeViewClasses;
