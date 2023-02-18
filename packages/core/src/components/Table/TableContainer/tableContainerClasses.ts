import { getClasses } from "utils";

export type HvTableContainerClasses = {
  /** Styles applied to the component root class. */
  root?: string;
};

const classKeys: string[] = ["root"];

const tableContainerClasses = getClasses<HvTableContainerClasses>(
  classKeys,
  "HvTableContainer"
);

export default tableContainerClasses;
