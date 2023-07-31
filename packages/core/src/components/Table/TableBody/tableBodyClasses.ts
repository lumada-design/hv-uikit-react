import { getClasses } from "@core/utils/classes";

export interface HvTableBodyClasses {
  /** Styles applied to the component root class. */
  root?: string;
}

const classKeys: (keyof HvTableBodyClasses)[] = ["root"];

const tableBodyClasses = getClasses(classKeys, "HvTableBody");

export default tableBodyClasses;
