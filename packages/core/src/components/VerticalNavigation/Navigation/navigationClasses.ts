import { getClasses } from "@core/utils";

export interface HvVerticalNavigationTreeClasses {
  root?: string;
  list?: string;
  listItem?: string;
  collapsed?: string;
  popup?: string;
}

const classKeys: string[] = ["root", "list", "listItem", "collapsed", "popup"];

const verticalNavigationTreeClasses =
  getClasses<HvVerticalNavigationTreeClasses>(
    classKeys,
    "HvVerticalNavigationTree"
  );

export default verticalNavigationTreeClasses;
