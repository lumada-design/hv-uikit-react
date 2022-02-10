import React from "react";

import {
  HvButton,
  HvTag,
  HvTypography,
  HvOverflowTooltip,
  setId,
} from "@hitachivantara/uikit-react-core";
import { DropDownXS, DropRightXS } from "@hitachivantara/uikit-react-icons";
import DateColumnCell from "./DateColumnCell";
import SwitchColumnCell from "./SwitchColumnCell";
import ProgressColumnCell from "./ProgressColumnCell";
import DropdownColumnCell from "./DropdownColumnCell";
import { hvStringFallback, hvNumberFallback } from "../utils";

export const hvTextColumn = (col) => {
  return {
    Cell: (cellProps) => <HvOverflowTooltip data={hvStringFallback(cellProps?.value)} />,
    sortType: "alphanumeric",
    ...col,
  };
};

export const hvNumberColumn = (col) => {
  return {
    Cell: ({ value }) => hvNumberFallback(value),
    align: "right",
    sortType: "number",
    ...col,
  };
};

export const hvDateColumn = (col, dateFormat) => {
  return {
    Cell: (cellProps) => <DateColumnCell date={cellProps?.value} dateFormat={dateFormat} />,
    sortType: "alphanumeric",
    sortDescFirst: true,
    ...col,
  };
};

export function hvExpandColumn(
  col,
  expandRowButtonAriaLabel,
  collapseRowButtonAriaLabel,
  getCanRowExpand
) {
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
              category="ghost"
              aria-label={row.isExpanded ? collapseRowButtonAriaLabel : expandRowButtonAriaLabel}
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
    sortType: "alphanumeric",
    cellStyle: {
      position: "relative",
    },
    ...col,
  };
}

export function hvTagColumn(
  col,
  valueDataKey,
  colorDataKey,
  textColorDataKey,
  fromRowData = false,
  tagProps
) {
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
          label={<HvTypography variant="normalText">{name}</HvTypography>}
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

export function hvSwitchColumn(col, switchLabel, falseLabel, trueLabel, switchProps) {
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

export function hvDropdownColumn(col, id, placeholder, disabledPlaceholder, onChange) {
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

export function hvProgressColumn(col, getPartial, getTotal, color) {
  return {
    Cell: (cellProps) => {
      const { row } = cellProps;
      const partial = getPartial?.(row);
      const total = getTotal?.(row);

      if (total) {
        return <ProgressColumnCell partial={partial} total={total} color={color} />;
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
