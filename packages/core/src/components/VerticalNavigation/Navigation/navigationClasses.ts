import { getClasses } from "~/utils";

export type HvVerticalNavigationTreeClasses = {
  root?: string;
  list?: string;
  listItem?: string;
  collapsed?: string;
  popup?: string;
};

const classKeys: string[] = ["root", "list", "listItem", "collapsed", "popup"];

const verticalNavigationTreeClasses =
  getClasses<HvVerticalNavigationTreeClasses>(
    classKeys,
    "HvVerticalNavigationTree"
  );

export default verticalNavigationTreeClasses;
