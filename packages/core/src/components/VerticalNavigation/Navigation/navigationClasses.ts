import { getClasses } from "utils";

export type HvVerticalNavigationTreeClasses = {
  root?: string;
  list?: string;
  listItem?: string;
  collapsed?: string;
};

const classKeys: string[] = ["root", "list", "listItem", "collapsed"];

const verticalNavigationTreeClasses =
  getClasses<HvVerticalNavigationTreeClasses>(
    classKeys,
    "HvVerticalNavigationTree"
  );

export default verticalNavigationTreeClasses;
