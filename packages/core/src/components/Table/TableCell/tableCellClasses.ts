import { getClasses } from "~/utils";

export type HvTableCellClasses = {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the cell when it's in the table head. */
  head?: string;
  /** Styles applied to the cell when it's in the table body. */
  body?: string;
  /** Styles applied to the cell when it's in the table footer. */
  footer?: string;
  /** Styles applied to the cell when it's part of a sticky column. */
  stickyColumn?: string;
  /** Styles applied to the cell when it's part of the last sticky to the left column. */
  stickyColumnMostLeft?: string;
  /** Styles applied to the cell when it's part of the first right sticky column. */
  stickyColumnLeastRight?: string;
  /** Styles applied to the cell when it's part of the first column in the group. */
  groupColumnMostLeft?: string;
  /** Styles applied to the cell when it's part of the last column in the group. */
  groupColumnMostRight?: string;
  /** Styles applied to the cell when it's part of a sorted column. */
  sorted?: string;
  /** Styles applied to the sort icon. */
  sortIcon?: string;
  /** Styles applied to the component root when it is left aligned */
  alignLeft?: string;
  /** Styles applied to the component root when it is right aligned */
  alignRight?: string;
  /** Styles applied to the component root when it is center aligned */
  alignCenter?: string;
  /** Styles applied to the component root when it is justified */
  alignJustify?: string;
  /** Styles applied to the component root when its variant is checkbox */
  variantCheckbox?: string;
  /** Styles applied to the component root when its variant is expand */
  variantExpand?: string;
  /** Styles applied to the component root when its variant is actions */
  variantActions?: string;
  /** Styles applied to the component root when its variant is none */
  variantNone?: string;
  /** Styles applied to the component root when its variant is list */
  variantList?: string;
  /** Styles applied to the cell when its variant is list and actions. */
  variantListactions?: string;
  /** Styles applied to the cell when its variant is list and checkbox. */
  variantListcheckbox?: string;
  /** Styles applied to the cell when its variant is list and the type is head . */
  variantListHead?: string;
  /** Styles applied to the cell when it's part of a resizable column. */
  resizable?: string;
  /** Styles applied to the cell when it's part of a resizing column. */
  resizing?: string;
};

const classKeys: string[] = [
  "root",
  "head",
  "body",
  "footer",
  "stickyColumn",
  "stickyColumnMostLeft",
  "stickyColumnLeastRight",
  "groupColumnMostLeft",
  "groupColumnMostRight",
  "sorted",
  "sortIcon",
  "alignLeft",
  "alignRight",
  "alignCenter",
  "alignJustify",
  "variantCheckbox",
  "variantExpand",
  "variantActions",
  "variantNone",
  "variantList",
  "variantListactions",
  "variantListcheckbox",
  "variantListHead",
  "resizable",
  "resizing",
];

const tableCellClasses = getClasses<HvTableCellClasses>(
  classKeys,
  "HvTableCell"
);

export default tableCellClasses;
