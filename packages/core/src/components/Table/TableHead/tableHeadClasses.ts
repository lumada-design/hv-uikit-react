import { getClasses } from "~/utils";

export interface HvTableHeadClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied when the table has a sticky header. */
  stickyHeader?: string;
}

const classKeys: string[] = ["root", "stickyHeader"];

const tableHeadClasses = getClasses<HvTableHeadClasses>(
  classKeys,
  "HvTableHead"
);

export default tableHeadClasses;
