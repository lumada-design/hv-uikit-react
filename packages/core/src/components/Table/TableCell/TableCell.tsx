import clsx from "clsx";
import styled from "@emotion/styled";
import tableCellClasses, { HvTableCellClasses } from "./tableCellClasses";
import {
  CSSProperties,
  forwardRef,
  TdHTMLAttributes,
  useContext,
  useMemo,
} from "react";
import { hexToRgb, alpha } from "@mui/material";
import {
  HvTableCellAlign,
  HvTableCellType,
  HvTableCellVariant,
} from "../Table";
import TableContext from "../TableContext";
import { transientOptions } from "~/utils/transientOptions";
import TableSectionContext from "../TableSectionContext";
import capitalize from "lodash/capitalize";
import { theme } from "@hitachivantara/uikit-styles";
import { getBorderStyles } from "../utils/utils";
import { useTheme } from "~/hooks";

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

interface StyledTableCellProps {
  $variantList: boolean;
  $variantListHead: boolean;
  $stickyColumn: boolean;
  $stickyColumnMostLeft: boolean;
  $stickyColumnLeastRight: boolean;
  $groupColumnMostLeft: boolean;
  $groupColumnMostRight: boolean;
  $resizable: boolean;
  $resizing: boolean;
  $align: string;
  $variant: string;
  $type: string;
  $atmo1Color: string;
}

const StyledTableCell = (c: any) =>
  styled(
    c,
    transientOptions
  )(
    ({
      $variantList,
      $variantListHead,
      $stickyColumn,
      $stickyColumnMostLeft,
      $stickyColumnLeastRight,
      $groupColumnMostLeft,
      $groupColumnMostRight,
      $resizable,
      $resizing,
      $align,
      $variant,
      $type,
      $atmo1Color,
    }: StyledTableCellProps) => ({
      // root
      verticalAlign: "inherit",
      textAlign: "left",
      paddingTop: theme.space.xs,
      paddingRight: theme.space.xs,
      paddingBottom: theme.space.xs,
      paddingLeft: theme.spacing(4),
      borderBottom: `1px solid ${theme.colors.atmo4}`,

      ...($resizable && {
        borderRight: `solid 1px ${theme.colors.atmo4}`,
      }),
      ...($resizing && {
        borderRight: `solid 2px ${theme.colors.secondary}`,
      }),

      ...($groupColumnMostLeft && {
        borderLeft: `solid 1px ${theme.colors.atmo4}`,

        "&:first-of-type": {
          borderLeft: 0,
        },
      }),
      ...($groupColumnMostRight && {
        borderRight: `solid 1px ${theme.colors.atmo4}`,

        // due to the ":has()" selector not being supported in browsers,
        // this need to be managed with inline styles
        // To be uncommented when not needed (see comment in src/Table/hooks/useSticky.js)
        // "&:last-child,&:has(+ $stickyColumnLeastRight)": {
        "&:last-child": {
          borderRight: 0,
        },

        [`&+:not(.${tableCellClasses.stickyColumn})`]: {
          borderLeft: 0,
        },
      }),

      // align
      ...($align === "center" && {
        textAlign: "center",
      }),
      ...($align === "justify" && {
        textAlign: "justify",
      }),
      ...($align === "left" && {
        textAlign: "left",
      }),
      ...($align === "right" && {
        textAlign: "right",
        flexDirection: "row-reverse",
      }),

      // variant
      ...($variant === "checkbox" && {
        padding: 0,
        width: 32,
        maxWidth: 32,
        overflow: "hidden",
        borderRight: `solid 1px ${theme.colors.atmo4}`,
      }),
      ...($variant === "actions" && {
        padding: 0,
        width: 32,
        maxWidth: 32,
        borderLeft: `solid 1px ${theme.colors.atmo4}`,
      }),
      ...($variant === "none" && {
        padding: 0,
      }),
      ...($variant === "expand" && {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }),
      ...($variant === "listcheckbox" && {
        borderRight: `solid 2px ${theme.colors.atmo2}`,
        padding: 0,
        textAlign: "center",
        width: 34,
        maxWidth: 34,
      }),
      ...($variant === "listactions" && {
        borderLeft: `solid 2px red`, //${theme.colors.atmo2}`,
        textAlign: "center",
        width: 138,
        maxWidth: 138,
      }),

      // type
      ...($type === "head" && {
        height: 52,
        verticalAlign: "top",

        backgroundColor: $variantList ? "inherit" : theme.colors.atmo1,
        borderTop: $variantList
          ? 0
          : `1px solid ${theme.table.headerBorderTopColor}`,
        borderBottom: $variantList ? 0 : `1px solid ${theme.colors.atmo4}`,
        ...(theme.typography.label as CSSProperties),
      }),
      ...($type === "body" && {
        minHeight: 32,
        "td&": {
          height: 32,
        },
        backgroundColor: "inherit",
        ...(theme.typography.body as CSSProperties),
        fontFamily: theme.fontFamily.body,

        [`&.${tableCellClasses.sorted}`]: {
          backgroundColor: alpha(hexToRgb($atmo1Color), 0.4),
        },
      }),
      ...($variantList && {
        minHeight: 52,
        "td&": {
          height: 52,
        },
        paddingTop: 0,
        paddingBottom: 0,
        ...($variant !== "listactions" && { paddingRight: 0 }),
        ...($variant === "listactions" && { paddingRight: theme.space.xs }),
        ...($variant !== "listactions" && { paddingLeft: 32 }),
        ...($variant === "listactions" && { paddingLeft: 0 }),
        border: 0,
        ...($type === "body" && {
          ...getBorderStyles("cell", theme.table.rowBorderColor),
        }),
      }),

      ...($stickyColumn && {
        position: "sticky",
        zIndex: 2,
        backgroundColor: theme.colors.atmo2,

        [`&.${tableCellClasses.groupColumnMostRight}+.${tableCellClasses.stickyColumn}`]:
          {
            borderLeft: 0,
          },

        [`&.${tableCellClasses.sorted}`]: {
          backgroundColor: theme.colors.atmo2,
          backgroundImage: `linear-gradient(to right, ${alpha(
            hexToRgb($atmo1Color),
            0.4
          )}, ${alpha(hexToRgb($atmo1Color), 0.4)})`,
        },
      }),
      ...($stickyColumnMostLeft && {
        borderRight: `solid 1px ${theme.colors.atmo4}`,
      }),
      ...($stickyColumnLeastRight && {
        borderLeft: `solid 1px ${theme.colors.atmo4}`,
      }),

      ...($variantListHead && {
        backgroundColor: "inherit",
        "td&": {
          height: 16,
        },
      }),
    })
  );

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
    const { activeTheme, selectedMode } = useTheme();
    const tableContext = useContext(TableContext);
    const tableSectionContext = useContext(TableSectionContext);

    const type = typeProp || tableSectionContext?.type || "body";

    const Component =
      component || tableContext?.components?.Td || defaultComponent;

    const TableCell = useMemo(() => StyledTableCell(Component), [Component]);

    return (
      <TableCell
        ref={externalRef}
        role={Component === defaultComponent ? null : "cell"}
        style={style}
        className={clsx(
          className,
          tableCellClasses.root,
          classes?.root,
          tableCellClasses[type],
          classes?.[type],
          align !== "inherit" &&
            clsx(
              tableCellClasses[`align${capitalize(align)}`],
              classes?.[`align${capitalize(align)}`]
            ),
          variant !== "default" &&
            clsx(
              tableCellClasses[`variant${capitalize(variant)}`],
              classes?.[`variant${capitalize(variant)}`]
            ),
          tableContext.variant === "listrow" &&
            clsx(tableCellClasses.variantList, classes?.variantList),
          tableContext.variant === "listrow" &&
            type !== "body" &&
            clsx(tableCellClasses.variantListHead, classes?.variantListHead),
          sorted && clsx(tableCellClasses.sorted, classes?.sorted),
          stickyColumn &&
            clsx(tableCellClasses.stickyColumn, classes?.stickyColumn),
          stickyColumnMostLeft &&
            clsx(
              tableCellClasses.stickyColumnMostLeft,
              classes?.stickyColumnMostLeft
            ),
          stickyColumnLeastRight &&
            clsx(
              tableCellClasses.stickyColumnLeastRight,
              classes?.stickyColumnLeastRight
            ),
          groupColumnMostLeft &&
            clsx(
              tableCellClasses.groupColumnMostLeft,
              classes?.groupColumnMostLeft
            ),
          groupColumnMostRight &&
            clsx(
              tableCellClasses.groupColumnMostRight,
              classes?.groupColumnMostRight
            ),
          resizable && clsx(tableCellClasses.resizable, classes?.resizable),
          resizing && clsx(tableCellClasses.resizing, classes?.resizing)
        )}
        $variantList={tableContext.variant === "listrow"}
        $variantListHead={tableContext.variant === "listrow" && type !== "body"}
        $sorted={sorted}
        $stickyColumn={stickyColumn}
        $stickyColumnMostLeft={stickyColumnMostLeft}
        $stickyColumnLeastRight={stickyColumnLeastRight}
        $groupColumnMostLeft={groupColumnMostLeft}
        $groupColumnMostRight={groupColumnMostRight}
        $resizable={resizable}
        $resizing={resizing}
        $align={align}
        $variant={variant}
        $type={type}
        $atmo1Color={
          activeTheme?.colors?.modes[selectedMode].atmo1 || theme.colors.atmo1
        }
        {...others}
      >
        {children}
      </TableCell>
    );
  }
);
