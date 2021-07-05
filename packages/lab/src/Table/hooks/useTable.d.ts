/* eslint-disable no-use-before-define */
import {
  Cell,
  CellPropGetter,
  CellProps,
  ColumnInstance,
  ColumnInterface,
  FooterPropGetter,
  HeaderPropGetter,
  HeaderProps,
  Hooks,
  PluginHook,
  Renderer,
  Row,
  RowPropGetter,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableInstance,
  TableOptions,
  TablePropGetter,
  TableProps,
  TableRowProps,
  TableState,
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from "react-table";

import {
  UseHvTableStylesColumnOptions,
  UseHvTableStylesTableCellProps,
  UseHvTableStylesTableRowProps,
} from "./useTableStyles";
import {
  UseHvTableStickyCellProps,
  UseHvTableStickyColumnProps,
  UseHvTableStickyHooks,
  UseHvTableStickyTableInstance,
  UseHvTableStickyTableOptions,
  UseHvTableStickyTableProps,
} from "./useSticky";
import { UseHvSortByColumnProps, UseHvSortByTableCellProps } from "./useSortBy";
import { UseHvRowSelectionTableRowProps } from "./useRowSelection";
import { UseHvPaginationHooks, UseHvPaginationTableInstance } from "./usePagination";
import { UseHvBulkActionsHooks, UseHvBulkActionsTableInstanceProps } from "./useBulkActions";

type Accessor<D extends object> = (
  originalRow: D,
  index: number,
  sub: {
    subRows: D[];
    depth: number;
    data: D[];
  }
) => CellValue;

type StringKey<D> = Extract<keyof D, string>;
type IdType<D> = StringKey<D> | string;
type CellValue<V = any> = V;

interface HvColumnInterfaceBasedOnValue<D extends object = Record<string, unknown>, V = any> {
  Cell?: Renderer<HvCellProps<D, V>>;
}

interface HvColumnGroupInterface<D extends object> {
  columns: Array<HvTableColumnConfig<D>>;
}

type HvColumnGroup<D extends object = Record<string, unknown>> = HvTableColumnOptions<D> &
  HvColumnGroupInterface<D> &
  (
    | { Header: string }
    | ({ id: IdType<D> } & {
        Header: Renderer<HeaderProps<D>>;
      })
  ) & { accessor?: Accessor<D> }; // Not used, but needed for backwards compatibility

type ValueOf<T> = T[keyof T];

// The accessors like `foo.bar` are not supported, use functions instead
type HvColumnWithStrictAccessor<
  D extends object = Record<string, unknown>
> = HvTableColumnOptions<D> &
  ValueOf<
    {
      [K in keyof D]: {
        accessor: K;
      } & HvColumnInterfaceBasedOnValue<D, D[K]>;
    }
  >;

type HvColumnWithLooseAccessor<
  D extends object = Record<string, unknown>
> = HvTableColumnOptions<D> &
  HvColumnInterfaceBasedOnValue<D> &
  (
    | { Header: string }
    | { id: IdType<D> }
    | { accessor: keyof D extends never ? IdType<D> : never }
  ) & { accessor?: keyof D extends never ? IdType<D> | Accessor<D> : Accessor<D> };

type HvCellProps<D extends object, V = any> = CellProps<D, V> & {
  column: HvColumnInstance<D>;
  row: HvRowInstance<D>;
  cell: HvCellInstance<D, V>;
};

export type HvTableDefinitionConfig<D extends object = Record<string, unknown>> = HvTableOptions<D>;

export type HvTableColumnConfig<D extends object = Record<string, unknown>> =
  | HvColumnGroup<D>
  | HvColumnWithLooseAccessor<D>
  | HvColumnWithStrictAccessor<D>;

// #region HOOKS
export interface HvHooks<D extends object = Record<string, unknown>>
  extends Hooks<D>,
    UseExpandedHooks<D>,
    UseGroupByHooks<D>,
    UseRowSelectHooks<D>,
    UseSortByHooks<D>,
    UseHvTableStickyHooks<D>,
    UseHvPaginationHooks<D>,
    UseHvBulkActionsHooks<D> {}
// #endregion

// #region STATE
export interface HvTableState<D extends object = Record<string, unknown>>
  extends TableState<D>,
    UseColumnOrderState<D>,
    UseExpandedState<D>,
    UseFiltersState<D>,
    UseGlobalFiltersState<D>,
    UseGroupByState<D>,
    UsePaginationState<D>,
    UseResizeColumnsState<D>,
    UseRowSelectState<D>,
    UseSortByState<D> {
  rowCount: number;
}
// #endregion

// #region OPTIONS
export interface HvTableOptions<D extends object>
  extends Omit<TableOptions<D>, "columns" | "data">,
    UseExpandedOptions<D>,
    UseFiltersOptions<D>,
    UseFiltersOptions<D>,
    UseGlobalFiltersOptions<D>,
    UseGroupByOptions<D>,
    UsePaginationOptions<D>,
    UseResizeColumnsOptions<D>,
    UseRowSelectOptions<D>,
    UseSortByOptions<D>,
    UseHvTableStickyTableOptions {
  columns?: Array<HvTableColumnConfig<D>>;
  data?: D[];

  initialState?: Partial<HvTableState<D>>;

  labels?: Record<string, string>;
}

export interface HvTableColumnOptions<D extends object = Record<string, unknown>>
  extends ColumnInterface<D>,
    UseFiltersColumnOptions<D>,
    UseGroupByColumnOptions<D>,
    UseResizeColumnsColumnOptions<D>,
    UseSortByColumnOptions<D>,
    UseHvTableStylesColumnOptions {}
// #endregion

// #region INSTANCE
export interface HvTableInstance<D extends object = Record<string, unknown>>
  extends TableInstance<D>,
    Omit<HvTableOptions<D>, "columns" | "pageCount" | "initialState" | "data">,
    UseColumnOrderInstanceProps<D>,
    UseExpandedInstanceProps<D>,
    UseFiltersInstanceProps<D>,
    UseGlobalFiltersInstanceProps<D>,
    UseGroupByInstanceProps<D>,
    UsePaginationInstanceProps<D>,
    UseRowSelectInstanceProps<D>,
    UseSortByInstanceProps<D>,
    UseHvTableStickyTableInstance<D>,
    UseHvPaginationTableInstance<D>,
    UseHvBulkActionsTableInstanceProps<D> {
  initialState: Partial<HvTableState<D>>;
  state: HvTableState<D>;
  columns: Array<HvColumnInstance<D>>;
  allColumns: Array<HvColumnInstance<D>>;
  visibleColumns: Array<HvColumnInstance<D>>;
  headers: Array<HvColumnInstance<D>>;
  flatHeaders: Array<HvColumnInstance<D>>;
  rows: Array<HvRowInstance<D>>;
  rowsById: Record<string, HvRowInstance<D>>;
  flatRows: Array<HvRowInstance<D>>;
  getHooks: () => HvHooks<D>;
  getTableProps: (propGetter?: TablePropGetter<D>) => HvTableProps;

  labels: Record<string, string>;
}

export interface HvColumnInstance<D extends object = Record<string, unknown>>
  extends ColumnInstance<D>,
    Omit<HvTableColumnOptions<D>, "id">,
    UseFiltersColumnProps<D>,
    UseGroupByColumnProps<D>,
    UseResizeColumnsColumnProps<D>,
    UseSortByColumnProps<D> {
  Cell?: Renderer<HvCellProps<D>>;
  columns: Array<HvColumnInstance<D>>;
  parent: HvColumnInstance<D>; // not documented
  placeholderOf?: HvColumnInstance;
  getHeaderProps: (propGetter?: HeaderPropGetter<D>) => HvTableHeaderProps;
  getFooterProps: (propGetter?: FooterPropGetter<D>) => HvTableFooterProps;
}

export interface HvRowInstance<D extends object = Record<string, unknown>>
  extends Row<D>,
    UseExpandedRowProps<D>,
    UseGroupByRowProps<D>,
    UseRowSelectRowProps<D> {
  cells: Array<HvCellInstance<D>>;
  allCells: Array<HvCellInstance<D>>;
  getRowProps: (propGetter?: RowPropGetter<D>) => HvTableRowProps;
  index: number;
  original: D;
  id: string;
  subRows: Array<HvRowInstance<D>>;
}

export interface HvCellInstance<D extends object = Record<string, unknown>, V = any>
  extends Cell<D, V>,
    UseGroupByCellProps<D> {
  column: HvColumnInstance<D>;
  row: HvRowInstance<D>;
  getCellProps: (propGetter?: CellPropGetter<D>) => HvTableCellProps;
}
// #endregion

// #region PROPS
export interface HvTableProps extends TableProps, UseHvTableStickyTableProps {}

export interface HvTableHeaderProps
  extends TableHeaderProps,
    UseHvTableStylesTableCellProps,
    UseHvTableStickyColumnProps,
    UseHvSortByColumnProps {}
export interface HvTableFooterProps extends TableFooterProps, UseHvTableStylesTableCellProps {}

export interface HvTableRowProps
  extends TableRowProps,
    UseHvTableStylesTableRowProps,
    UseHvRowSelectionTableRowProps {}

export interface HvTableCellProps
  extends TableCellProps,
    UseHvTableStylesTableCellProps,
    UseHvTableStickyCellProps,
    UseHvSortByTableCellProps {}

// #endregion

export default function useHvTable<D extends object = Record<string, unknown>>(
  options: HvTableOptions<D>,
  ...plugins: Array<PluginHook<D>>
): HvTableInstance<D>;
