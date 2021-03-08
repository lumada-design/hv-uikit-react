import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvInputProps } from "../Input";

export interface PaginationLabelsProp {
  /**
   * The show label.
   */
  pageSizePrev?: string;
  /**
   * Indicate the units of the page size selection.
   */
  pageSizeEntryName?: string;
  /**
   * Used for the aria-label of the selection of number of unit.s
   */
  pageSizeSelectorDescription?: string;
  /**
   * Separator of current page and total pages.
   */
  pagesSeparator?: string;
  /**
   * Title of button `firstPage`.
   */
  paginationFirstPageTitle?: string;
  /**
   * Title of button `previousPage`.
   */
  paginationPreviousPageTitle?: string;
  /**
   * Title of button `nextPage`.
   */
  paginationNextPageTitle?: string;
  /**
   * Title of button `lastPage`.
   */
  paginationLastPageTitle?: string;
  /**
   * Aria-label passed to the page input.
   */
  paginationInputLabel?: string;
  /**
   * Aria-label of the first page button
   */
  firstPage?: string;
  /**
   * Aria-label of the previous page button
   */
  previousPage?: string;
  /**
   * Aria-label of the next page button
   */
  nextPage?: string;
  /**
   * Aria-label of the last page button
   */
  lastPage?: string;
}

export interface HvPaginationCommonProps {
  /**
   * The number of pages the component has.
   */
  pages?: number;
  /**
   * The currently selected page (0-indexed).
   */
  page?: number;
  /**
   * Controls whether the left page size mechanism should be visible.
   */
  showPageSizeOptions?: boolean;
  /**
   * The array of possible page sizes for the dropdown.
   */
  pageSizeOptions?: number[];
  /**
   * The currently selected page size.
   */
  pageSize?: number;
  /**
   * Controls whether the previous/first page buttons are enabled.
   */
  canPrevious?: boolean;
  /**
   * Controls whether the next/last page buttons are enabled.
   */
  canNext?: boolean;
  /**
   * Function called when the page changes.
   */
  onPageChange?: (page: number) => void;
  /**
   * Function called when the page size changes.
   */
  onPageSizeChange?: (pageSize: number) => void;
}

export type HvPaginationClassKey =
  | "root"
  | "pageSizeOptions"
  | "pageSizeOptionsSelect"
  | "pageNavigator"
  | "pageInfo"
  | "pageJump"
  | "pageSizeInput"
  | "pageSizeInputRoot"
  | "pageSizeInputContainer"
  | "iconContainer"
  | "icon"
  | "selectDownIcon";

export interface HvPaginationProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvPaginationClassKey>,
    HvPaginationCommonProps {
  /**
   * Controls whether the central page changing mechanism should be visible.
   */
  showPageJump?: boolean;
  /**
   * An object containing all the labels for the component.
   */
  labels?: PaginationLabelsProp;
  /**
   * Other props to show page component.
   */
  showPageProps?: Record<string, any>;
  /**
   * Other props to pagination component.
   */
  navigationProps?: Record<string, any>;
  /**
   * Extra properties passed to the input component representing the current pages.
   */
  currentPageInputProps?: HvInputProps;
}

export default function HvPagination(props: HvPaginationProps): JSX.Element | null;
