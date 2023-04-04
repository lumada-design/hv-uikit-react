import { getClasses } from "~/utils";

export type HvTableClasses = {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the component root class when it has a sticky header. */
  stickyHeader?: string;
  /** Styles applied to the component root class when it has sticky columns. */
  stickyColumns?: string;
  /** Styles applied to the component root class when it has sticky columns. */
  listRow?: string;
};

const classKeys: string[] = [
  "root",
  "stickyHeader",
  "stickyColumns",
  "listRow",
];

const tableClasses = getClasses<HvTableClasses>(classKeys, "HvTable");

export default tableClasses;
