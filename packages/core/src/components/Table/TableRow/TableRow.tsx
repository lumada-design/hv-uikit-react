import { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { ClassNames } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { checkValidHexColorValue, getVarValue, hexToRgbA } from "@core/utils";
import { transientOptions } from "@core/utils/transientOptions";
import { HvBaseProps } from "@core/types";
import { useTheme } from "@core/hooks";
import tableRowClasses, { HvTableRowClasses } from "./tableRowClasses";
import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";
import { styles } from "./TableRow.styles";

export interface HvTableRowProps
  extends HvBaseProps<HTMLTableRowElement, "children"> {
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
      $striped,
      $stripedColorEven,
      $stripedColorOdd,
    }: {
      $striped: boolean;
      $stripedColorEven: string;
      $stripedColorOdd: string;
    }) => ({
      ...($striped && {
        "&:nth-of-type(even)": {
          backgroundColor: $stripedColorEven,
          "&:hover": {
            backgroundColor: theme.table.rowHoverColor,
          },
        },
        "&:nth-of-type(odd)": {
          backgroundColor: $stripedColorOdd,
          "&:hover": {
            backgroundColor: theme.table.rowHoverColor,
          },
        },
      }),
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

    const [even, setEven] = useState<string | undefined>();
    const [odd, setOdd] = useState<string | undefined>();

    const type = tableSectionContext?.type || "body";

    const isList = tableContext.variant === "listrow";

    const Component =
      component || tableContext?.components?.Tr || defaultComponent;

    const TableRow = useMemo(() => StyledTableRow(Component), [Component]);

    let stripedColorEven = checkValidHexColorValue(even)
      ? hexToRgbA(even, 0.6)
      : even;

    let stripedColorOdd = checkValidHexColorValue(odd)
      ? hexToRgbA(odd, 0.6)
      : odd;

    useEffect(() => {
      setEven(getVarValue(theme.table.rowStripedBackgroundColorEven));
      setOdd(getVarValue(theme.table.rowStripedBackgroundColorOdd));
      stripedColorEven = checkValidHexColorValue(even)
        ? hexToRgbA(even, 0.6)
        : even;
      stripedColorOdd = checkValidHexColorValue(odd)
        ? hexToRgbA(odd, 0.6)
        : odd;
    }, [activeTheme?.colors?.modes[selectedMode], even, odd]);

    return (
      <ClassNames>
        {({ css, cx }) => (
          <TableRow
            ref={externalRef}
            className={cx(
              tableSectionContext.filterClassName,
              tableRowClasses.root,
              className,
              classes?.root,
              css(styles.root),
              tableRowClasses[type],
              classes?.[type],
              css(styles[type]),
              hover &&
                (tableRowClasses.hover, classes?.hover, css(styles.hover)),
              selected &&
                cx(
                  tableRowClasses.selected,
                  classes?.selected,
                  css(styles.selected)
                ),
              expanded &&
                cx(
                  tableRowClasses.expanded,
                  classes?.expanded,
                  css(styles.expanded)
                ),
              striped &&
                cx(
                  tableRowClasses.striped,
                  classes?.striped,
                  css(styles.striped)
                ),
              isList &&
                type === "body" &&
                cx(
                  tableRowClasses.variantList,
                  classes?.variantList,
                  css(styles.variantList)
                ),
              isList &&
                type === "head" &&
                cx(
                  tableRowClasses.variantListHead,
                  classes?.variantListHead,
                  css(styles.variantListHead)
                )
            )}
            role={Component === defaultComponent ? null : "row"}
            $striped={striped}
            $stripedColorEven={stripedColorEven}
            $stripedColorOdd={stripedColorOdd}
            {...others}
          />
        )}
      </ClassNames>
    );
  }
);
