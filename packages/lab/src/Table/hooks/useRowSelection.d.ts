import { ChangeEvent } from "react";
import { Hooks, IdType, PropGetter, Row } from "react-table";

// getRowProps:
export interface UseHvRowSelectionTableRowProps {
  selected?: boolean;
}

export interface UseHvRowSelectionRowCheckboxProps {
  onChange?: (e: ChangeEvent, checked?: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface UseHvRowSelectionBulkCheckboxProps {
  onChange?: (e: ChangeEvent, checked?: boolean) => void;
  checked?: boolean;
  indeterminate?: boolean;
}

export type UseHvRowSelectionTableOptions = Partial<{
  autoResetSelectedRows: boolean;
  autoResetLockedSelectionRows: boolean;
  selectSubRows: boolean;
  manualRowSelectedKey: string;
}>;

export interface UseHvRowSelectionHooks<D extends object> {
  getToggleRowSelectedProps: Array<PropGetter<D, UseHvRowSelectionRowCheckboxProps>>;
  getToggleAllRowsSelectedProps: Array<PropGetter<D, UseHvRowSelectionBulkCheckboxProps>>;
  getToggleAllPageRowsSelectedProps: Array<PropGetter<D, UseHvRowSelectionBulkCheckboxProps>>;
}

export interface UseHvRowSelectionState<D extends object> {
  selectedRowIds: Record<IdType<D>, boolean>;
  lockedSelectionRowIds: Record<IdType<D>, boolean>;
}

export interface UseHvRowSelectionTableInstance<D extends object> {
  toggleRowSelected: (rowId: IdType<D>, set?: boolean) => void;
  toggleAllRowsSelected: (value?: boolean) => void;
  toggleAllPageRowsSelected: (value?: boolean) => void;
  getToggleAllRowsSelectedProps: (
    props?: Partial<UseHvRowSelectionBulkCheckboxProps>
  ) => UseHvRowSelectionBulkCheckboxProps;
  getToggleAllPageRowsSelectedProps: (
    props?: Partial<UseHvRowSelectionBulkCheckboxProps>
  ) => UseHvRowSelectionBulkCheckboxProps;

  isNoRowsSelected: boolean;
  isNoPageRowsSelected: boolean;
  isAllRowsSelected: boolean;
  isAllPageRowsSelected: boolean;
  isAllSelectableRowsSelected: boolean;
  isAllSelectablePageRowsSelected: boolean;
  isAllSelectableRowsUnselected: boolean;
  isAllSelectablePageRowsUnselected: boolean;

  selectedFlatRows: Array<Row<D>>;
}

export interface UseHvRowSelectionRowInstance {
  isSelected: boolean;
  isSomeSelected: boolean;
  toggleRowSelected: (set?: boolean) => void;
  getToggleRowSelectedProps: (
    props?: Partial<UseHvRowSelectionRowCheckboxProps>
  ) => UseHvRowSelectionRowCheckboxProps;
}

export default function useRowSelection<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
