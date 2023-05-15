import { getClasses } from "@core/utils";

export interface HvPaginationClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the page size selector container. */
  pageSizeOptions?: string;
  /** Styles applied to the page size selector dropdown element. */
  pageSizeOptionsSelect?: string;
  /** Styles applied to the element that holds the labels for the page size selector */
  pageSizeTextContainer?: string;
  /** Styles applied to the page navigation container. */
  pageNavigator?: string;
  /** Styles applied to the central page information container. */
  pageInfo?: string;
  /** Styles applied to the page selector input container. */
  pageJump?: string;
  /** Styles passed down to the page selector Input component as `input`. */
  pageSizeInput?: string;
  /** Styles passed down to the page selector Input root. */
  pageSizeInputRoot?: string;
  /** Styles passed down to the page selector Input component as `container`. */
  pageSizeInputContainer?: string;
  /** Styles applied to each navigation `HvButton` icon container. */
  iconContainer?: string;
  /** Styles applied to each navigation icon. */
  icon?: string;
}

const classKeys: (keyof HvPaginationClasses)[] = [
  "root",
  "pageSizeOptions",
  "pageSizeOptionsSelect",
  "pageSizeTextContainer",
  "pageNavigator",
  "pageInfo",
  "pageJump",
  "pageSizeInput",
  "pageSizeInputRoot",
  "pageSizeInputContainer",
  "iconContainer",
  "icon",
];

const paginationClasses = getClasses(classKeys, "HvPagination");

export default paginationClasses;
