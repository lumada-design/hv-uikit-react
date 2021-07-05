import { Hooks, PropGetter, TableCommonProps } from "react-table";

export interface UseHvTableStickyTableHeadProps extends TableCommonProps {
  stickyHeader?: boolean;
}

export type HvTableHeadPropGetter<D extends object> = PropGetter<D, UseHvTableStickyTableHeadProps>;

export type UseHvTableStickyTableOptions = {
  stickyHeader?: boolean;
  stickyColumns?: boolean;
};

export interface UseHvTableStickyHooks<D extends object> {
  getTableHeadProps: Array<HvTableHeadPropGetter<D>>;
}

export interface UseHvTableStickyTableInstance<D extends object> {
  getTableHeadProps: (propGetter?: HvTableHeadPropGetter<D>) => UseHvTableStickyTableHeadProps;

  totalRight?: number;
  hasStickyColumns?: boolean;
}

// props target: <table>
export interface UseHvTableStickyTableProps {
  stickyHeader?: boolean;
  stickyColumns?: boolean;
}

// props target: <table><thead><tr><th>
export interface UseHvTableStickyColumnProps {
  stickyColumn?: boolean;
  stickyColumnMostLeft?: boolean;
  stickyColumnLeastRight?: boolean;
}

// props target: <table><tbody><tr><td>
export interface UseHvTableStickyCellProps {
  stickyColumn?: boolean;
  stickyColumnMostLeft?: boolean;
  stickyColumnLeastRight?: boolean;
}

export default function useHvTableSticky<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
