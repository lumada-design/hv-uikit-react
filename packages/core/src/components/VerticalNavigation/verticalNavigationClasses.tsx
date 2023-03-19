import { getClasses } from "utils";

export type HvVerticalNavigationClasses = {
  /** Style applied to the root of the component. */
  root?: string;
  /** Style applied to the root of the component when its collapsed. */
  collapsed?: string;
};

const classKeys: string[] = ["root", "collapsed"];

const verticalNavigationClasses = getClasses<HvVerticalNavigationClasses>(
  classKeys,
  "HvVerticalNavigation"
);

export default verticalNavigationClasses;
