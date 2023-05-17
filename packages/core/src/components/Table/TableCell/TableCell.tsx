import tableCellClasses, { HvTableCellClasses } from "./tableCellClasses";
import { CSSProperties, forwardRef, TdHTMLAttributes, useContext } from "react";
import {
  HvTableCellAlign,
  HvTableCellType,
  HvTableCellVariant,
} from "../Table";
import TableContext from "../TableContext";

import TableSectionContext from "../TableSectionContext";
import capitalize from "lodash/capitalize";
import { ClassNames } from "@emotion/react";
import { styles } from "./TableCell.styles";

export interface HvTableCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "align"> {
  /** The component used for the root node. Either a string to use a HTML element or a component. Defaults to td. */
  component?: React.ElementType;
  /** Content to be rendered */
  children?: React.ReactNode;
  /** Inline styles to be applied to the root element. */
  style?: CSSProperties;
  /** Set the text-align on the table cell content. */
  align?: HvTableCellAlign;
  /** Sets the cell's variant. */
  variant?: HvTableCellVariant | "listcheckbox" | "listactions";
  /** Specify the cell's type. The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components. */
  type?: HvTableCellType;
  /** Whether or not the cell is part of a sorted column. */
  sorted?: boolean;
  /** The cell is part of a sticky column. */
  stickyColumn?: boolean;
  /** The cell is part of the last sticky to the left column. */
  stickyColumnMostLeft?: boolean;
  /** The cell is part of the first sticky to the right column. */
  stickyColumnLeastRight?: boolean;
  /** The cell is part of the first column in the group. */
  groupColumnMostLeft?: boolean;
  /** The cell is part of the last column in the group. */
  groupColumnMostRight?: boolean;
  /** Whether or not the cell is resizable */
  resizable?: boolean;
  /** Whether or not the cell is being resized */
  resizing?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTableCellClasses;
}

const defaultComponent = "td";

/**
 * `HvTableCell` acts as a `td` element and inherits styles from its context
 */
export const HvTableCell = forwardRef<HTMLElement, HvTableCellProps>(
  (
    {
      children,
      component,
      className,
      style,
      classes,
      align = "inherit",
      variant = "default",
      type: typeProp,
      stickyColumn = false,
      stickyColumnMostLeft = false,
      stickyColumnLeastRight = false,
      groupColumnMostLeft = false,
      groupColumnMostRight = false,
      sorted = false,
      resizable = false,
      resizing = false,
      ...others
    },
    externalRef
  ) => {
    const tableContext = useContext(TableContext);
    const tableSectionContext = useContext(TableSectionContext);

    const type = typeProp || tableSectionContext?.type || "body";

    const Component =
      component || tableContext?.components?.Td || defaultComponent;

    return (
      <ClassNames>
        {({ css, cx }) => (
          <Component
            ref={externalRef}
            role={Component === defaultComponent ? null : "cell"}
            style={style}
            className={cx(
              className,
              tableCellClasses.root,
              tableCellClasses[type],
              align !== "inherit" &&
                cx(tableCellClasses[`align${capitalize(align)}`]),
              tableContext.variant === "listrow" &&
                cx(tableCellClasses[`align${capitalize(align)}`]),
              tableContext.variant === "listrow" &&
                type !== "body" &&
                cx(tableCellClasses.variantListHead),
              variant !== "default" &&
                cx(tableCellClasses[`variant${capitalize(variant)}`]),
              sorted && cx(tableCellClasses.sorted),
              stickyColumn && cx(tableCellClasses.stickyColumn),
              stickyColumnMostLeft && cx(tableCellClasses.stickyColumnMostLeft),
              stickyColumnLeastRight &&
                cx(tableCellClasses.stickyColumnLeastRight),
              groupColumnMostLeft && cx(tableCellClasses.groupColumnMostLeft),
              groupColumnMostRight && cx(tableCellClasses.groupColumnMostRight),
              resizable && cx(tableCellClasses.resizable),
              resizing && cx(tableCellClasses.resizing),

              css(styles.root),
              css(styles[type]),
              align !== "inherit" &&
                cx(css(styles[`align${capitalize(align)}`])),
              tableContext.variant === "listrow" && cx(css(styles.variantList)),
              tableContext.variant === "listrow" &&
                type !== "body" &&
                cx(css(styles.variantListHead)),
              variant !== "default" &&
                cx(css(styles[`variant${capitalize(variant)}`])),
              sorted && cx(css(styles.sorted)),
              stickyColumn && cx(css(styles.stickyColumn)),
              stickyColumnMostLeft && cx(css(styles.stickyColumnMostLeft)),
              stickyColumnLeastRight && cx(css(styles.stickyColumnLeastRight)),
              groupColumnMostLeft && cx(css(styles.groupColumnMostLeft)),
              groupColumnMostRight && cx(css(styles.groupColumnMostRight)),
              resizable && cx(css(styles.resizable)),
              resizing && cx(css(styles.resizing)),
              classes?.root,
              classes?.[type],
              align !== "inherit" && cx(classes?.[`align${capitalize(align)}`]),
              tableContext.variant === "listrow" && cx(classes?.variantList),
              tableContext.variant === "listrow" &&
                type !== "body" &&
                cx(classes?.variantListHead),
              variant !== "default" &&
                cx(classes?.[`variant${capitalize(variant)}`]),
              sorted && cx(classes?.sorted),
              stickyColumn && cx(classes?.stickyColumn),
              stickyColumnMostLeft && cx(classes?.stickyColumnMostLeft),
              stickyColumnLeastRight && cx(classes?.stickyColumnLeastRight),
              groupColumnMostLeft && cx(classes?.groupColumnMostLeft),
              groupColumnMostRight && cx(classes?.groupColumnMostRight),
              resizable && cx(classes?.resizable),
              resizing && cx(classes?.resizing)
            )}
            {...others}
          >
            {children}
          </Component>
        )}
      </ClassNames>
    );
  }
);
