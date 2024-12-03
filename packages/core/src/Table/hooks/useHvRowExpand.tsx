import {
  Hooks,
  TableExpandedToggleProps,
  UseExpandedRowProps,
} from "react-table";
import { DropDownXS } from "@hitachivantara/uikit-react-icons";

import { HvButton } from "../../Button";
import { useLabels } from "../../hooks/useLabels";
import { HvTypography } from "../../Typography";
import type { HvCellProps } from "./useHvTable";

// #region ##### TYPES #####

export interface UseHvRowExpandTableRowProps {
  expanded?: boolean;
}

export type UseHvRowExpandTableOptions = {
  disableCreateExpandButton?: boolean;
};

export interface UseHvRowExpandRowToggleProps extends TableExpandedToggleProps {
  onClick?: React.MouseEventHandler<unknown>;
}

export interface UseHvRowExpandRowInstance<
  D extends object = Record<string, unknown>,
> extends UseExpandedRowProps<D> {
  getToggleRowExpandedProps: (
    props?: Partial<TableExpandedToggleProps>,
  ) => UseHvRowExpandRowToggleProps;
}

export type UseRowExpandProps = (<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>,
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

const DEFAULT_LABELS = {
  expandRowButtonAriaLabel: "Expand this row",
  collapseRowButtonAriaLabel: "Collapse this row",
};

export const CellWithExpandButton = ({
  row,
  cell,
  labels: labelsProp,
}: HvCellProps<any>) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);
  const rowProps = row.getToggleRowExpandedProps?.();

  return (
    <>
      <HvButton
        icon
        aria-label={
          row.isExpanded
            ? labels.collapseRowButtonAriaLabel
            : labels.expandRowButtonAriaLabel
        }
        aria-expanded={row.isExpanded}
        onClick={rowProps?.onClick}
      >
        <DropDownXS rotate={row.isExpanded} />
      </HvButton>
      {cell?.value && (
        <HvTypography variant="label" component="span">
          {cell.value}
        </HvTypography>
      )}
    </>
  );
};

const visibleColumnsHook = (columns: any, { instance }: any) => {
  if (instance.disableCreateExpandButton) {
    return columns;
  }

  // add a button to first data column, unless it has a custom renderer
  // if so, add an extra column instead
  const firstDataColumnIndex = columns.findIndex(
    (c: any) => c.id?.indexOf("_hv_") !== 0,
  );

  if (firstDataColumnIndex !== -1) {
    const firstDataColumn = columns[firstDataColumnIndex];

    if (firstDataColumn.Cell == null) {
      firstDataColumn.Cell = CellWithExpandButton;
      firstDataColumn.variant = "expand";

      return columns;
    }
  }

  const expandColumn = {
    id: "_hv_expand",
    variant: "none",

    width: 32,

    // this will only work when using useHvTableSticky
    // but ensures it stays left of any sticky column
    sticky: "left",

    Cell: CellWithExpandButton,
  };

  const columnsCopy = [...columns];
  columnsCopy.splice(
    firstDataColumnIndex !== -1 ? firstDataColumnIndex : 0,
    0,
    expandColumn,
  );

  return columnsCopy;
};

const getRowPropsHook = (props: any, { row }: any) => {
  const nextProps: UseHvRowExpandTableRowProps = {
    expanded: row.isExpanded,
  };

  return [props, nextProps];
};

export const useHvRowExpand: UseRowExpandProps = (hooks) => {
  hooks.visibleColumns.push(visibleColumnsHook);
  hooks.getRowProps.push(getRowPropsHook);
};
useHvRowExpand.pluginName = "useHvRowExpand";
