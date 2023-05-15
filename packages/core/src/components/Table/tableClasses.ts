import { getClasses } from "@core/utils";

export interface HvTableClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the component root class when it has a sticky header. */
  stickyHeader?: string;
  /** Styles applied to the component root class when it has sticky columns. */
  stickyColumns?: string;
  /** Styles applied to the component root class when it has sticky columns. */
  listRow?: string;
}

const classKeys: (keyof HvTableClasses)[] = [
  "root",
  "stickyHeader",
  "stickyColumns",
  "listRow",
];

const tableClasses = getClasses(classKeys, "HvTable");

export default tableClasses;
