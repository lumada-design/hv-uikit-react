import { getClasses } from "~/utils";

export type HvVerticalNavigationClasses = {
  /** Style applied to the root of the component. */
  root?: string;
  /** Style applied to the root of the component when its collapsed. */
  collapsed?: string;
  /** Style applied to the root of the component when its in slider mode. */
  slider?;
};

const classKeys: string[] = ["root", "collapsed", "slider"];

const verticalNavigationClasses = getClasses<HvVerticalNavigationClasses>(
  classKeys,
  "HvVerticalNavigation"
);

export default verticalNavigationClasses;
