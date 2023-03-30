import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  ThHTMLAttributes,
  useContext,
  useMemo,
} from "react";
import clsx from "clsx";
import { capitalize } from "lodash";
import styled from "@emotion/styled";
import { hexToRgb, alpha } from "@mui/material";
import { theme } from "@hitachivantara/uikit-styles";
import { HvBaseProps } from "../../../types";
import { tableHeaderClasses, HvTableHeaderClasses } from ".";
import TableContext from "../TableContext";
import { transientOptions } from "utils/transientOptions";
import TableSectionContext from "../TableSectionContext";
import { getSortIcon, isParagraph } from "./utils";
import {
  StyledHeaderContent,
  StyledResizer,
  StyledButton,
  StyledTypography,
} from "./TableHeader.styles";
import {
  HvTableCellAlign,
  HvTableCellType,
  HvTableCellVariant,
} from "../Table";
import { HvTypographyProps } from "../../Typography";
import { useTheme } from "hooks";

export type HvTableHeaderProps = Omit<
  ThHTMLAttributes<HTMLTableCellElement>,
  "align"
> &
  Omit<HvBaseProps, "children"> & {
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
  };

const defaultComponent = "th";

type StyledTableHeaderProps = {
  $sorted: boolean;
  $resizable: boolean;
  $resizing: boolean;
  $groupColumnMostLeft: boolean;
  $groupColumnMostRight: boolean;
  $stickyColumn: boolean;
  $stickyColumnMostLeft: boolean;
  $stickyColumnLeastRight: boolean;
  $variantList: boolean;
  $align: string;
  $variant: string;
  $type: string;
  $atmo1Color: string;
};

const StyledTableHeader = (c: any) =>
  styled(
    c,
    transientOptions
  )(
    ({
      $sorted,
      $resizable,
      $resizing,
      $groupColumnMostLeft,
      $groupColumnMostRight,
      $stickyColumn,
      $stickyColumnMostLeft,
      $stickyColumnLeastRight,
      $variantList,
      $align,
      $variant,
      $type,
      $atmo1Color,
    }: StyledTableHeaderProps) => ({
      // root
      "--first-row-cell-height": "52px",
      "--cell-height": "32px",
      height: "var(--cell-height)",
      verticalAlign: "inherit",
      textAlign: "left",
      padding: theme.spacing([0, "xs", 0, 32]),
      borderBottom: `1px solid ${theme.colors.atmo4}`,

      ...($sorted && {
        [`& .${tableHeaderClasses.sortIcon}`]: {
          visibility: "visible",
        },
      }),
      ...($resizable && {
        borderRight: `solid 1px ${theme.colors.atmo4}`,
      }),
      ...($resizing && {
        borderRight: `solid 2px ${theme.colors.secondary}`,
      }),
      ...($groupColumnMostLeft && {
        borderLeft: `solid 1px ${theme.colors.atmo4}`,
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
        [`&+:not(.${tableHeaderClasses.stickyColumn})`]: {
          borderLeft: 0,
        },
      }),
      ...($stickyColumn && {
        position: "sticky",
        zIndex: 2,

        [`&.${tableHeaderClasses.groupColumnMostRight}+.${tableHeaderClasses.stickyColumn}`]:
          {
            borderLeft: 0,
          },
      }),
      ...($stickyColumnMostLeft && {
        borderRight: `solid 1px ${theme.colors.atmo4}`,
      }),
      ...($stickyColumnLeastRight && {
        borderLeft: `solid 1px ${theme.colors.atmo4}`,
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
      // type
      ...($type === "head" && {
        "*:first-of-type > &": {
          height: "var(--first-row-cell-height)",
          borderTop: $variantList
            ? 0
            : `1px solid ${theme.table.headerBorderTopColor}`,
        },

        paddingTop: 8,
        verticalAlign: "top",

        backgroundColor: $variantList ? "inherit" : theme.colors.atmo1,
        borderBottom: $variantList ? 0 : `1px solid ${theme.colors.atmo4}`,
        ...(theme.typography.label as CSSProperties),

        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

        [`&.${tableHeaderClasses.sortable}`]: {
          verticalAlign: "initial",
          paddingTop: 0,
          paddingLeft: 0,
          cursor: "pointer",

          "&:hover": {
            backgroundColor: theme.table.headerHoverColor,

            [`& .${tableHeaderClasses.sortIcon}`]: {
              visibility: "visible",
            },
          },
          "&:focus-within": {
            backgroundColor: theme.table.headerHoverColor,

            [`& .${tableHeaderClasses.sortIcon}`]: {
              visibility: "visible",
            },
          },
        },
      }),
      ...($type === "body" && {
        backgroundColor: "inherit",
        ...(theme.typography.body as CSSProperties),

        [`&.${tableHeaderClasses.sortable}:not(.${tableHeaderClasses.variantNone})`]:
          {
            paddingLeft: 32,
          },
        [`&.${tableHeaderClasses.sorted}`]: {
          backgroundColor: alpha(hexToRgb($atmo1Color), 0.4),
        },
      }),
      ...($variantList && {
        backgroundColor: "inherit",
        borderBottom: 0,
        height: 16,
        ":first-of-type > &": {
          borderTop: 0,
          height: 16,
        },
      }),
    })
  );

const StyledSort = (c: any) =>
  styled(c)({
    display: "inline-flex",
    visibility: "hidden",
  });

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
      classes,
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
      ...others
    },
    externalRef
  ) => {
    const { activeTheme, selectedMode } = useTheme();
    const tableContext = useContext(TableContext);
    const tableSectionContext = useContext(TableSectionContext);

    const type = typeProp || tableSectionContext?.type || "body";
    const isHeadCell = type === "head";

    const scope = scopeProp ?? isHeadCell ? "col" : "row";

    const Sort = useMemo(
      () => getSortIcon(sorted && sortDirection),
      [sorted, sortDirection]
    );

    const SortComponent = useMemo(() => StyledSort(Sort), [Sort]);

    const Component =
      component || tableContext?.components?.Th || defaultComponent;

    const role =
      Component === defaultComponent
        ? null
        : isHeadCell
        ? "columnheader"
        : "rowheader";
    const paragraph = isParagraph(children);

    const TableHeader = StyledTableHeader(Component);

    return (
      <TableHeader
        ref={externalRef}
        role={role}
        scope={scope}
        style={style}
        className={clsx(
          className,
          tableHeaderClasses.root,
          classes?.root,
          tableHeaderClasses[type],
          classes?.[type],
          groupColumnMostLeft &&
            clsx(
              tableHeaderClasses.groupColumnMostLeft,
              classes?.groupColumnMostLeft
            ),
          groupColumnMostRight &&
            clsx(
              tableHeaderClasses.groupColumnMostRight,
              classes?.groupColumnMostRight
            ),
          sortable && clsx(tableHeaderClasses.sortable, classes?.sortable),
          sorted && clsx(tableHeaderClasses.sorted, classes?.sorted),
          resizable && clsx(tableHeaderClasses.resizable, classes?.resizable),
          resizing && clsx(tableHeaderClasses.resizing, classes?.resizing),
          stickyColumn &&
            clsx(tableHeaderClasses.stickyColumn, classes?.stickyColumn),
          stickyColumnMostLeft &&
            clsx(
              tableHeaderClasses.stickyColumnMostLeft,
              classes?.stickyColumnMostLeft
            ),
          stickyColumnLeastRight &&
            clsx(
              tableHeaderClasses.stickyColumnLeastRight,
              classes?.stickyColumnLeastRight
            ),
          tableContext.variant === "listrow" &&
            clsx(tableHeaderClasses.variantList, classes?.variantList),
          align !== "inherit" &&
            clsx(
              tableHeaderClasses[`align${capitalize(align)}`],
              classes?.[`align${capitalize(align)}`]
            ),
          variant !== "default" &&
            clsx(
              tableHeaderClasses[`variant${capitalize(variant)}`],
              classes?.[`variant${capitalize(variant)}`]
            )
        )}
        aria-sort={sortable ? sortDirection : undefined}
        $sortable={sortable}
        $sorted={sorted}
        $resizable={resizable}
        $resizing={resizing}
        $groupColumnMostLeft={groupColumnMostLeft}
        $groupColumnMostRight={groupColumnMostRight}
        $stickyColumn={stickyColumn}
        $stickyColumnMostLeft={stickyColumnMostLeft}
        $stickyColumnLeastRight={stickyColumnLeastRight}
        $align={align}
        $variant={variant}
        $variantList={tableContext.variant === "listrow"}
        $type={type}
        $atmo1Color={
          activeTheme?.colors?.modes[selectedMode].atmo1 || theme.colors.atmo1
        }
        {...others}
      >
        <StyledHeaderContent
          className={clsx(
            tableHeaderClasses.headerContent,
            classes?.headerContent,
            align !== "inherit" &&
              clsx(
                tableHeaderClasses[`alignFlex${capitalize(align)}`],
                classes?.[`alignFlex${capitalize(align)}`]
              )
          )}
          $align={align}
        >
          {isHeadCell && sortable && (
            <StyledButton
              className={clsx(
                tableHeaderClasses.sortButton,
                classes?.sortButton
              )}
              icon
              variant="secondaryGhost"
              overrideIconColors={false}
            >
              <SortComponent
                className={clsx(tableHeaderClasses.sortIcon, classes?.sortIcon)}
              />
            </StyledButton>
          )}
          <StyledTypography
            component="div"
            className={clsx(
              !paragraph &&
                clsx(tableHeaderClasses.headerText, classes?.headerText),
              paragraph &&
                clsx(
                  tableHeaderClasses.headerParagraph,
                  classes?.headerParagraph
                ),
              sortable &&
                clsx(
                  tableHeaderClasses.sortableHeaderText,
                  classes?.sortableHeaderText
                )
            )}
            variant="label"
            $headerText={!paragraph}
            $headerParagraph={paragraph}
            $sortableHeaderText={sortable}
            {...headerTextProps}
          >
            {children}
          </StyledTypography>
          {resizable && (
            <StyledResizer
              {...resizerProps}
              className={clsx(tableHeaderClasses.resizer, classes?.resizer)}
            />
          )}
        </StyledHeaderContent>
      </TableHeader>
    );
  }
);
