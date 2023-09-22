import {
  forwardRef,
  HTMLAttributes,
  ThHTMLAttributes,
  useContext,
  useMemo,
} from "react";

import capitalize from "lodash/capitalize";

import { hexToRgb, alpha } from "@mui/material";

import { theme } from "@hitachivantara/uikit-styles";

import { HvTypography, HvTypographyProps } from "@core/components/Typography";
import { useTheme } from "@core/hooks/useTheme";
import { ExtractNames } from "@core/utils/classes";
import { HvButton, HvButtonProps } from "@core/components/Button";

import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";
import { getSortIcon, isParagraph } from "./utils";
import { useClasses, staticClasses } from "./TableHeader.styles";
import {
  HvTableCellAlign,
  HvTableCellType,
  HvTableCellVariant,
} from "../Table";

export { staticClasses as tableHeaderClasses };

export type HvTableHeaderClasses = ExtractNames<typeof useClasses>;

export interface HvTableHeaderProps
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  /** The component used for the root node. Either a string to use a HTML element or a component. Defaults to th. */
  component?: React.ElementType;
  /** Content to be rendered */
  children?: React.ReactNode;
  /** The scope of cells that the header element relates to. */
  scope?: "col" | "row" | "colgroup" | "rowgroup";
  /** Set the text-align on the table cell content. */
  align?: HvTableCellAlign;
  /** Sets the cell's variant. */
  variant?: HvTableCellVariant;
  /** Specify the cell type. The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components. */
  type?: HvTableCellType;
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
  /** Whether or not the cell is sorted */
  sorted?: boolean;
  /** Whether or not the cell is sortable */
  sortable?: boolean;
  /** Set sort direction icon and aria-sort. */
  sortDirection?: "ascending" | "descending" | false;
  /** Extra props to be passed onto the text in the header. */
  headerTextProps?: HvTypographyProps;
  /** Whether or not the cell is resizable */
  resizable?: boolean;
  /** Whether or not the cell is being resized */
  resizing?: boolean;
  /** The resize props injected in the resize handler */
  resizerProps?: HTMLAttributes<HTMLDivElement>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTableHeaderClasses;
  /** Extra props to be passed onto the sort button in the header. */
  sortButtonProps?: HvButtonProps;
}

const defaultComponent = "th";

/**
 * `HvTableHeader` acts as a `th` element and inherits styles from its context
 */
export const HvTableHeader = forwardRef<HTMLElement, HvTableHeaderProps>(
  (
    {
      children,
      component,
      className,
      style,
      classes: classesProp,
      scope: scopeProp,
      align = "inherit",
      variant = "default",
      type: typeProp,
      stickyColumn = false,
      stickyColumnMostLeft = false,
      stickyColumnLeastRight = false,
      groupColumnMostLeft = false,
      groupColumnMostRight = false,
      sortDirection = "none",
      sorted,
      sortable,
      headerTextProps,
      resizerProps = {},
      resizable = false,
      resizing = false,
      sortButtonProps,
      ...others
    },
    externalRef
  ) => {
    const { classes, cx, css } = useClasses(classesProp);

    const { colors } = useTheme();
    const tableContext = useContext(TableContext);
    const tableSectionContext = useContext(TableSectionContext);

    const type = typeProp || tableSectionContext?.type || "body";
    const isHeadCell = type === "head";

    const scope = scopeProp ?? (isHeadCell ? "col" : "row");

    const Sort = useMemo(
      () => getSortIcon(sorted && sortDirection),
      [sorted, sortDirection]
    );

    const Component =
      component || tableContext?.components?.Th || defaultComponent;

    const role =
      Component === defaultComponent
        ? null
        : isHeadCell
        ? "columnheader"
        : "rowheader";
    const paragraph = isParagraph(children);

    return (
      <Component
        ref={externalRef}
        role={role}
        scope={scope}
        style={style}
        className={cx(
          classes.root,
          classes[type],
          type === "body" &&
            css({
              [`&.${staticClasses.sorted}`]: {
                backgroundColor: alpha(
                  hexToRgb(colors?.atmo1 || theme.colors.atmo1),
                  0.4
                ),
              },
            }),
          {
            [classes.groupColumnMostLeft]: groupColumnMostLeft,
            [classes.groupColumnMostRight]: groupColumnMostRight,
            [classes.sortable]: sortable,
            [classes.sorted]: sorted,
            [classes.resizable]: resizable,
            [classes.resizing]: resizing,
            [classes.stickyColumn]: stickyColumn,
            [classes.stickyColumnMostLeft]: stickyColumnMostLeft,
            [classes.stickyColumnLeastRight]: stickyColumnLeastRight,
            [classes.variantList]: tableContext.variant === "listrow",
            [classes[`align${capitalize(align)}`]]: align !== "inherit",
            [classes[`variant${capitalize(variant)}`]]: variant !== "default",
          },
          className
        )}
        aria-sort={sortable ? sortDirection : undefined}
        {...others}
      >
        <div
          className={cx(classes.headerContent, {
            [classes[`alignFlex${capitalize(align)}`]]: align !== "inherit",
          })}
        >
          {isHeadCell && sortable && (
            <HvButton
              className={classes.sortButton}
              icon
              overrideIconColors={false}
              aria-label="Sort"
              {...sortButtonProps}
            >
              <Sort className={classes.sortIcon} />
            </HvButton>
          )}
          <HvTypography
            component="div"
            className={cx({
              [classes.headerText]: !paragraph,
              [classes.headerParagraph]: paragraph,
              [classes.sortableHeaderText]: sortable,
            })}
            variant="label"
            {...headerTextProps}
          >
            {children}
          </HvTypography>
          {resizable && <div {...resizerProps} className={classes.resizer} />}
        </div>
      </Component>
    );
  }
);
