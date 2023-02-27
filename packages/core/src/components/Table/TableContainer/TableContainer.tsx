import clsx from "clsx";
import styled from "@emotion/styled";
import { HvBaseProps } from "../../../types";
import { tableContainerClasses, HvTableContainerClasses } from ".";
import { forwardRef, useMemo } from "react";

export type HvTableContainerProps = Omit<HvBaseProps, "children"> & {
  /**
   * Content to be rendered
   */
  children: React.ReactNode;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to tbody.
   */
  component?: React.ElementType;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTableContainerClasses;
};

const StyledTableContainer = (c: any) =>
  styled(c)({
    width: "100%",
    overflow: "auto",
    // extra padding to avoid cutting focus rings in the last line
    paddingBottom: 3,
  });

/**
 * HvTableContainer is a container for the HvTable
 */
export const HvTableContainer = forwardRef<HTMLElement, HvTableContainerProps>(
  ({ classes, className, component, ...others }, externalRef) => {
    const Component = component || "div";

    const TableContainer = useMemo(
      () => StyledTableContainer(Component),
      [Component]
    );

    return (
      <TableContainer
        ref={externalRef}
        className={clsx(tableContainerClasses.root, classes?.root, className)}
        {...others}
      />
    );
  }
);
