import { MouseEventHandler } from "react";
import { Hooks, TableExpandedToggleProps, UseExpandedRowProps } from "react-table";

export interface UseHvRowExpandTableRowProps {
  expanded?: boolean;
}

export type UseHvRowExpandTableOptions = {
  disableCreateExpandButton?: boolean;
};

export interface UseHvRowExpandRowToggleProps extends TableExpandedToggleProps {
  onClick?: MouseEventHandler<unknown>;
}

export interface UseHvRowExpandRowInstance<D extends object = Record<string, unknown>>
  extends UseExpandedRowProps<D> {
  getToggleRowExpandedProps: (
    props?: Partial<TableExpandedToggleProps>
  ) => UseHvRowExpandRowToggleProps;
}

export default function useRowExpand<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
