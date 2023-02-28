import { useCallback } from "react";
import {
  Hooks,
  PropGetter,
  TableCommonProps,
  makePropGetter,
  useGetLatest,
  ensurePluginOrder,
} from "react-table";

// #region ##### TYPES #####

export interface HvTAbleBulkActionsProps extends TableCommonProps {
  numTotal: number;
  numSelected: number;
  showSelectAllPages: boolean;
  onSelectAll: () => void;
  onSelectAllPages: () => void;
  labels?: Record<string, string>;
}

export type HvBulkActionsPropGetter<D extends object> = PropGetter<
  D,
  HvTAbleBulkActionsProps
>;

export interface UseHvBulkActionsHooks<D extends object> {
  getHvBulkActionsProps: Array<HvBulkActionsPropGetter<D>>;
}

export type UseHvBulkActionsTableOptions = {
  aditivePageBulkSelection?: boolean;
  subtractivePageBulkDeselection?: boolean;
  showSelectAllPages?: boolean;
};

export interface UseHvBulkActionsTableInstanceProps<D extends object> {
  getHvBulkActionsProps: (
    propGetter?: HvBulkActionsPropGetter<D>
  ) => HvTAbleBulkActionsProps;
  invertedToggleAllRowsSelected: () => void;
}

export type UseBulkActionsProps = (<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

const useInstanceHook = (instance) => {
  const { plugins, page, toggleAllPageRowsSelected, toggleAllRowsSelected } =
    instance;

  ensurePluginOrder(plugins, ["useHvRowSelection"], "useHvBulkActions");

  const getInstance = useGetLatest(instance);

  const getHvBulkActionsProps = makePropGetter(
    instance.getHooks().getHvBulkActionsProps,
    {
      instance: getInstance(),
    }
  );

  const isPaginated = !!page;

  const invertedToggleAllRowsSelected = useCallback(() => {
    if (!isPaginated) return toggleAllRowsSelected();

    const {
      aditivePageBulkSelection,
      subtractivePageBulkDeselection,
      isNoRowsSelected,
      isNoPageRowsSelected,
      isAllSelectablePageRowsSelected,
      isAllSelectablePageRowsUnselected,
    } = getInstance();

    if (aditivePageBulkSelection && subtractivePageBulkDeselection) {
      return toggleAllPageRowsSelected(!isAllSelectablePageRowsSelected);
    }

    if (aditivePageBulkSelection && !subtractivePageBulkDeselection) {
      if (!isAllSelectablePageRowsSelected) {
        return toggleAllPageRowsSelected();
      }

      return toggleAllRowsSelected(false);
    }

    if (!aditivePageBulkSelection && !subtractivePageBulkDeselection) {
      if (isNoRowsSelected) {
        return toggleAllPageRowsSelected();
      }

      return toggleAllRowsSelected(false);
    }

    if (!aditivePageBulkSelection && subtractivePageBulkDeselection) {
      if (isNoRowsSelected) {
        return toggleAllPageRowsSelected();
      }
      if (!isAllSelectablePageRowsUnselected) {
        return toggleAllPageRowsSelected(false);
      }
      if (!isNoPageRowsSelected) {
        return toggleAllPageRowsSelected(false);
      }

      return toggleAllRowsSelected(false);
    }

    return toggleAllPageRowsSelected();
  }, [
    getInstance,
    isPaginated,
    toggleAllPageRowsSelected,
    toggleAllRowsSelected,
  ]);

  const aditive = instance.aditivePageBulkSelection === true;
  const subtractive = instance.subtractivePageBulkDeselection === true;

  Object.assign(instance, {
    getHvBulkActionsProps,
    invertedToggleAllRowsSelected,
    aditivePageBulkSelection: aditive,
    subtractivePageBulkDeselection: subtractive,
  });
};

export const defaultgetHvBulkActionsProps = (props, { instance }) => {
  const {
    rows,
    initialRows,
    selectedFlatRows,
    state: { selectedRowIds = {} } = {},
    page,
    toggleAllRowsSelected,
    invertedToggleAllRowsSelected,
    showSelectAllPages = true,
    applyToggleAllRowsSelectedToPrefilteredRows,
  } = instance;

  const isPaginated = !!page;

  const nextProps: HvTAbleBulkActionsProps = {
    numTotal:
      applyToggleAllRowsSelectedToPrefilteredRows === true
        ? initialRows.length
        : rows.length,
    numSelected:
      applyToggleAllRowsSelectedToPrefilteredRows === true
        ? Object.keys(selectedRowIds).length
        : selectedFlatRows.length,
    showSelectAllPages: showSelectAllPages && isPaginated,
    onSelectAll: invertedToggleAllRowsSelected,
    onSelectAllPages: toggleAllRowsSelected,
  };

  return [props, nextProps];
};

const useBulkActions: UseBulkActionsProps = (hooks) => {
  hooks.getHvBulkActionsProps = [defaultgetHvBulkActionsProps];

  hooks.useInstance.push(useInstanceHook);
};

useBulkActions.pluginName = "useHvBulkActions";

export default useBulkActions;
