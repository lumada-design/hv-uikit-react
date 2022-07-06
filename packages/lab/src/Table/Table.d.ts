import { StandardProps } from "@material-ui/core";

export type HvTableClassKey = "root" | "stickyHeader" | "stickyColumns" | "listRow";

export interface HvTableProps
  extends StandardProps<React.TableHTMLAttributes<HTMLTableElement>, HvTableClassKey> {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `table`.
   *
   * When using non-table elements, layout is up to the developer using the component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;

  /**
   * Whether the `HvTable` has a sticky header row.
   */
  stickyHeader?: boolean;
  /**
   * Whether the `HvTable` has sticky columns.
   */
  stickyColumns?: boolean;
  /**
   * Variant of table.
   */
  variant?: "listrow" | "default";
}

export default function HvTable(props: HvTableProps): JSX.Element | null;
