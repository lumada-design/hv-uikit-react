/* eslint-disable no-param-reassign */
import React from "react";

import { makePropGetter, useGetLatest, ensurePluginOrder } from "react-table";

export const useInstanceHook = (instance) => {
  const { plugins, page, rows, toggleAllPageRowsSelected, toggleAllRowsSelected } = instance;

  ensurePluginOrder(plugins, ["useRowSelect"], "useHvBulkActions");

  const getInstance = useGetLatest(instance);

  const getHvBulkActionsProps = makePropGetter(instance.getHooks().getHvBulkActionsProps, {
    instance: getInstance(),
  });

  const isPaginated = !!page;

  const invertedToggleAllRowsSelected = React.useCallback(() => {
    if (!isPaginated) return toggleAllRowsSelected();

    const anySelected = rows.some((row) => row.isSelected);
    if (anySelected) return toggleAllRowsSelected(false);

    return toggleAllPageRowsSelected();
  }, [isPaginated, rows, toggleAllPageRowsSelected, toggleAllRowsSelected]);

  Object.assign(instance, {
    getHvBulkActionsProps,
    invertedToggleAllRowsSelected,
  });
};

export const defaultGetHvBulkActionsProps = (props, { instance }) => {
  const {
    rows,
    selectedFlatRows,
    page,
    toggleAllRowsSelected,
    invertedToggleAllRowsSelected,
    labels,
  } = instance;

  const isPaginated = !!page;

  const nextProps = {
    numTotal: rows.length,
    numSelected: selectedFlatRows.length,
    showSelectAllPages: isPaginated,
    onSelectAll: invertedToggleAllRowsSelected,
    onSelectAllPages: toggleAllRowsSelected,
    labels,
  };

  return [props, nextProps];
};

const useBulkActions = (hooks) => {
  hooks.getHvBulkActionsProps = [defaultGetHvBulkActionsProps];

  hooks.useInstance.push(useInstanceHook);
};

useBulkActions.pluginName = "useHvBulkActions";

export default useBulkActions;
