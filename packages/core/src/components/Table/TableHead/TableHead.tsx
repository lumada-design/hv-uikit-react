import clsx from "clsx";
import styled from "@emotion/styled";
import { HvBaseProps } from "../../../types";
import { tableHeadClasses, HvTableHeadClasses } from ".";
import { forwardRef, useContext, useMemo } from "react";
import TableContext from "../TableContext";
import { transientOptions } from "utils/transientOptions";
import TableSectionContext from "../TableSectionContext";

export type HvTableHeadProps = Omit<HvBaseProps, "children"> & {
  /**
   * Content to be rendered
   */
  children: React.ReactNode;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to thead.
   */
  component?: React.ElementType;
  /**
   * The table has sticky headers.
   */
  stickyHeader?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTableHeadClasses;
};

const tableSectionContext = {
  type: "head",
};

const defaultComponent = "thead";

const StyledTableHead = (c: any) =>
  styled(
    c,
    transientOptions
  )(({ $stickyHeader }: { $stickyHeader: boolean }) => ({
    ...($stickyHeader && {
      position: "sticky",
      zIndex: 3,
      top: 0,
    }),
  }));

/**
 * HvTableHead acts as a `thead` element.
 * `HvTableCell` and `HvTableRow` elements in it inherit header-specific styles
 */
export const HvTableHead = forwardRef<HTMLElement, HvTableHeadProps>(
  ({ classes, className, component, stickyHeader, ...others }, externalRef) => {
    const tableContext = useContext(TableContext);

    const Component =
      component || tableContext?.components?.THead || defaultComponent;

    const TableHead = useMemo(() => StyledTableHead(Component), [Component]);

    return (
      <TableSectionContext.Provider value={tableSectionContext}>
        <TableHead
          className={clsx(
            tableHeadClasses.root,
            classes?.root,
            className,
            stickyHeader &&
              clsx(classes?.stickyHeader, tableHeadClasses.stickyHeader)
          )}
          ref={externalRef}
          role={Component === defaultComponent ? null : "rowgroup"}
          $stickyHeader={stickyHeader}
          {...others}
        />
      </TableSectionContext.Provider>
    );
  }
);
