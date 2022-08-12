import { Hooks, PropGetter, TableCommonProps } from "react-table";

export interface HvTablePaginationProps extends TableCommonProps {
  canPrevious: boolean;
  canNext: boolean;
  pages: number;
  page: number;
  pageSize: number;
  onPageChange?: (updater: ((pageIndex: number) => number) | number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  labels?: Record<string, string>;
}

export type HvPaginationPropGetter<D extends object> = PropGetter<D, HvTablePaginationProps>;

export interface UseHvPaginationHooks<D extends object> {
  getHvPaginationProps: Array<HvPaginationPropGetter<D>>;
}

export interface UseHvPaginationTableInstance<D extends object> {
  getHvPaginationProps: (propGetter?: HvPaginationPropGetter<D>) => HvTablePaginationProps;
}

export default function usePagination<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
