import { ClassNames } from "@emotion/react";

import { DropDownXS, DropUpXS } from "@hitachivantara/uikit-react-icons";

import { setId } from "../../utils/setId";
import { HvTag, HvTagProps } from "../../Tag";
import { HvButton } from "../../Button";
import { HvTypography } from "../../Typography";
import {
  HvOverflowTooltip,
  HvOverflowTooltipProps,
} from "../../OverflowTooltip";
import { HvBaseSwitchProps } from "../../BaseSwitch";
import { HvListValue } from "../../List";

import {
  HvTableHeaderRenderer,
  HvCellProps,
  HvTableColumnConfig,
  HvRowInstance,
} from "../hooks/useTable";
import { HvDateColumnCell } from "./DateColumnCell";
import { HvSwitchColumnCell } from "./SwitchColumnCell";
import { HvProgressColumnCell } from "./ProgressColumnCell";
import { HvDropdownColumnCell } from "./DropdownColumnCell";
import { hvStringFallback, hvNumberFallback } from "../utils";

export function hvTextColumn<
  D extends object = Record<string, unknown>,
  H extends HvTableHeaderRenderer | undefined = HvTableHeaderRenderer
>(
  col: HvTableColumnConfig<D, H>,
  overflowTooltipProps: Omit<HvOverflowTooltipProps, "data"> = {}
): HvTableColumnConfig<D, H> {
  return {
    Cell: ({ value }: HvCellProps<D, H>) => (
      <HvOverflowTooltip
        data={hvStringFallback(value)}
        {...overflowTooltipProps}
      />
    ),
    sortType: "alphanumeric",
    ...col,
  };
}

export function hvNumberColumn<
  D extends object = Record<string, unknown>,
  H extends HvTableHeaderRenderer | undefined = HvTableHeaderRenderer
>(col: HvTableColumnConfig<D, H>): HvTableColumnConfig<D, H> {
  return {
    Cell: ({ value }: HvCellProps<D, H>) => <>{hvNumberFallback(value)}</>,
    align: "right",
    sortType: "number",
    ...col,
  };
}

export function hvDateColumn<
  D extends object = Record<string, unknown>,
  H extends HvTableHeaderRenderer | undefined = HvTableHeaderRenderer
>(
  col: HvTableColumnConfig<D, H>,
  dateFormat?: string
): HvTableColumnConfig<D, H> {
  return {
    Cell: ({ value }: HvCellProps<D, H>) => (
      <HvDateColumnCell date={value} dateFormat={dateFormat} />
    ),
    sortType: "alphanumeric",
    sortDescFirst: true,
    ...col,
  };
}

export function hvExpandColumn<
  D extends object = Record<string, unknown>,
  H extends HvTableHeaderRenderer | undefined = HvTableHeaderRenderer
>(
  col: HvTableColumnConfig<D, H>,
  expandRowButtonAriaLabel: string,
  collapseRowButtonAriaLabel: string,
  getCanRowExpand?: (row: HvRowInstance<D, H>) => boolean,
  ExpandedIcon: React.ReactNode = <DropUpXS />,
  CollapsedIcon: React.ReactNode = <DropDownXS />
): HvTableColumnConfig<D, H> {
  return {
    Cell: (cellProps: HvCellProps<D, H>) => {
      const { value, row } = cellProps;
      const expandedProps = row.getToggleRowExpandedProps?.();

      const hasContent = getCanRowExpand?.(row) ?? true;

      return (
        <ClassNames>
          {({ css }) => (
            <>
              {hasContent && (
                <HvButton
                  icon
                  aria-label={
                    row.isExpanded
                      ? collapseRowButtonAriaLabel
                      : expandRowButtonAriaLabel
                  }
                  aria-expanded={row.isExpanded}
                  onClick={expandedProps?.onClick}
                  classes={{
                    root: css({
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }),
                  }}
                >
                  {row.isExpanded ? ExpandedIcon : CollapsedIcon}
                </HvButton>
              )}

              <HvOverflowTooltip data={hvStringFallback(value)} />
            </>
          )}
        </ClassNames>
      );
    },
    sortType: "alphanumeric",
    cellStyle: {
      position: "relative",
    },
    ...col,
  };
}

export function hvTagColumn<
  D extends object = Record<string, unknown>,
  H extends HvTableHeaderRenderer | undefined = HvTableHeaderRenderer,
  A extends object = Record<string, unknown>
>(
  col: HvTableColumnConfig<D, H>,
  valueDataKey: keyof A,
  colorDataKey: keyof A,
  textColorDataKey: keyof A,
  fromRowData: boolean = false,
  tagProps?: HvTagProps
): HvTableColumnConfig<D, H> {
  return {
    Cell: (cellProps: HvCellProps<D, H>) => {
      const { value, row } = cellProps;
      if (!value) {
        return <>—</>;
      }

      const {
        [valueDataKey]: name,
        [colorDataKey]: color,
        [textColorDataKey]: textColor,
      } = fromRowData ? row.original : value;

      return (
        <HvTag
          label={<HvTypography variant="body">{name}</HvTypography>}
          type="semantic"
          color={color}
          style={textColor != null ? { color: textColor } : {}}
          tabIndex={-1}
          {...tagProps}
        />
      );
    },
    cellStyle: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    ...col,
  };
}

// TODO - Review accessibility on the next renderers because they all differ

export function hvSwitchColumn<
  D extends object = Record<string, unknown>,
  H extends HvTableHeaderRenderer | undefined = HvTableHeaderRenderer
>(
  col: HvTableColumnConfig<D, H>,
  switchLabel: string,
  falseLabel?: string,
  trueLabel?: string,
  switchProps?: HvBaseSwitchProps
): HvTableColumnConfig<D, H> {
  return {
    Cell: (cellProps: HvCellProps<D, H>) => {
      const { value, row } = cellProps;
      return (
        <HvSwitchColumnCell
          checked={value}
          value={row.id}
          switchLabel={switchLabel}
          falseLabel={falseLabel}
          trueLabel={trueLabel}
          switchProps={switchProps}
        />
      );
    },
    cellStyle: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    ...col,
  };
}

export function hvDropdownColumn<
  D extends object = Record<string, unknown>,
  H extends HvTableHeaderRenderer | undefined = HvTableHeaderRenderer
>(
  col: HvTableColumnConfig<D, H>,
  id: string | undefined,
  placeholder: string,
  disabledPlaceholder: string,
  onChange?: (identifier: string, value: HvListValue) => void
): HvTableColumnConfig<D, H> {
  return {
    Cell: (cellProps: HvCellProps<D, H>) => {
      const { value, row, column } = cellProps;
      const dsbld = value.length < 1;
      return (
        <HvDropdownColumnCell
          values={value}
          placeholder={dsbld ? disabledPlaceholder : placeholder}
          onChange={(val) => onChange?.(row.id, val)}
          disabled={dsbld}
          dropdownProps={{
            "aria-labelledby": setId(id, column.id) || column.id || id, // TODO - to be reviewed because it doesn't make much sense
          }}
        />
      );
    },
    cellStyle: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    ...col,
  };
}

export function hvProgressColumn<
  D extends object = Record<string, unknown>,
  H extends HvTableHeaderRenderer | undefined = HvTableHeaderRenderer
>(
  col: HvTableColumnConfig<D, H>,
  getPartial?: (row: HvRowInstance<D, H>) => number,
  getTotal?: (row: HvRowInstance<D, H>) => number,
  color?: "primary" | "secondary"
): HvTableColumnConfig<D, H> {
  return {
    Cell: (cellProps: HvCellProps<D, H>) => {
      const { row, column } = cellProps;
      const partial = getPartial?.(row) || 0;
      const total = getTotal?.(row);

      if (total) {
        return (
          <HvProgressColumnCell
            partial={partial}
            total={total}
            color={color}
            aria-labelledby={column.id}
          />
        );
      }

      return <>—</>;
    },

    cellStyle: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    ...col,
  };
}
