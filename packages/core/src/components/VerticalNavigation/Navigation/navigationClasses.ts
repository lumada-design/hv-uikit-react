import { getClasses } from "@core/utils";

export interface HvVerticalNavigationTreeClasses {
  root?: string;
  list?: string;
  listItem?: string;
  collapsed?: string;
  popup?: string;
}

const classKeys: (keyof HvVerticalNavigationTreeClasses)[] = [
  "root",
  "list",
  "listItem",
  "collapsed",
  "popup",
];

const verticalNavigationTreeClasses = getClasses(
  classKeys,
  "HvVerticalNavigationTree"
);

export default verticalNavigationTreeClasses;
