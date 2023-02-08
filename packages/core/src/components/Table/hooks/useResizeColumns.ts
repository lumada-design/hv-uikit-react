import { ensurePluginOrder, Hooks } from "react-table";

// #region ##### TYPES #####

// getHeaderProps:
export interface UseHvResizeColumnProps {
  resizable?: boolean;
  resizing?: boolean;
}

// getCellProps:
export interface UseHvResizeTableCellProps {
  resizable?: boolean;
  resizing?: boolean;
}

export type UseHvResizeColumnsProps = (<
  D extends object = Record<string, unknown>
>(
  hooks: Hooks<D>
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

// props target: <table><thead><tr><th>
export const getHeaderPropsHook = (props, { column }) => {
  const resizerProps: UseHvResizeColumnProps = column.getResizerProps?.() || {};

  const nextProps = {
    resizable: column.canResize,
    resizing: column.isResizing,
    resizerProps,
  };

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
export const getCellPropsHook = (props, { cell }) => {
  const nextProps: UseHvResizeTableCellProps = {
    resizable: cell.column.canResize,
    resizing: cell.column.isResizing,
  };

  return [props, nextProps];
};

export const useInstanceHook = (instance) => {
  ensurePluginOrder(
    instance.plugins,
    ["useResizeColumns"],
    "useHvResizeColumns"
  );
};

const useResizeColumns: UseHvResizeColumnsProps = (hooks) => {
  // props target: <table><thead><tr><th>
  hooks.getHeaderProps.push(getHeaderPropsHook);
  // props target: <table><tbody><tr><td>
  hooks.getCellProps.push(getCellPropsHook);

  hooks.useInstance.push(useInstanceHook);
};

useResizeColumns.pluginName = "useHvResizeColumns";

export default useResizeColumns;
