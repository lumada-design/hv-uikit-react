import { clsx } from "clsx";
import { CSSProperties } from "react";
import { Hooks } from "react-table";

// #region ##### TYPES #####

export type UseHvTableStylesTableOptions = {
  style?: CSSProperties;
  className?: string;
  classes?: Record<string, string>;
  component?: any;
};

// column definition:
export interface UseHvTableStylesColumnOptions {
  variant?: "checkbox" | "expand" | "actions" | "default" | "none";
  align?: "center" | "inherit" | "justify" | "left" | "right";

  style?: CSSProperties;
  className?: string;
  classes?: Record<string, string>;

  headerStyle?: CSSProperties;
  headerClassName?: string;
  headerClasses?: Record<string, string>;

  cellStyle?: CSSProperties;
  cellClassName?: string;
  cellClasses?: Record<string, string>;
}

// PROPS:
export interface UseHvTableStylesTableRowProps {
  hover?: boolean;
}

export interface UseHvTableStylesTableCellProps {
  style?: CSSProperties;
  className?: string;
  classes?: Record<string, string>;
  variant?: "checkbox" | "expand" | "actions" | "default" | "none";
  align?: "center" | "inherit" | "justify" | "left" | "right";
}

export type UseTableStylesProps = (<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

// props target: <table>
const getTablePropsHook = (props, { instance }) => {
  const nextProps: UseHvTableStylesTableOptions = {
    component: instance.tableComponent,
  };

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
  const nextProps: UseHvTableStylesColumnOptions = {
    variant: column.variant,
    align: column.align,
  };

  if (column.style != null || column.headerStyle != null) {
    nextProps.style = {
      ...props.style,
      ...column.style,
      ...column.headerStyle,
    };
  }

  if (column.className != null || column.headerClassName != null) {
    nextProps.className = clsx(
      props.className,
      column.className,
      column.headerClassName
    );
  }

  if (column.classes != null || column.headerClasses) {
    nextProps.classes = {
      ...props.classes,
      ...column.classes,
      ...column.headerClasses,
    };
  }

  return [props, nextProps];
};

// props target: <table><tbody><tr>
const getRowPropsHook = (props) => {
  const nextProps: UseHvTableStylesTableRowProps = {
    hover: true,
  };

  return [props, nextProps];
};

// props target: <table><tbody><tr><td>
const getCellPropsHook = (props, { cell }) => {
  const nextProps: UseHvTableStylesTableCellProps = {
    variant: cell.column.variant,
    align: cell.column.align,
  };

  if (cell.column.style != null || cell.column.cellStyle != null) {
    nextProps.style = {
      ...props.style,
      ...cell.column.style,
      ...cell.column.cellStyle,
    };
  }

  if (cell.column.className != null || cell.column.cellClassName != null) {
    nextProps.className = clsx(
      props.className,
      cell.column.className,
      cell.column.cellClassName
    );
  }

  if (cell.column.classes != null || cell.column.cellClasses) {
    nextProps.classes = {
      ...props.classes,
      ...cell.column.classes,
      ...cell.column.cellClasses,
    };
  }

  return [props, nextProps];
};

const useTableStyles: UseTableStylesProps = (hooks) => {
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
