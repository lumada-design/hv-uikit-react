import { StandardProps } from "@material-ui/core";
import { ColumnInstance } from "react-table";

export type HvTableCellClassKey =
  | "root"
  | "head"
  | "body"
  | "footer"
  | "sortable"
  | "sorted"
  | "sortIcon";

export interface HvTableCellProps
  extends StandardProps<React.HTMLAttributes<HTMLTableCellElement>, HvTableCellClassKey> {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to td in tbody or th in thead
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;

  /**
   * Whether or not the cell is sorted
   */
  sorted?: boolean;
  /**
   * Whether or not the cell is sortable
   */
  sortable?: boolean;
  /**
   * Set sort direction icon and aria-sort.
   */
  sortDirection?: "ascending" | "descending" | false;

  /**
   * React Table column instance. Also contains other props passed as `data`
   * https://react-table.tanstack.com/docs/api/useTable#column-options
   */
  rtCol: ColumnInstance;

  /**
   * Set the text-align on the table cell content.
   */
  align?: "center" | "inherit" | "justify" | "left" | "right";
  /**
   * Sets the padding applied to the cell.
   * By default, the Table parent component set the value, which is the default padding specified by Design System.
   */
  padding?: "checkbox" | "default" | "none";
  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  variant?: "body" | "footer" | "head";
}

export default function HvTableCell(props: HvTableCellProps): JSX.Element | null;
