import { getClasses } from "@core/utils";

export interface HvTableContainerClasses {
  /** Styles applied to the component root class. */
  root?: string;
}

const classKeys: string[] = ["root"];

const tableContainerClasses = getClasses<HvTableContainerClasses>(
  classKeys,
  "HvTableContainer"
);

export default tableContainerClasses;
