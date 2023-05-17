import { HvBaseProps } from "@core/types";
import tableRowClasses, { HvTableRowClasses } from "./tableRowClasses";
import { forwardRef, useContext } from "react";
import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";
import { ClassNames } from "@emotion/react";
import { styles } from "./TableRow.styles";

export interface HvTableRowProps
  extends HvBaseProps<HTMLTableRowElement, "children"> {
  /** Content to be rendered */
  children: React.ReactNode;
  /** The component used for the root node. Either a string to use a HTML element or a component. Defaults to tbody. */
  component?: React.ElementType;
  /** Whether the table row will shade on hover. */
  hover?: boolean;
  /** Whether the table row will have the selected shading. */
  selected?: boolean;
  /** Whether the table row is expanded. */
  expanded?: boolean;
  /** Whether the table row background is striped. */
  striped?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTableRowClasses;
}

const defaultComponent = "tr";

/**
 * `HvTableRow` acts as a `tr` element and inherits styles from its context
 */
export const HvTableRow = forwardRef<HTMLElement, HvTableRowProps>(
  (
    {
      classes,
      className,
      component,
      hover = false,
      selected = false,
      expanded = false,
      striped = false,
      ...others
    },
    externalRef
  ) => {
    const tableContext = useContext(TableContext);
    const tableSectionContext = useContext(TableSectionContext);

    const type = tableSectionContext?.type || "body";

    const isList = tableContext.variant === "listrow";

    const Component =
      component || tableContext?.components?.Tr || defaultComponent;

    return (
      <ClassNames>
        {({ css, cx }) => (
          <Component
            ref={externalRef}
            className={cx(
              className,
              tableSectionContext.filterClassName,
              tableRowClasses.root,
              tableRowClasses[type],
              hover && cx(tableRowClasses.hover),
              selected && cx(tableRowClasses.selected),
              expanded && cx(tableRowClasses.expanded),
              striped && cx(tableRowClasses.striped),
              isList && type === "body" && cx(tableRowClasses.variantList),
              isList && type === "head" && cx(tableRowClasses.variantListHead),

              css(styles.root),
              css(styles[type]),
              hover && cx(css(styles.hover)),
              selected && cx(css(styles.selected)),
              expanded && cx(css(styles.expanded)),
              striped && cx(css(styles.striped)),
              isList && type === "body" && cx(css(styles.variantList)),
              isList && type === "head" && cx(css(styles.variantListHead)),

              classes?.root,
              classes?.[type],
              hover && cx(classes?.hover),
              selected && cx(classes?.selected),
              expanded && cx(classes?.expanded),
              striped && cx(classes?.striped),
              isList && type === "body" && cx(classes?.variantList),
              isList && type === "head" && cx(classes?.variantListHead)
            )}
            role={Component === defaultComponent ? null : "row"}
            {...others}
          />
        )}
      </ClassNames>
    );
  }
);
