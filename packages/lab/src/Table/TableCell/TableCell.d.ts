import { StandardProps } from "@material-ui/core";

export type HvTableCellClassKey =
  | "root"
  | "head"
  | "body"
  | "footer"
  | "stickyColumn"
  | "stickyColumnMostLeft"
  | "stickyColumnLeastRight"
  | "alignLeft"
  | "alignRight"
  | "alignCenter"
  | "alignJustify"
  | "variantCheckbox"
  | "variantExpand"
  | "variantActions"
  | "variantListactions"
  | "variantListcheckbox"
  | "variantNone"
  | "resizable"
  | "resizing";

export interface HvTableCellProps
  extends StandardProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HvTableCellClassKey,
    "align"
  > {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to td.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;

  /**
   * Set the text-align on the table cell content.
   */
  align?: "center" | "inherit" | "justify" | "left" | "right";
  /**
   * Sets the cell's variant.
   */
  variant?: "checkbox" | "expand" | "actions" | "default" | "listcheckbox" | "listactions" | "none";

  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  type?: "body" | "footer" | "head";

  /**
   * The cell is part of a sticky column.
   */
  stickyColumn?: boolean;
  /**
   * The cell is part of the last sticky to the left column.
   */
  stickyColumnMostLeft?: boolean;
  /**
   * The cell is part of the first sticky to the right column.
   */
  stickyColumnLeastRight?: boolean;

  /**
   * Whether or not the cell is resizable
   */
  resizable?: boolean;
  /**
   * Whether or not the cell is being resized
   */
  resizing?: boolean;
}

export default function HvTableCell(props: HvTableCellProps): JSX.Element | null;
