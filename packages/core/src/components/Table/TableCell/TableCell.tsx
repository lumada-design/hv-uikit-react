import styled from "@emotion/styled";
import { ClassNames } from "@emotion/react";
import capitalize from "lodash/capitalize";
import {
  CSSProperties,
  forwardRef,
  TdHTMLAttributes,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "@core/utils/transientOptions";
import { getVarValue, hexToRgbA } from "@core/utils";
import { useTheme } from "@core/hooks";
import {
  HvTableCellAlign,
  HvTableCellType,
  HvTableCellVariant,
} from "../Table";
import tableCellClasses, { HvTableCellClasses } from "./tableCellClasses";
import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";
import { styles } from "./TableCell.styles";
import { checkValidHexColorValue } from "../utils";

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
  $sortedColor: string;
}

const StyledTableCell = (c: any) =>
  styled(
    c,
    transientOptions
  )(({ $stickyColumn, $type, $sortedColor }: StyledTableCellProps) => ({
    ...($type === "body" && {
      [`&.${tableCellClasses.sorted}`]: {
        backgroundColor: $sortedColor,
      },
    }),
    ...($stickyColumn && {
      [`&.${tableCellClasses.sorted}`]: {
        backgroundImage: `linear-gradient(to right, ${$sortedColor}, ${$sortedColor})`,
      },
    }),
  }));

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

    const [sortedColorValue, setSortedColorValue] = useState<
      string | undefined
    >();
    const [sortedColorAlpha, setSortedColorAlpha] = useState<
      string | undefined
    >();

    const type = typeProp || tableSectionContext?.type || "body";

    const Component =
      component || tableContext?.components?.Td || defaultComponent;

    const TableCell = useMemo(() => StyledTableCell(Component), [Component]);

    let sortedColor =
      checkValidHexColorValue(sortedColorValue) && sortedColorAlpha
        ? hexToRgbA(sortedColorValue, parseFloat(sortedColorAlpha))
        : sortedColorValue;

    useEffect(() => {
      setSortedColorValue(getVarValue(theme.table.rowSortedColor));
      setSortedColorAlpha(getVarValue(theme.table.rowSortedColorAlpha));

      sortedColor =
        checkValidHexColorValue(sortedColorValue) && sortedColorAlpha
          ? hexToRgbA(sortedColorValue, parseFloat(sortedColorAlpha))
          : sortedColorValue;
    }, [
      activeTheme?.colors?.modes[selectedMode],
      sortedColorValue,
      sortedColorAlpha,
    ]);

    return (
      <ClassNames>
        {({ css, cx }) => (
          <TableCell
            ref={externalRef}
            role={Component === defaultComponent ? null : "cell"}
            style={style}
            className={cx(
              tableCellClasses.root,
              className,
              classes?.root,
              css(styles.root),
              tableCellClasses[type],
              classes?.[type],
              css(styles[type]),
              align !== "inherit" &&
                cx(
                  tableCellClasses[`align${capitalize(align)}`],
                  classes?.[`align${capitalize(align)}`],
                  css(styles[`align${capitalize(align)}`])
                ),
              tableContext.variant === "listrow" &&
                cx(
                  tableCellClasses.variantList,
                  classes?.variantList,
                  css(styles.variantList)
                ),
              tableContext.variant === "listrow" &&
                type !== "body" &&
                cx(
                  tableCellClasses.variantListHead,
                  classes?.variantListHead,
                  css(styles.variantListHead)
                ),
              variant !== "default" &&
                cx(
                  tableCellClasses[`variant${capitalize(variant)}`],
                  classes?.[`variant${capitalize(variant)}`],
                  css(styles[`variant${capitalize(variant)}`])
                ),
              sorted &&
                cx(
                  tableCellClasses.sorted,
                  classes?.sorted,
                  css(styles.sorted)
                ),
              stickyColumn &&
                cx(
                  tableCellClasses.stickyColumn,
                  classes?.stickyColumn,
                  css(styles.stickyColumn)
                ),
              stickyColumnMostLeft &&
                cx(
                  tableCellClasses.stickyColumnMostLeft,
                  classes?.stickyColumnMostLeft,
                  css(styles.stickyColumnMostLeft)
                ),
              stickyColumnLeastRight &&
                cx(
                  tableCellClasses.stickyColumnLeastRight,
                  classes?.stickyColumnLeastRight,
                  css(styles.stickyColumnLeastRight)
                ),
              groupColumnMostLeft &&
                cx(
                  tableCellClasses.groupColumnMostLeft,
                  classes?.groupColumnMostLeft,
                  css(styles.groupColumnMostLeft)
                ),
              groupColumnMostRight &&
                cx(
                  tableCellClasses.groupColumnMostRight,
                  classes?.groupColumnMostRight,
                  css(styles.groupColumnMostRight)
                ),
              resizable &&
                cx(
                  tableCellClasses.resizable,
                  classes?.resizable,
                  css(styles.resizable)
                ),
              resizing &&
                cx(
                  tableCellClasses.resizing,
                  classes?.resizing,
                  css(styles.resizing)
                )
            )}
            $type={type}
            $stickyColumn={stickyColumn}
            $sortedColor={sortedColor}
            {...others}
          >
            {children}
          </TableCell>
        )}
      </ClassNames>
    );
  }
);
