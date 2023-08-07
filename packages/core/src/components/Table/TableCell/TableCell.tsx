import capitalize from "lodash/capitalize";

import {
  CSSProperties,
  forwardRef,
  TdHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";

import { theme } from "@hitachivantara/uikit-styles";

import { checkValidHexColorValue } from "@core/utils/checkValidHexColorValue";
import { ExtractNames } from "@core/utils/classes";
import { getVarValue } from "@core/utils/theme";
import { hexToRgbA } from "@core/utils/hexToRgbA";
import { useTheme } from "@core/hooks/useTheme";

import {
  HvTableCellAlign,
  HvTableCellType,
  HvTableCellVariant,
} from "../Table";
import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";
import { staticClasses, useClasses } from "./TableCell.styles";

export { staticClasses as tableCellClasses };

export type HvTableCellClasses = ExtractNames<typeof useClasses>;

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

const getSortedColor = (color?: string, alpha?: string) => {
  return checkValidHexColorValue(color) && alpha
    ? hexToRgbA(color, parseFloat(alpha))
    : color;
};

/**
 * `HvTableCell` acts as a `td` element and inherits styles from its context
 */
export const HvTableCell = forwardRef<HTMLElement, HvTableCellProps>(
  (props, externalRef) => {
    const {
      children,
      component,
      className,
      style,
      classes: classesProp,
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
    } = props;
    const { classes, cx, css } = useClasses(classesProp);
    const { activeTheme, rootId } = useTheme();
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

    const [sortedColor, setSortedColor] = useState(
      getSortedColor(sortedColorValue, sortedColorAlpha)
    );

    useEffect(() => {
      setSortedColorValue(getVarValue(theme.table.rowSortedColor, rootId));
      setSortedColorAlpha(getVarValue(theme.table.rowSortedColorAlpha, rootId));

      setSortedColor(getSortedColor(sortedColorValue, sortedColorAlpha));
    }, [
      activeTheme?.colors.modes.selectedMode,
      sortedColorValue,
      sortedColorAlpha,
      rootId,
    ]);

    return (
      <Component
        ref={externalRef}
        role={Component === defaultComponent ? null : "cell"}
        style={style}
        className={cx(
          classes.root,
          classes[type],
          type === "body" &&
            css({
              [`&.${staticClasses.sorted}`]: {
                backgroundColor: sortedColor,
              },
            }),
          stickyColumn &&
            css({
              [`&.${staticClasses.sorted}`]: {
                backgroundImage: `linear-gradient(to right, ${sortedColor}, ${sortedColor})`,
              },
            }),
          {
            [classes[`align${capitalize(align)}`]]: align !== "inherit",
            [classes.variantList]: tableContext.variant === "listrow",
            [classes.variantListHead]:
              tableContext.variant === "listrow" && type !== "body",
            [classes[`variant${capitalize(variant)}`]]: variant !== "default",
            [classes.sorted]: sorted,
            [classes.stickyColumn]: stickyColumn,
            [classes.stickyColumnMostLeft]: stickyColumnMostLeft,
            [classes.stickyColumnLeastRight]: stickyColumnLeastRight,
            [classes.groupColumnMostLeft]: groupColumnMostLeft,
            [classes.groupColumnMostRight]: groupColumnMostRight,
            [classes.resizable]: resizable,
            [classes.resizing]: resizing,
          },
          className
        )}
        {...others}
      >
        {children}
      </Component>
    );
  }
);
