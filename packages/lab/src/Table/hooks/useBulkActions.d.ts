import { Hooks, PropGetter, TableCommonProps } from "react-table";

export interface HvBulkActionsProps extends TableCommonProps {
  numTotal: number;
  numSelected: number;
  showSelectAllPages: boolean;
  onSelectAll: () => void;
  onSelectAllPages: (value?: boolean) => void;
  labels?: Record<string, string>;
}

export type HvBulkActionsPropGetter<D extends object> = PropGetter<D, HvBulkActionsProps>;

export function useHvBulkActions<D extends object = Record<string, unknown>>(hooks: Hooks<D>): void;

export interface UseHvBulkActionsHooks<D extends object> {
  getHvBulkActionsProps: Array<HvBulkActionsPropGetter<D>>;
}

export interface UseHvBulkActionsTableInstanceProps<D extends object> {
  getHvBulkActionsProps: (propGetter?: HvBulkActionsPropGetter<D>) => HvBulkActionsProps;
  invertedToggleAllRowsSelected: () => void;
}
