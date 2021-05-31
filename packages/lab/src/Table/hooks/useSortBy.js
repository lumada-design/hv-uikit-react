import { ensurePluginOrder } from "react-table";

// props target: <table><thead><tr><th>
export const getHeaderPropsHook = (props, { instance, column }) => {
  const { isMultiSortEvent = (e) => e.shiftKey } = instance;

  const sortDirection = column.isSortedDesc ? "descending" : "ascending";

  const nextProps = {
    sortable: column.canSort,
    sorted: column.isSorted,
    sortDirection: column.isSorted ? sortDirection : undefined,

    onClick: column.canSort
      ? (e) => {
          e.persist();
          column.toggleSortBy(undefined, !instance.disableMultiSort && isMultiSortEvent(e));
        }
      : undefined,
  };

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
export const getCellPropsHook = (props, { cell }) => {
  const nextProps = {
    sorted: cell.column.isSorted,
  };

  return [props, nextProps];
};

export const useInstanceHook = (instance) => {
  ensurePluginOrder(instance.plugins, ["useSortBy"], "useHvSortBy");
};

const useSortBy = (hooks) => {
  // props target: <table><thead><tr><th>
  hooks.getHeaderProps.push(getHeaderPropsHook);
  // props target: <table><tbody><tr><td>
  hooks.getCellProps.push(getCellPropsHook);

  hooks.useInstance.push(useInstanceHook);
};

useSortBy.pluginName = "useHvSortBy";

export default useSortBy;
