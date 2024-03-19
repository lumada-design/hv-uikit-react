import { forwardRef, useMemo, useRef } from "react";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { ExtractNames } from "../utils/classes";

import TableContext from "./TableContext";
import { staticClasses, useClasses } from "./Table.styles";

export { staticClasses as tableClasses };

export type HvTableClasses = ExtractNames<typeof useClasses>;

export type HvTableVariant = "listrow" | "default";
export type HvTableCellAlign =
  | "center"
  | "inherit"
  | "justify"
  | "left"
  | "right";
export type HvTableCellType = "body" | "footer" | "head";
export type HvTableCellVariant =
  | "checkbox"
  | "expand"
  | "actions"
  | "default"
  | "none";

export interface HvTableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `table`.
   *
   * When using non-table elements, layout is up to the developer using the component.
   */
  component?: React.ElementType;
  /** Content to be rendered */
  children: React.ReactNode;
  /** Whether the `HvTable` has a sticky header row. */
  stickyHeader?: boolean;
  /** Whether the `HvTable` has sticky columns. */
  stickyColumns?: boolean;
  /** Whether the `HvTable` has the list row styles or the default. */
  variant?: HvTableVariant;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTableClasses;
}

const defaultComponent = "table";

const computeTablePartComponents = (rootComponent: React.ElementType<any>) => {
  if (rootComponent === "table") {
    return {
      Table: "table",
      THead: "thead",
      TBody: "tbody",
      Tr: "tr",
      Th: "th",
      Td: "td",
    };
  }

  return {
    Table: rootComponent,
    THead: rootComponent,
    TBody: rootComponent,
    Tr: rootComponent,
    Th: rootComponent,
    Td: rootComponent,
  };
};

/**
 * A table gathers relational data. It displays values arranged to allow quick numerical analysis like comparison and sorting.
 *
 * The **HvTable** component offers a set of HTML-equivalent elements, **styled to Design System's specification**,
 * for building tables.
 * You can rely on these **elements** when your table doesn’t have many interactions or you need it to be very lightweight.
 *
 * For better data handling and **advanced features** we recommend the use of the utility hooks collection.
 * See the <a href="?id=guides-table-table-hooks--use-hv-hooks&viewMode=docs" target="_self">Table Hooks documentation</a> for more details.
 */
export const HvTable = forwardRef<HTMLElement, HvTableProps>((props, ref) => {
  const {
    classes: classesProp,
    className,
    component = defaultComponent,
    stickyHeader = false,
    stickyColumns = false,
    variant = "default",
    ...others
  } = useDefaultProps("HvTable", props);
  const { classes, cx } = useClasses(classesProp);

  const containerRef = useRef(ref);

  const components = useMemo(
    () => computeTablePartComponents(component),
    [component]
  );

  const tableContext = useMemo(
    () => ({ components, variant, containerRef }),
    [components, variant, containerRef]
  );

  const Table = useMemo(() => components.Table, [components]);

  return (
    <TableContext.Provider value={tableContext}>
      <Table
        ref={ref}
        role={component === defaultComponent ? null : "table"}
        className={cx(
          classes.root,
          {
            [classes.stickyHeader]: stickyHeader,
            [classes.stickyColumns]: stickyColumns,
            [classes.listRow]: variant === "listrow",
          },
          className
        )}
        {...others}
      />
    </TableContext.Provider>
  );
});
