import { forwardRef, useContext, useEffect, useState } from "react";

import { theme } from "@hitachivantara/uikit-styles";

import { ExtractNames } from "@core/utils/classes";
import { checkValidHexColorValue } from "@core/utils/checkValidHexColorValue";
import { hexToRgbA } from "@core/utils/hexToRgbA";
import { getVarValue } from "@core/utils/theme";
import { HvBaseProps } from "@core/types/generic";
import { useTheme } from "@core/hooks/useTheme";

import { useDefaultProps } from "@core/hooks";
import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";
import { staticClasses, useClasses } from "./TableRow.styles";

export { staticClasses as tableRowClasses };

export type HvTableRowClasses = ExtractNames<typeof useClasses>;

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

const getStripedColor = (color?: string, opacity: number = 0.6) => {
  return checkValidHexColorValue(color) ? hexToRgbA(color, opacity) : color;
};

/**
 * `HvTableRow` acts as a `tr` element and inherits styles from its context
 */
export const HvTableRow = forwardRef<HTMLElement, HvTableRowProps>(
  (props, externalRef) => {
    const {
      classes: classesProp,
      className,
      component,
      hover = false,
      selected = false,
      expanded = false,
      striped = false,
      ...others
    } = useDefaultProps("HvTableRow", props);
    const { classes, cx, css } = useClasses(classesProp);
    const { colors, rootId } = useTheme();
    const tableContext = useContext(TableContext);
    const tableSectionContext = useContext(TableSectionContext);

    const [even, setEven] = useState<string | undefined>();
    const [odd, setOdd] = useState<string | undefined>();

    const type = tableSectionContext?.type || "body";

    const isList = tableContext.variant === "listrow";

    const Component =
      component || tableContext?.components?.Tr || defaultComponent;

    const [stripedColorEven, setStripedColorEven] = useState(
      getStripedColor(even)
    );
    const [stripedColorOdd, setStripedColorOdd] = useState(
      getStripedColor(odd)
    );

    useEffect(() => {
      setEven(getVarValue(theme.table.rowStripedBackgroundColorEven, rootId));
      setOdd(getVarValue(theme.table.rowStripedBackgroundColorOdd, rootId));

      setStripedColorEven(getStripedColor(even));
      setStripedColorOdd(getStripedColor(odd));
    }, [colors, even, odd, rootId]);

    return (
      <Component
        ref={externalRef}
        className={cx(
          tableSectionContext.filterClassName,
          classes.root,
          classes[type],
          striped &&
            css({
              "&:nth-of-type(even)": {
                backgroundColor: stripedColorEven,
              },
              "&:nth-of-type(odd)": {
                backgroundColor: stripedColorOdd,
              },
            }),
          {
            [classes.hover]: hover,
            [classes.selected]: selected,
            [classes.expanded]: expanded,
            [classes.striped]: striped,
            [classes.variantList]: isList && type === "body",
            [classes.variantListHead]: isList && type === "head",
          },
          className
        )}
        role={Component === defaultComponent ? null : "row"}
        {...others}
      />
    );
  }
);
