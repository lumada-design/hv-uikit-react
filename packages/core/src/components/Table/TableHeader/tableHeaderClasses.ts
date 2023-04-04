import { getClasses } from "~/utils";

export type HvTableHeaderClasses = {
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
  /** Styles applied to the container of the header cell content. */
  headerContent?: string;
  /** Styles applied to the text of the header cell. */
  headerText?: string;
  /** Styles applied to the text of the header cell when it is a paragraph. */
  headerParagraph?: string;
  /** Styles applied to the text of the header cell when it is sorted. */
  sortableHeaderText?: string;
  /** Styles applied to the component root when it is sorted. */
  sorted?: string;
  /** Styles applied to the component root when it is sortable. */
  sortable?: string;
  /** Styles applied to the sort button component. */
  sortButton?: string;
  /** Styles applied to the sort icon component. */
  sortIcon?: string;
  /** Styles applied to the component root when it is left aligned */
  alignLeft?: string;
  /** Styles applied to the component root when it is right aligned */
  alignRight?: string;
  /** Styles applied to the component root when it is center aligned */
  alignCenter?: string;
  /** Styles applied to the component root when it is justified */
  alignJustify?: string;
  /** Styles applied to the header content when it is left aligned */
  alignFlexLeft?: string;
  /** Styles applied to the header content when it is right aligned */
  alignFlexRight?: string;
  /** Styles applied to the header content when it is center aligned */
  alignFlexCenter?: string;
  /** Styles applied to the header content when it is justified */
  alignFlexJustify?: string;
  /** Styles applied to the component root when its variant is checkbox */
  variantCheckbox?: string;
  /** Styles applied to the component root when its variant is expand */
  variantExpand?: string;
  /** Styles applied to the component root when its variant is actions */
  variantActions?: string;
  /** Styles applied to the component root when its variant is none */
  variantNone?: string;
  /** Styles applied to the component root when its variant is list row */
  variantList?: string;
  /** Styles applied to the cell when it's part of a resizable column. */
  resizable?: string;
  /** Styles applied to the cell when it's part of a resizing column. */
  resizing?: string;
  /** Styles applied to the resizer object when column is resizable. */
  resizer?: string;
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
  "headerContent",
  "headerText",
  "headerParagraph",
  "sortableHeaderText",
  "sorted",
  "sortable",
  "sortButton",
  "sortIcon",
  "alignLeft",
  "alignRight",
  "alignCenter",
  "alignJustify",
  "alignFlexLeft",
  "alignFlexRight",
  "alignFlexCenter",
  "alignFlexJustify",
  "variantCheckbox",
  "variantExpand",
  "variantActions",
  "variantNone",
  "variantList",
  "resizable",
  "resizing",
  "resizer",
];

const tableHeaderClasses = getClasses<HvTableHeaderClasses>(
  classKeys,
  "HvTableHeader"
);

export default tableHeaderClasses;
