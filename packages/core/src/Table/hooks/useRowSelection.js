/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from "react";

import {
  actions,
  ensurePluginOrder,
  useGetLatest,
  useMountedLayoutEffect,
  makePropGetter,
} from "react-table";

import HvCheckBox from "../../CheckBox";
import { useLabels } from "../../utils";

// Actions
actions.resetSelectedRows = "resetSelectedRows";
actions.toggleAllRowsSelected = "toggleAllRowsSelected";
actions.toggleRowSelected = "toggleRowSelected";
actions.toggleAllPageRowsSelected = "toggleAllPageRowsSelected";

actions.resetLockedSelectionRows = "resetLockedSelectionRows";
actions.toggleRowLockedSelection = "toggleRowLockedSelection";

export const DEFAULT_LABELS = {
  selectRowCheckBoxAriaLabel: "Select this row",
};

export const CellWithCheckBox = ({ row, labels: labelsProp }) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const { onChange, checked, disabled, indeterminate } = row.getToggleRowSelectedProps();

  return (
    <HvCheckBox
      onChange={onChange}
      checked={checked}
      disabled={disabled}
      indeterminate={indeterminate}
      aria-label={labels.selectRowCheckBoxAriaLabel}
    />
  );
};

export const visibleColumnsHook = (columns) => {
  const selectionColumn = {
    id: "_hv_selection",
    variant: "checkbox",

    width: 32,

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

export const defaultGetToggleRowSelectedProps = (props, { instance, row }) => {
  const { manualRowSelectedKey = "isSelected" } = instance;
  let checked = false;

  if (row.original && row.original[manualRowSelectedKey]) {
    checked = true;
  } else {
    checked = row.isSelected;
  }

  return [
    props,
    {
      onChange: (e, check) => {
        row.toggleRowSelected(check ?? e?.target?.checked);
      },
      disabled: row.isSelectionLocked,
      checked,
      indeterminate: row.isSomeSelected,
    },
  ];
};

export const defaultGetToggleAllRowsSelectedProps = (props, { instance }) => [
  props,
  {
    onChange: (e) => {
      instance.toggleAllRowsSelected(e.target.checked);
    },
    checked: instance.isAllRowsSelected,
    indeterminate: Boolean(
      !instance.isAllRowsSelected && Object.keys(instance.state.selectedRowIds).length
    ),
  },
];

export const defaultGetToggleAllPageRowsSelectedProps = (props, { instance }) => [
  props,
  {
    onChange(e) {
      instance.toggleAllPageRowsSelected(e.target.checked);
    },
    checked: instance.isAllPageRowsSelected,
    indeterminate: Boolean(
      !instance.isAllPageRowsSelected &&
        instance.page.some(({ id }) => instance.state.selectedRowIds[id])
    ),
  },
];

export function reducer(state, action, previousState, instance) {
  if (action.type === actions.init) {
    return {
      selectedRowIds: {},
      lockedSelectionRowIds: {},
      ...state,
    };
  }

  if (action.type === actions.resetSelectedRows) {
    return {
      ...state,
      selectedRowIds: instance.initialState.selectedRowIds || {},
    };
  }

  if (action.type === actions.toggleAllRowsSelected) {
    const { value: setSelected } = action;
    const {
      isAllRowsSelected,
      rowsById,
      initialRowsById,
      nonGroupedRowsById = rowsById,
      applyToggleAllRowsSelectedToPrefilteredRows,
    } = instance;

    const rowsToSelect = applyToggleAllRowsSelectedToPrefilteredRows
      ? initialRowsById
      : nonGroupedRowsById;

    const selectAll = typeof setSelected !== "undefined" ? setSelected : !isAllRowsSelected;

    // Only remove/add the rows that are visible on the screen
    //  Leave all the other rows that are selected alone.
    const selectedRowIds = { ...state.selectedRowIds };

    if (selectAll) {
      Object.keys(rowsToSelect).forEach((rowId) => {
        const isSelectionLocked = state.lockedSelectionRowIds[rowId];
        if (!isSelectionLocked) {
          selectedRowIds[rowId] = true;
        }
      });
    } else {
      Object.keys(rowsToSelect).forEach((rowId) => {
        const isSelectionLocked = state.lockedSelectionRowIds[rowId];
        if (!isSelectionLocked) {
          delete selectedRowIds[rowId];
        }
      });
    }

    return {
      ...state,
      selectedRowIds,
    };
  }

  if (action.type === actions.toggleRowSelected) {
    const { id, value: setSelected } = action;
    const isSelectionLocked = state.lockedSelectionRowIds[id];
    if (isSelectionLocked) {
      return state;
    }

    const { rowsById, selectSubRows = true, getSubRows } = instance;
    const isSelected = state.selectedRowIds[id];
    const shouldExist = typeof setSelected !== "undefined" ? setSelected : !isSelected;

    if (isSelected === shouldExist) {
      return state;
    }

    const newSelectedRowIds = { ...state.selectedRowIds };

    const handleRowById = (rowId) => {
      const row = rowsById[rowId];

      if (!row.isGrouped) {
        if (shouldExist) {
          newSelectedRowIds[rowId] = true;
        } else {
          delete newSelectedRowIds[rowId];
        }
      }

      if (selectSubRows && getSubRows(row)) {
        getSubRows(row).forEach((subrow) => {
          handleRowById(subrow.id);
        });
      }
    };

    handleRowById(id);

    return {
      ...state,
      selectedRowIds: newSelectedRowIds,
    };
  }

  if (action.type === actions.toggleAllPageRowsSelected) {
    const { value: setSelected } = action;
    const { page, rowsById, selectSubRows = true, isAllPageRowsSelected, getSubRows } = instance;

    const selectAll = typeof setSelected !== "undefined" ? setSelected : !isAllPageRowsSelected;
    const newSelectedRowIds = { ...state.selectedRowIds };

    const handleRowById = (rowId) => {
      const row = rowsById[rowId];
      const isSelectionLocked = state.lockedSelectionRowIds[rowId];

      if (!isSelectionLocked && !row.isGrouped) {
        if (selectAll) {
          newSelectedRowIds[rowId] = true;
        } else {
          delete newSelectedRowIds[rowId];
        }
      }

      if (selectSubRows && getSubRows(row)) {
        getSubRows(row).forEach((subrow) => {
          handleRowById(subrow.id);
        });
      }
    };

    page.forEach((row) => handleRowById(row.id));

    return {
      ...state,
      selectedRowIds: newSelectedRowIds,
    };
  }

  if (action.type === actions.resetLockedSelectionRows) {
    return {
      ...state,
      lockedSelectionRowIds: instance.initialState.lockedSelectionRowIds || {},
    };
  }

  if (action.type === actions.toggleRowLockedSelection) {
    const { id, value: setLockedSelection } = action;
    const { rowsById, selectSubRows = true, getSubRows } = instance;
    const isLockedSelection = state.lockedSelectionRowIds[id];
    const shouldExist =
      typeof setLockedSelection !== "undefined" ? setLockedSelection : !isLockedSelection;

    if (isLockedSelection === shouldExist) {
      return state;
    }

    const newLockedSelectionRowIds = { ...state.lockedSelectionRowIds };

    const handleRowById = (rowId) => {
      const row = rowsById[rowId];

      if (!row.isGrouped) {
        if (shouldExist) {
          newLockedSelectionRowIds[rowId] = true;
        } else {
          delete newLockedSelectionRowIds[rowId];
        }
      }

      if (selectSubRows && getSubRows(row)) {
        getSubRows(row).forEach((subrow) => {
          handleRowById(subrow.id);
        });
      }
    };

    handleRowById(id);

    return {
      ...state,
      lockedSelectionRowIds: newLockedSelectionRowIds,
    };
  }

  return state;
}

function getRowIsSelected(row, selectedRowIds, getSubRows) {
  if (selectedRowIds[row.id]) {
    return true;
  }

  const subRows = getSubRows(row);

  if (subRows && subRows.length) {
    let allChildrenSelected = true;
    let someSelected = false;

    subRows.forEach((subRow) => {
      // Bail out early if we know both of these
      if (someSelected && !allChildrenSelected) {
        return;
      }

      if (getRowIsSelected(subRow, selectedRowIds, getSubRows)) {
        someSelected = true;
      } else {
        allChildrenSelected = false;
      }
    });

    if (allChildrenSelected) {
      return true;
    }

    if (someSelected) {
      return null;
    }
  }

  return false;
}

export function useInstance(instance) {
  const {
    data,
    rows,
    getHooks,
    plugins,
    rowsById,
    initialRowsById,
    nonGroupedRowsById = rowsById,
    autoResetSelectedRows = true,
    autoResetLockedSelectionRows = true,
    state: { selectedRowIds, lockedSelectionRowIds },
    selectSubRows = true,
    dispatch,
    page,
    getSubRows,
    applyToggleAllRowsSelectedToPrefilteredRows,
  } = instance;

  ensurePluginOrder(
    plugins,
    ["useFilters", "useGroupBy", "useSortBy", "useExpanded", "usePagination"],
    "useHvRowSelection"
  );

  const rowsToSelect = applyToggleAllRowsSelectedToPrefilteredRows
    ? initialRowsById
    : nonGroupedRowsById;

  const selectedFlatRows = React.useMemo(() => {
    const selectedRows = [];

    rows.forEach((row) => {
      const isSelected = selectSubRows
        ? getRowIsSelected(row, selectedRowIds, getSubRows)
        : !!selectedRowIds[row.id];
      row.isSelected = !!isSelected;
      row.isSomeSelected = isSelected === null;

      if (isSelected) {
        selectedRows.push(row);
      }
    });

    return selectedRows;
  }, [rows, selectSubRows, selectedRowIds, getSubRows]);

  const existsLockedRows = !!Object.keys(lockedSelectionRowIds).length;

  const isNoRowsSelected = !(Object.keys(rowsToSelect).length && selectedFlatRows.length);

  let isNoPageRowsSelected;
  let isAllRowsSelected;
  let isAllPageRowsSelected;

  let isAllSelectableRowsUnselected;
  let isAllSelectablePageRowsUnselected;
  let isAllSelectableRowsSelected;
  let isAllSelectablePageRowsSelected;

  if (isNoRowsSelected) {
    isAllRowsSelected = false;
    isAllPageRowsSelected = false;

    isAllSelectableRowsSelected =
      existsLockedRows && !Object.keys(rowsToSelect).some((id) => !lockedSelectionRowIds[id]);
    isAllSelectablePageRowsSelected = isAllSelectableRowsSelected;

    isAllSelectableRowsUnselected = isAllSelectableRowsSelected;
    isAllSelectablePageRowsUnselected = isAllSelectableRowsSelected;

    isNoPageRowsSelected = true;
  } else {
    isAllRowsSelected = !Object.keys(rowsToSelect).some((id) => !selectedRowIds[id]);

    if (isAllRowsSelected) {
      isAllSelectableRowsSelected = true;
      isAllSelectablePageRowsSelected = true;

      isAllSelectableRowsUnselected =
        existsLockedRows &&
        Object.keys(rowsToSelect).filter((id) => !lockedSelectionRowIds[id]).length === 0;
      isAllSelectablePageRowsUnselected = isAllSelectableRowsUnselected;

      isNoPageRowsSelected = false;
      isAllPageRowsSelected = true;
    } else {
      isAllSelectableRowsSelected =
        existsLockedRows &&
        !Object.keys(rowsToSelect)
          .filter((id) => !lockedSelectionRowIds[id])
          .some((id) => !selectedRowIds[id]);

      isAllSelectableRowsUnselected =
        !existsLockedRows ||
        !Object.keys(rowsToSelect)
          .filter((id) => !lockedSelectionRowIds[id])
          .some((id) => selectedRowIds[id]);

      isAllPageRowsSelected = !(page && page.length && page.some(({ id }) => !selectedRowIds[id]));

      if (isAllPageRowsSelected) {
        isAllSelectablePageRowsSelected = true;

        isAllSelectablePageRowsUnselected =
          existsLockedRows &&
          page &&
          page.length &&
          page.filter(({ id }) => !lockedSelectionRowIds[id]).length === 0;

        isNoPageRowsSelected = false;
      } else {
        isAllSelectablePageRowsSelected =
          existsLockedRows &&
          !(
            page &&
            page.length &&
            page
              .filter(({ id }) => !lockedSelectionRowIds[id])
              .some(({ id }) => !selectedRowIds[id])
          );

        isAllSelectablePageRowsUnselected =
          !existsLockedRows ||
          !(
            page &&
            page.length &&
            page.filter(({ id }) => !lockedSelectionRowIds[id]).some(({ id }) => selectedRowIds[id])
          );

        isNoPageRowsSelected = !(page && page.length && page.some(({ id }) => selectedRowIds[id]));
      }
    }
  }

  const getAutoResetSelectedRows = useGetLatest(autoResetSelectedRows);

  const getAutoResetLockedSelectionRows = useGetLatest(autoResetLockedSelectionRows);

  useMountedLayoutEffect(() => {
    if (getAutoResetSelectedRows()) {
      dispatch({ type: actions.resetSelectedRows });
    }
    if (getAutoResetLockedSelectionRows()) {
      dispatch({ type: actions.resetLockedSelectionRows });
    }
  }, [dispatch, data]);

  const toggleAllRowsSelected = React.useCallback(
    (value) => dispatch({ type: actions.toggleAllRowsSelected, value }),
    [dispatch]
  );

  const toggleAllPageRowsSelected = React.useCallback(
    (value) => dispatch({ type: actions.toggleAllPageRowsSelected, value }),
    [dispatch]
  );

  const toggleRowSelected = React.useCallback(
    (id, value) => dispatch({ type: actions.toggleRowSelected, id, value }),
    [dispatch]
  );

  const getInstance = useGetLatest(instance);

  const getToggleAllRowsSelectedProps = makePropGetter(getHooks().getToggleAllRowsSelectedProps, {
    instance: getInstance(),
  });

  const getToggleAllPageRowsSelectedProps = makePropGetter(
    getHooks().getToggleAllPageRowsSelectedProps,
    { instance: getInstance() }
  );

  const toggleRowLockedSelection = React.useCallback(
    (id, value) => dispatch({ type: actions.toggleRowLockedSelection, id, value }),
    [dispatch]
  );

  Object.assign(instance, {
    selectedFlatRows,
    isNoRowsSelected,
    isNoPageRowsSelected,
    isAllRowsSelected,
    isAllPageRowsSelected,
    isAllSelectableRowsSelected,
    isAllSelectablePageRowsSelected,
    isAllSelectableRowsUnselected,
    isAllSelectablePageRowsUnselected,
    toggleRowSelected,
    toggleAllRowsSelected,
    getToggleAllRowsSelectedProps,
    getToggleAllPageRowsSelectedProps,
    toggleAllPageRowsSelected,
    toggleRowLockedSelection,
  });
}

export function prepareRow(row, { instance }) {
  row.toggleRowSelected = (set) => instance.toggleRowSelected(row.id, set);
  row.getToggleRowSelectedProps = makePropGetter(instance.getHooks().getToggleRowSelectedProps, {
    instance,
    row,
  });

  row.toggleRowLockedSelection = (set) => instance.toggleRowLockedSelection(row.id, set);
  row.isSelectionLocked = instance.state?.lockedSelectionRowIds?.[row.id] || false;
}

const useRowSelection = (hooks) => {
  hooks.visibleColumns.push(visibleColumnsHook);

  hooks.getRowProps.push(getRowPropsHook);

  hooks.getToggleRowSelectedProps = [defaultGetToggleRowSelectedProps];
  hooks.getToggleAllRowsSelectedProps = [defaultGetToggleAllRowsSelectedProps];
  hooks.getToggleAllPageRowsSelectedProps = [defaultGetToggleAllPageRowsSelectedProps];

  hooks.stateReducers.push(reducer);
  hooks.useInstance.push(useInstance);
  hooks.prepareRow.push(prepareRow);
};

useRowSelection.pluginName = "useHvRowSelection";

export default useRowSelection;
