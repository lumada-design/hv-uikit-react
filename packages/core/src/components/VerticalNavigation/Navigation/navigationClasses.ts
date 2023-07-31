import { getClasses } from "@core/utils/classes";

export interface HvVerticalNavigationTreeClasses {
  root?: string;
  list?: string;
  listItem?: string;
  collapsed?: string;
  popup?: string;
  navigationPopup?: string;
}

const classKeys: (keyof HvVerticalNavigationTreeClasses)[] = [
  "root",
  "list",
  "listItem",
  "collapsed",
  "popup",
  "navigationPopup",
];

const verticalNavigationTreeClasses = getClasses(
  classKeys,
  "HvVerticalNavigationTree"
);

export default verticalNavigationTreeClasses;
