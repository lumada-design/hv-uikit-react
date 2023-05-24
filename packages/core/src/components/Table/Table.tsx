import { clsx } from "clsx";
import styled from "@emotion/styled";
import {
  CSSProperties,
  forwardRef,
  TableHTMLAttributes,
  useMemo,
  useRef,
} from "react";
import { transientOptions } from "@core/utils/transientOptions";
import { theme } from "@hitachivantara/uikit-styles";
import TableContext from "./TableContext";
import tableClasses, { HvTableClasses } from "./tableClasses";

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

export interface HvTableProps extends TableHTMLAttributes<HTMLTableElement> {
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

const computeTablePartComponents = (rootComponent) => {
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

const StyledTable = (c: any) =>
  styled(
    c,
    transientOptions
  )(
    ({
      $stickyHeader,
      $stickyColumns,
      $listrow,
    }: {
      $stickyHeader: boolean;
      $stickyColumns: boolean;
      $listrow: boolean;
    }) => ({
      position: "relative",
      width: "100%",

      ...(theme.typography.body as CSSProperties),

      "table&": {
        borderSpacing: 0,
      },

      "& caption": {
        ...(theme.typography.body as CSSProperties),
        padding: theme.space.xs,
        textAlign: "left",
        captionSide: "bottom",
      },

      ...($stickyHeader && {}),
      ...($stickyColumns && {
        backgroundColor: theme.colors.atmo2,
      }),
      ...($listrow && {
        "table&": {
          borderSpacing: `0 ${theme.space.xs}`,
        },
      }),
    })
  );

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
export const HvTable = forwardRef<HTMLElement, HvTableProps>(
  (
    {
      classes,
      className,
      component = defaultComponent,
      stickyHeader = false,
      stickyColumns = false,
      variant = "default",
      ...others
    },
    ref
  ) => {
    const containerRef = useRef(ref);

    const components = useMemo(
      () => computeTablePartComponents(component),
      [component]
    );

    const tableContext = useMemo(
      () => ({ components, variant, containerRef }),
      [components, variant, containerRef]
    );

    const Table = useMemo(() => StyledTable(components.Table), [components]);

    return (
      <TableContext.Provider value={tableContext}>
        <Table
          ref={ref}
          role={component === defaultComponent ? null : "table"}
          className={clsx(
            tableClasses.root,
            classes?.root,
            stickyHeader &&
              clsx(tableClasses.stickyHeader, classes?.stickyHeader),
            stickyColumns &&
              clsx(tableClasses.stickyColumns, classes?.stickyColumns),
            variant === "listrow" &&
              clsx(tableClasses.listRow, classes?.listRow),
            className
          )}
          $stickyColumns={stickyColumns}
          $stickyHeader={stickyHeader}
          $listrow={variant === "listrow"}
          {...others}
        />
      </TableContext.Provider>
    );
  }
);
