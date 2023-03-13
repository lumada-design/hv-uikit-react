import { DropDownXS, DropRightXS } from "@hitachivantara/uikit-react-icons";
import { setId } from "utils";
import {
  HvOverflowTooltip,
  HvTag,
  HvTypography,
  HvButton,
  HvTableColumnConfig,
  HvRowInstance,
  HvTagProps,
  HvBaseSwitchProps,
  HvListValue,
} from "components";
import DateColumnCell from "./DateColumnCell/index";
import SwitchColumnCell from "./SwitchColumnCell";
import ProgressColumnCell from "./ProgressColumnCell";
import DropdownColumnCell from "./DropdownColumnCell";
import { hvStringFallback, hvNumberFallback } from "../utils";

export function hvTextColumn<
  D extends Record<string, unknown>,
  C extends HvTableColumnConfig<D>
>(col: C): HvTableColumnConfig<D> {
  return {
    Cell: (cellProps) => (
      <HvOverflowTooltip data={hvStringFallback(cellProps?.value)} />
    ),
    sortType: "alphanumeric",
    ...col,
  };
}

export function hvNumberColumn<
  D extends Record<string, unknown>,
  C extends HvTableColumnConfig<D>
>(col: C): HvTableColumnConfig<D> {
  return {
    Cell: ({ value }) => hvNumberFallback(value),
    align: "right",
    sortType: "number",
    ...col,
  };
}

export function hvDateColumn<
  D extends Record<string, unknown>,
  C extends HvTableColumnConfig<D>
>(col: C, dateFormat?: string): HvTableColumnConfig<D> {
  return {
    Cell: (cellProps) => (
      <DateColumnCell date={cellProps?.value} dateFormat={dateFormat} />
    ),
    sortType: "alphanumeric",
    sortDescFirst: true,
    ...col,
  };
}

export function hvExpandColumn<D extends Record<string, unknown>>(
  col: HvTableColumnConfig<D>,
  expandRowButtonAriaLabel: string,
  collapseRowButtonAriaLabel: string,
  getCanRowExpand?: (row: HvRowInstance<D>) => boolean
): HvTableColumnConfig<D> {
  return {
    Cell: (cellProps) => {
      const { value, row } = cellProps;
      const { onClick } = row.getToggleRowExpandedProps();

      const hasContent = getCanRowExpand?.(row) ?? true;

      return (
        <>
          {hasContent && (
            <HvButton
              icon
              variant="secondaryGhost"
              aria-label={
                row.isExpanded
                  ? collapseRowButtonAriaLabel
                  : expandRowButtonAriaLabel
              }
              aria-expanded={row.isExpanded}
              onClick={onClick}
              style={{ position: "absolute", left: 0, top: 0 }}
            >
              {row.isExpanded ? <DropDownXS /> : <DropRightXS />}
            </HvButton>
          )}

          <HvOverflowTooltip data={hvStringFallback(value)} />
        </>
      );
    },
    // @ts-ignore
    sortType: "alphanumeric",
    cellStyle: {
      position: "relative",
    },
    ...col,
  };
}

export function hvTagColumn<
  D extends Record<string, unknown>,
  C extends HvTableColumnConfig<D>
>(
  col: C,
  valueDataKey: keyof D,
  colorDataKey: keyof D,
  textColorDataKey: keyof D,
  // eslint-disable-next-line @typescript-eslint/default-param-last
  fromRowData: boolean = false,
  tagProps?: HvTagProps
): HvTableColumnConfig<D> {
  return {
    Cell: (cellProps) => {
      const { value, row } = cellProps;
      if (!value) {
        return "—";
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

export function hvSwitchColumn<
  D extends Record<string, unknown>,
  C extends HvTableColumnConfig<D>
>(
  col: C,
  switchLabel: string,
  falseLabel?: string,
  trueLabel?: string,
  switchProps?: HvBaseSwitchProps
): HvTableColumnConfig<D> {
  return {
    Cell: (cellProps) => {
      const { value, row } = cellProps;
      return (
        <SwitchColumnCell
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
  D extends Record<string, unknown>,
  C extends HvTableColumnConfig<D>
>(
  col: C,
  id: string,
  placeholder: string,
  disabledPlaceholder: string,
  onChange?: (identifier: string, value: HvListValue) => void
): HvTableColumnConfig<D> {
  return {
    Cell: (cellProps) => {
      const { value, row, column } = cellProps;
      const dsbld = value.length < 1;
      return (
        <DropdownColumnCell
          values={value}
          placeholder={dsbld ? disabledPlaceholder : placeholder}
          onChange={(val) => onChange?.(row.id, val)}
          disabled={dsbld}
          dropdownProps={{
            "aria-labelledby": setId(id, column.id),
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
  D extends Record<string, number>,
  C extends HvTableColumnConfig<D>
>(
  col: C,
  getPartial?: (row: HvRowInstance<D>) => number,
  getTotal?: (row: HvRowInstance<D>) => number,
  color?: "primary" | "secondary"
): HvTableColumnConfig<D> {
  return {
    Cell: (cellProps) => {
      const { row } = cellProps;
      const partial = getPartial?.(row) || 0;
      const total = getTotal?.(row);

      if (total) {
        return (
          <ProgressColumnCell partial={partial} total={total} color={color} />
        );
      }

      return "—";
    },

    cellStyle: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    ...col,
  };
}
