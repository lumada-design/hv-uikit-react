import { getClasses } from "@core/utils";

export interface HvTableHeadClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied when the table has a sticky header. */
  stickyHeader?: string;
}

const classKeys: (keyof HvTableHeadClasses)[] = ["root", "stickyHeader"];

const tableHeadClasses = getClasses(classKeys, "HvTableHead");

export default tableHeadClasses;
