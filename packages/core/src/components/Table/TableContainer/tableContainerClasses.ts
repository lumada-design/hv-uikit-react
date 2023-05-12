import { getClasses } from "@core/utils";

export interface HvTableContainerClasses {
  /** Styles applied to the component root class. */
  root?: string;
}

const classKeys: (keyof HvTableContainerClasses)[] = ["root"];

const tableContainerClasses = getClasses(classKeys, "HvTableContainer");

export default tableContainerClasses;
