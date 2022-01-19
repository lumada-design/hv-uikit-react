/* eslint-disable react/prop-types */
import React from "react";

import { HvButton, HvTypography, useLabels } from "@hitachivantara/uikit-react-core";
import { DropDownXS, DropRightXS } from "@hitachivantara/uikit-react-icons";

export const DEFAULT_LABELS = {
  expandRowButtonAriaLabel: "Expand this row",
  collapseRowButtonAriaLabel: "Collapse this row",
};

export const CellWithExpandButton = ({ row, cell, labels: labelsProp }) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const { onClick } = row.getToggleRowExpandedProps();

  return (
    <>
      <HvButton
        icon
        category="ghost"
        aria-label={
          row.isExpanded ? labels.collapseRowButtonAriaLabel : labels.expandRowButtonAriaLabel
        }
        aria-expanded={row.isExpanded}
        onClick={onClick}
      >
        {row.isExpanded ? <DropDownXS /> : <DropRightXS />}
      </HvButton>
      {cell?.value && (
        <HvTypography variant="highlightText" component="span">
          {cell.value}
        </HvTypography>
      )}
    </>
  );
};

export const visibleColumnsHook = (columns, { instance }) => {
  if (instance.disableCreateExpandButton) {
    return columns;
  }

  // add a button to first data column, unless it has a custom renderer
  // if so, add an extra column instead
  const firstDataColumnIndex = columns.findIndex((c) => c.id?.indexOf("_hv_") !== 0);

  if (firstDataColumnIndex !== -1) {
    const firstDataColumn = columns[firstDataColumnIndex];

    if (firstDataColumn.Cell == null) {
      firstDataColumn.Cell = CellWithExpandButton;
      firstDataColumn.variant = "expand";

      return columns;
    }
  }

  const expandColumn = {
    id: "_hv_expand",
    variant: "none",

    width: 32,

    // this will only work when using useHvTableSticky
    // but ensures it stays left of any sticky column
    sticky: "left",

    Cell: CellWithExpandButton,
  };

  const columnsCopy = [...columns];
  columnsCopy.splice(firstDataColumnIndex !== -1 ? firstDataColumnIndex : 0, 0, expandColumn);

  return columnsCopy;
};

export const getRowPropsHook = (props, { row }) => {
  const nextProps = {
    expanded: row.isExpanded,
  };

  return [props, nextProps];
};

const useRowExpand = (hooks) => {
  hooks.visibleColumns.push(visibleColumnsHook);
  hooks.getRowProps.push(getRowPropsHook);
};
useRowExpand.pluginName = "useHvRowExpand";

export default useRowExpand;
