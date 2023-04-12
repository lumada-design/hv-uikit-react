import clsx from "clsx";
import styled from "@emotion/styled";
import { hexToRgb, alpha } from "@mui/material";
import { HvBaseProps } from "~/types";
import tableRowClasses, { HvTableRowClasses } from "./tableRowClasses";
import { forwardRef, useContext, useMemo } from "react";
import TableContext from "../TableContext";
import { transientOptions } from "~/utils/transientOptions";
import TableSectionContext from "../TableSectionContext";
import { theme } from "@hitachivantara/uikit-styles";
import { getBorderStyles } from "../utils/utils";
import { useTheme } from "~/hooks";

export interface HvTableRowProps
  extends HvBaseProps<HTMLTableRowElement, { children }> {
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
      backgroundColor: theme.table.rowBackgroundColor,
      color: "inherit",
      verticalAlign: "middle",
      outline: 0,
      minHeight: 32,
      "tr&": {
        height: 32,
      },

      ":hover": {
        ...($type === "body" && {
          backgroundColor: theme.table.rowHoverColor,
        }),
      },
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
        "&:nth-of-type(even)": {
          backgroundColor: $stripedColor,
          "&:hover": {
            backgroundColor: theme.table.rowHoverColor,
          },
        },
      }),

      // type
      ...($type === "head" && {
        backgroundColor: "transparent",
        "&:first-of-type": {
          height: 52,
        },

        "tr&:first-of-type": {
          height: 52,
        },
      }),

      ...($variantList && {
        borderBottom: 0,
        ...(!$selected && {
          backgroundColor: theme.colors.atmo1,
        }),
        height: 52,
        "&:hover": {
          ...getBorderStyles("row", theme.table.rowHoverBorderColor),
        },
        [`&.${tableRowClasses.selected}`]: {
          ...getBorderStyles("row", theme.colors.secondary),

          "&:hover": {
            ...getBorderStyles("row", theme.table.rowHoverBorderColor),
          },
        },
      }),
      ...($variantListHead && {
        height: 16,
        "&:first-of-type": {
          height: 16,
        },

        "tr&:first-of-type": {
          height: 16,
        },
      }),

      "&.HvIsFocused": {
        borderRadius: theme.table.rowBorderRadius,
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
    const { activeTheme, selectedMode } = useTheme();
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
          classes?.[type],
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
