import { getClasses } from "utils";

export type HvTableBodyClasses = {
  /** Styles applied to the component root class. */
  root?: string;
};

const classKeys: string[] = ["root"];

const tableBodyClasses = getClasses<HvTableBodyClasses>(
  classKeys,
  "HvTableBody"
);

export default tableBodyClasses;
