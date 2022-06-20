import { StandardProps } from "@material-ui/core";
import { HvTypographyProps } from "@hitachivantara/uikit-react-core";

export type HvTableHeaderClassKey =
  | "root"
  | "head"
  | "body"
  | "footer"
  | "headerContent"
  | "headerText"
  | "headerParagraph"
  | "sortableHeaderText"
  | "alignLeft"
  | "alignRight"
  | "alignCenter"
  | "alignJustify"
  | "alignFlexLeft"
  | "alignFlexCenter"
  | "alignFlexRight"
  | "alignFlexJustify"
  | "variantCheckbox"
  | "variantExpand"
  | "variantActions"
  | "variantList"
  | "variantNone"
  | "sortable"
  | "sorted"
  | "sortButton"
  | "sortIcon"
  | "stickyColumn"
  | "stickyColumnMostLeft"
  | "stickyColumnLeastRight"
  | "groupColumnMostLeft"
  | "groupColumnMostRight"
  | "resizable"
  | "resizing"
  | "resizer";

export interface HvTableHeaderProps
  extends StandardProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HvTableHeaderClassKey,
    "align"
  > {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to th.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;

  /**
   * The scope of cells that the header element relates to.
   */
  scope?: "col" | "row" | "colgroup" | "rowgroup";

  /**
   * Set the text-align on the table cell content.
   */
  align?: "center" | "inherit" | "justify" | "left" | "right";
  /**
   * Sets the cell's variant.
   */
  variant?: "checkbox" | "expand" | "actions" | "default" | "none";

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
   * Extra props to be passed onto the text in the header.
   */
  headerTextProps?: HvTypographyProps;
  /**
   * Whether or not the cell is resizable
   */
  resizable?: boolean;
  /**
   * Whether or not the cell is being resized
   */
  resizing?: boolean;

  /**
   * The resize props injected in the resize handler
   */
  resizerProps?: object;
}

export default function HvTableHeader(props: HvTableHeaderProps): JSX.Element | null;
