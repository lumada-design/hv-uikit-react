import clsx from "clsx";
import styled from "@emotion/styled";
import { hexToRgb, alpha } from "@mui/material";
import { HvBaseProps } from "../../../types/index";
import { tableRowClasses, HvTableRowClasses } from ".";
import { forwardRef, useContext, useMemo } from "react";
import TableContext from "../TableContext";
import { transientOptions } from "utils/transientOptions";
import TableSectionContext from "../TableSectionContext";
import { theme } from "@hitachivantara/uikit-styles";
import { HvThemeContext } from "providers";

export type HvTableRowProps = Omit<HvBaseProps, "children"> & {
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
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvTableRowClasses;
};

const defaultComponent = "tr";

const StyledTableRow = (c: any) =>
  styled(
    c,
    transientOptions
  )(
    ({
      $hover,
      $selected,
      $expanded,
      $striped,
      $variantList,
      $variantListHead,
      $stripedColor,
      $type,
    }: {
      $hover: boolean;
      $selected: boolean;
      $expanded: boolean;
      $striped: boolean;
      $variantList: boolean;
      $variantListHead: boolean;
      $type: string;
      $stripedColor: string;
    }) => ({
      backgroundColor: theme.colors.atmo1,
      ...($type !== "head" && {
        boxShadow: `1px 1px ${theme.table.rowBorderColor}, -1px -1px ${theme.table.rowBorderColor}, -1px 1px ${theme.table.rowBorderColor}, 1px -1px ${theme.table.rowBorderColor}`,
      }),

      ...($hover && {
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "&:hover": {
          backgroundColor: theme.table.rowHoverColor,
        },
      }),
      ...($selected && {
        backgroundColor: theme.table.selectedRowBackgroundColor,
      }),
      ...($expanded && {
        "& > *[role=cell]": {
          borderBottom: "none",
        },
        [`&.${tableRowClasses.expanded}`]: {
          backgroundColor: theme.colors.atmo1,
        },
      }),
      ...($striped && {
        "&:nth-child(even)": {
          backgroundColor: $stripedColor,
          "&:hover": {
            backgroundColor: theme.table.rowHoverColor,
          },
        },
      }),

      // type
      ...($type === "head" && {
        "&:first-child": {
          height: 52,
        },

        "tr&:first-child": {
          height: 52,
        },
      }),

      ...($variantList && {
        borderBottom: 0,
        height: theme.table.listRowHeight,
        [`&.${tableRowClasses.selected}`]: {
          boxShadow: `1px 1px ${theme.colors.acce1}, -1px -1px ${theme.colors.acce1}, -1px 1px ${theme.colors.acce1}, 1px -1px ${theme.colors.acce1}`,

          "&:hover": {
            boxShadow: `1px 1px ${theme.table.rowHoverBorderColor}, -1px -1px ${theme.table.rowHoverBorderColor}, -1px 1px ${theme.table.rowHoverBorderColor}, 1px -1px ${theme.table.rowHoverBorderColor}`,
            background: "theme.colors.atmo1",
          },
        },

        "&:hover": {
          boxShadow: `1px 1px ${theme.table.rowHoverBorderColor}, -1px -1px ${theme.table.rowHoverBorderColor}, -1px 1px ${theme.table.rowHoverBorderColor}, 1px -1px ${theme.table.rowHoverBorderColor}`,
          background: theme.colors.atmo1,
        },
      }),
      ...($variantListHead && {
        backgroundColor: "transparent",
        height: 16,
        "&:first-child": {
          height: 16,
        },

        "tr&:first-child": {
          height: 16,
        },
      }),
      "& td": {
        maxHeight: theme.table.listRowHeight,
      },
    })
  );

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
    const { activeTheme, selectedMode } = useContext(HvThemeContext);
    const tableContext = useContext(TableContext);
    const tableSectionContext = useContext(TableSectionContext);

    const type = tableSectionContext?.type || "body";

    const isList = tableContext.variant === "listrow";

    const Component =
      component || tableContext?.components?.Tr || defaultComponent;

    const TableRow = useMemo(() => StyledTableRow(Component), [Component]);

    return (
      <TableRow
        ref={externalRef}
        className={clsx(
          className,
          tableSectionContext.filterClassName,
          tableRowClasses.root,
          classes?.root,
          tableRowClasses[type],
          classes && classes[type],

          hover && clsx(tableRowClasses.hover, classes?.hover),
          selected && clsx(tableRowClasses.selected, classes?.selected),
          expanded && clsx(tableRowClasses.expanded, classes?.expanded),
          striped && clsx(tableRowClasses.striped, classes?.striped),
          isList &&
            type === "body" &&
            clsx(tableRowClasses.variantList, classes?.variantList),
          isList &&
            type === "head" &&
            clsx(tableRowClasses.variantListHead, classes?.variantListHead)
        )}
        role={Component === defaultComponent ? null : "row"}
        $hover={hover}
        $selected={selected}
        $expanded={expanded}
        $striped={striped}
        $variantList={isList && type === "body"}
        $variantListHead={isList && type === "head"}
        $type={type}
        $stripedColor={alpha(
          hexToRgb(
            activeTheme?.colors?.modes[selectedMode].atmo1 || theme.colors.atmo1
          ),
          0.6
        )}
        {...others}
      />
    );
  }
);
