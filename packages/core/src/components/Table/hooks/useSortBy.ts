import { ensurePluginOrder, Hooks } from "react-table";

// #region ##### TYPES #####

// getHeaderProps:
export interface UseHvSortByColumnProps {
  sortable?: boolean;
  sorted?: boolean;
  sortDirection?: "descending" | "ascending";
  onClick:
    | ((
        e: React.MouseEvent<HTMLTableHeaderCellElement | HTMLTableCellElement>
      ) => void)
    | undefined;
}

// getCellProps:
export interface UseHvSortByTableCellProps {
  sorted?: boolean;
}

export type UseHvSortByProps = (<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

// props target: <table><thead><tr><th>
export const getHeaderPropsHook = (props, { instance, column }) => {
  const { isMultiSortEvent = (e) => e.shiftKey } = instance;

  const sortDirection = column.isSortedDesc ? "descending" : "ascending";

  const nextProps: UseHvSortByColumnProps = {
    sortable: column.canSort,
    sorted: column.isSorted,
    sortDirection: column.isSorted ? sortDirection : undefined,

    onClick: column.canSort
      ? (e) => {
          e.persist();
          column.toggleSortBy(
            undefined,
            !instance.disableMultiSort && isMultiSortEvent(e)
          );
        }
      : undefined,
  };

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
export const getCellPropsHook = (props, { cell }) => {
  const nextProps: UseHvSortByTableCellProps = {
    sorted: cell.column.isSorted,
  };

  return [props, nextProps];
};

export const useInstanceHook = (instance) => {
  ensurePluginOrder(instance.plugins, ["useSortBy"], "useHvSortBy");
};

const useSortBy: UseHvSortByProps = (hooks) => {
  // props target: <table><thead><tr><th>
  hooks.getHeaderProps.push(getHeaderPropsHook);
  // props target: <table><tbody><tr><td>
  hooks.getCellProps.push(getCellPropsHook);

  hooks.useInstance.push(useInstanceHook);
};

useSortBy.pluginName = "useHvSortBy";

export default useSortBy;
