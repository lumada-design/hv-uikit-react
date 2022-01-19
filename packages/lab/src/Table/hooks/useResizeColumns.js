import { ensurePluginOrder } from "react-table";

// props target: <table><thead><tr><th>
export const getHeaderPropsHook = (props, { column }) => {
  const resizerProps = column.getResizerProps?.() || {};

  const nextProps = {
    resizable: column.canResize,
    resizing: column.isResizing,
    resizerProps,
  };

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
export const getCellPropsHook = (props, { cell }) => {
  const nextProps = {
    resizable: cell.column.canResize,
    resizing: cell.column.isResizing,
  };

  return [props, nextProps];
};

export const useInstanceHook = (instance) => {
  ensurePluginOrder(instance.plugins, ["useResizeColumns"], "useHvResizeColumns");
};

const useResizeColumns = (hooks) => {
  // props target: <table><thead><tr><th>
  hooks.getHeaderProps.push(getHeaderPropsHook);
  // props target: <table><tbody><tr><td>
  hooks.getCellProps.push(getCellPropsHook);

  hooks.useInstance.push(useInstanceHook);
};

useResizeColumns.pluginName = "useHvResizeColumns";

export default useResizeColumns;
