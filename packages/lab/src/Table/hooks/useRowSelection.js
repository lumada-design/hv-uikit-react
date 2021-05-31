/* eslint-disable react/prop-types */
import React from "react";

import { HvCheckBox, useLabels } from "@hv/uikit-react-core";

export const DEFAULT_LABELS = {
  selectRowCheckBoxAriaLabel: "Select this row",
};

export const CellWithCheckBox = ({ row, labels: labelsProp }) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const { onChange, checked } = row.getToggleRowSelectedProps();

  return (
    <HvCheckBox
      onChange={onChange}
      checked={checked}
      aria-label={labels.selectRowCheckBoxAriaLabel}
    />
  );
};

export const visibleColumnsHook = (columns) => {
  const selectionColumn = {
    id: "_hv_selection",
    variant: "checkbox",

    // this will only work when using useHvTableSticky
    // but ensures it stays left of any sticky column
    sticky: "left",

    Cell: CellWithCheckBox,
  };

  return [selectionColumn, ...columns];
};

export const getRowPropsHook = (props, { row }) => {
  const nextProps = {
    selected: row.isSelected,
  };

  return [props, nextProps];
};

const useRowSelection = (hooks) => {
  hooks.visibleColumns.push(visibleColumnsHook);

  hooks.getRowProps.push(getRowPropsHook);
};

useRowSelection.pluginName = "useHvRowSelection";

export default useRowSelection;
