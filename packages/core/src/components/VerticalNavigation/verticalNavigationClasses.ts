import { getClasses } from "@core/utils";

export interface HvVerticalNavigationClasses {
  /** Style applied to the root of the component. */
  root?: string;
  /** Style applied to the root of the component when its collapsed. */
  collapsed?: string;
  /** Style applied to the root of the component when its in slider mode. */
  slider?;
}

const classKeys: (keyof HvVerticalNavigationClasses)[] = [
  "root",
  "collapsed",
  "slider",
];

const verticalNavigationClasses = getClasses(classKeys, "HvVerticalNavigation");

export default verticalNavigationClasses;
