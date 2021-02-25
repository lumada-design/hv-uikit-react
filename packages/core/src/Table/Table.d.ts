import { StandardProps } from "@material-ui/core";
import * as React from "react";
import { HvActionsGenericCommonProps } from "../ActionsGeneric";
import { ListValueProp } from "../List";
import { PaginationLabelsProp, HvPaginationProps } from "../Pagination";

export interface TableColumn {
  /**
   * The id of the column.
   */
  id?: string;
  /**
   * The title of the column.
   */
  headerText?: string;
  /**
   * Accessors are functions that return the value to populate the row's value for the column.
   */
  accessor?: string | Function;
  /**
   * Receives each cell value and it should return with any desired modification.
   * @param value - the cell value.
   */
  format?: (value: any) => any;
  /**
   * Sets the column type
   */
  cellType?: "numeric" | "alpha-numeric";
  /**
   * Styles to apply to the column.
   */
  style?: any;
  /**
   * Specifies if the column should always be visible and where it should be rendered.
   */
  fixed?: "left" | "right";
  /**
   *  Used to render a standard cell, defaults to the accessed value.
   */
  Cell?: React.ReactNode | string | Function;
  /**
   * If `true` the column may be sorted.
   */
  sortable?: boolean;
  /**
   * The width of the column
   */
  width?: string | number;
  /**
   * The max-width of the column
   */
  maxWidth?: string | number;
  /**
   * The min-width of the column
   */
  minWidth?: string | number;
  /**
   * Labels for the pagination.
   */
  paginationLabels?: PaginationLabelsProp;
}

export interface SecondaryAction extends ListValueProp {
  /**
   * Value when the action is clicked, it receives the row representation.
   */
  action?: (event: React.FormEvent<HTMLDivElement>, row: object) => void;
}

export type HvTableClassKey =
  | "root"
  | "table"
  | "theadGroup"
  | "theadGroupTr"
  | "theadGroupTh"
  | "thead"
  | "theadTh"
  | "theadFilter"
  | "theadFilterTr"
  | "theadFilterTh"
  | "tbody"
  | "tBodyEmpty"
  | "trGroups"
  | "tr"
  | "textContainer"
  | "td"
  | "tfoot"
  | "tfootTr"
  | "tfootTh"
  | "pagination"
  | "loading"
  | "noDate"
  | "resizer"
  | "rtSortIcon"
  | "sortedIconShown"
  | "sortedIconHidden"
  | "pointer"
  | "tableContainer"
  | "subtitle"
  | "title"
  | "checkBoxBorder"
  | "checkBoxRow"
  | "centered"
  | "alphaNumeric"
  | "numeric"
  | "link"
  | "subComponentContainer"
  | "iconContainer"
  | "firstWithNumeric"
  | "lockIcon"
  | "lockIconSelected"
  | "trashIcon"
  | "trashIconSelected"
  | "checkBoxText"
  | "menuItem"
  | "expand"
  | "separatorContainer"
  | "bulkActions";

export interface HvTableProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvTableClassKey>,
    HvActionsGenericCommonProps {
  /**
   * Unique class name used to identify the fixed table
   */
  uniqClassName?: string;

  /**
   * The column definition to apply to the table. Please check https://react-table.js.org/#/story/readme for more info
   * Use the property "cellType" to define the different types of cell. Available values: "number" , "alpha-numeric" and "link.
   * If the type is "link", in data use the structure {displayText: {text to display} ,url: {url} }.
   */
  columns: TableColumn[];
  /**
   * Array with the data elements to show.
   * It can also define the checkBoxProps property to pass extra props to the row checkbox selector.
   */
  data: object[];

  /**
   * Boolean to show or hide the pagination controls
   */
  showPagination?: boolean;

  /**
   * Callback to notify when the page changes
   */
  onPageChange?: (...args: any[]) => any;

  /**
   * Boolean to show or hide the page size control
   */
  showPageSize?: boolean;

  /**
   * Number of data entries for server side pagination
   */
  dataSize?: number;

  /**
   * Numeric value to control the page size selected
   */
  pageSize?: number;

  /**
   * Callback to notify when the page size changes
   */
  onPageSizeChange?: (pageSize: number, currentPage: number) => void;

  /**
   * Boolean to enable or disable the server side pagination mechanism
   */
  paginationServerSide?: boolean;

  /** 
   * Attributes applied to the pagination component 
   */
  paginationProps?: HvPaginationProps;

  /**
   * Numeric value to control the number of pages. Useful when Server side pagination data is enabled
   */
  pages?: number;

  /**
   * Specify the current page number when using a server side pagination
   */
  page?: number;

  /**
   * Callback with receives the page info and should fetch the data to show on the table
   */
  onFetchData?: (...args: any[]) => any;

  /**
   * Boolean to enable or disable the sort mechanism
   */
  sortable?: boolean;

  /**
   * An object describing what column is sorted by default on the table
   */
  defaultSorted?: any[];

  /**
   * Element to be shown in the expander.
   */
  subElementTemplate?: (row: object) => React.ReactNode;

  /**
   * Property to be uses as unique row identifier. One of the fields of the data.
   */
  idForCheckbox?: string;

  /**
   * Function to overwrite the existed getTrProps. Returns props to be applied to the tr.
   */
  getTrProps?: (state: object, rowInfo: object, column: object, instance: object) => any;

  /**
   * Number of rows available in table to display in aria-rowcount
   */
  rowCount?: number;

  /**
   * Callback which receives the checked state of all items in the list
   */
  onSelection?: (event: React.FormEvent<HTMLDivElement>, selection: any[]) => void;

  /**
   * Ids of preselected items in the list
   */
  selections?: any[];

  /**
   *  Secondary actions listed in menu dropdown. Label is displayed and action is executed on click.
   */
  secondaryActions?: SecondaryAction[];

  /**
   *  Extra properties passed to the select all checkbox props.
   */
  allCheckBoxProps?: Record<string, any>;

  /**
   *  Extra properties passed to the dropdown menu.
   */
  dropdownMenuProps?: Record<string, any>;

  tableProps?: Record<string, any>;

  /**
   * Boolean describing if the table columns are rezisable or not
   */
  resizable?: boolean;

  /**
   * The default page size in the page size selector
   */
  defaultPageSize?: number;

  /**
   * Component to be shown when no data is displayed.
   */
  noDataComponent?: React.ReactNode;
  /**
   * Defines if the expanded row is collapsed when data changes.
   */
  collapseOnDataChange?: boolean;
}

export default function HvTable(props: HvTableProps): JSX.Element | null;
