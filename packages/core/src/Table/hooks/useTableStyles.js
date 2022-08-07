import clsx from "clsx";

// props target: <table>
export const getTablePropsHook = (props, { instance }) => {
  const nextProps = { component: instance.tableComponent };

  if (instance.style != null) {
    nextProps.style = instance.style;
  }

  if (instance.className != null) {
    nextProps.className = instance.className;
  }

  if (instance.classes != null) {
    nextProps.classes = instance.classes;
  }

  return [props, nextProps];
};

// props target: <table><thead><tr><th>
export const getHeaderFooterPropsHook = (props, { column }) => {
  const nextProps = {
    variant: column.variant,
    align: column.align,
  };

  if (column.style != null || column.headerStyle != null) {
    nextProps.style = { ...props.style, ...column.style, ...column.headerStyle };
  }

  if (column.className != null || column.headerClassName != null) {
    nextProps.className = clsx(props.className, column.className, column.headerClassName);
  }

  if (column.classes != null || column.headerClasses) {
    nextProps.classes = { ...props.classes, ...column.classes, ...column.headerClasses };
  }

  return [props, nextProps];
};

// props target: <table><tbody><tr>
export const getRowPropsHook = (props) => {
  const nextProps = {
    hover: true,
  };

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
export const getCellPropsHook = (props, { cell }) => {
  const nextProps = {
    variant: cell.column.variant,
    align: cell.column.align,
  };

  if (cell.column.style != null || cell.column.cellStyle != null) {
    nextProps.style = { ...props.style, ...cell.column.style, ...cell.column.cellStyle };
  }

  if (cell.column.className != null || cell.column.cellClassName != null) {
    nextProps.className = clsx(props.className, cell.column.className, cell.column.cellClassName);
  }

  if (cell.column.classes != null || cell.column.cellClasses) {
    nextProps.classes = { ...props.classes, ...cell.column.classes, ...cell.column.cellClasses };
  }

  return [props, nextProps];
};

const useTableStyles = (hooks) => {
  // props target: <table>
  hooks.getTableProps.push(getTablePropsHook);
  // props target: <table><thead><tr><th>
  hooks.getHeaderProps.push(getHeaderFooterPropsHook);
  // props target: <table><tfoot><tr><td>
  hooks.getFooterProps.push(getHeaderFooterPropsHook);
  // props target: <table><tbody><tr>
  hooks.getRowProps.push(getRowPropsHook);
  // props target: <table><tbody><tr><td>
  hooks.getCellProps.push(getCellPropsHook);
};

useTableStyles.pluginName = "useHvTableStyles";

export default useTableStyles;
