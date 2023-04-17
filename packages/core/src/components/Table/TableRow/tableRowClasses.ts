import { getClasses } from "~/utils";

export interface HvTableRowClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the component root when selected. */
  selected?: string;
  /** Styles applied to the component root when expanded. */
  expanded?: string;
  /** Styles applied to the component root when striped. */
  striped?: string;
  /** Styles applied to the component root on hover. */
  hover?: string;
  /** Styles applied to the component root when inside a `HvTableHead`. */
  head?: string;
  /** Styles applied to the component root when inside a `HvTableBody`. */
  body?: string;
  /** Styles applied to the component root when inside a `HvTableFooter`. */
  footer?: string;
  /** Styles applied to the component root when its table variant is list. */
  variantList?: string;
  /** Styles applied to the component root when its table variant is list. */
  variantListHead?: string;
}

const classKeys: string[] = [
  "root",
  "selected",
  "expanded",
  "striped",
  "hover",
  "head",
  "body",
  "footer",
  "variantList",
  "variantListHead",
];

const tableRowClasses = getClasses<HvTableRowClasses>(classKeys, "HvTableRow");

export default tableRowClasses;
