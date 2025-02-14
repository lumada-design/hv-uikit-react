import { useEffect, useMemo, useState, useTransition } from "react";
import { css } from "@emotion/css";
import { useDebounce } from "usehooks-ts";
import {
  HvActionsGeneric,
  HvBulkActions,
  HvEmptyState,
  HvLoadingContainer,
  HvPagination,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableSection,
  useHvBulkActions,
  useHvPagination,
  useHvRowSelection,
  useHvSortBy,
  useHvTable,
  useHvTableSticky,
  type HvActionGeneric,
  type HvCellProps,
  type HvRowInstance,
  type HvTableColumnConfig,
  type HvTableInstance,
  type HvTableOptions,
  type HvTableState,
} from "@hitachivantara/uikit-react-core";
import { Ban } from "@hitachivantara/uikit-react-icons";

const classes = {
  container: css({
    paddingBottom: 0,
    maxHeight: 600,
  }),
};

const getPageCount = (totalRecords = 0, pageSize = 10) =>
  Math.max(Math.ceil(totalRecords / pageSize), 1);

const NoDataRow = ({
  message,
  height = 96,
}: {
  message: React.ReactNode;
  height?: number;
}) => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height }}>
      <HvEmptyState message={message} icon={<Ban />} />
    </HvTableCell>
  </HvTableRow>
);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell style={{ borderBottom: 0 }} colSpan={100} />
  </HvTableRow>
);

export interface TableAction<T extends object = Record<string, unknown>>
  extends HvActionGeneric {
  isBulk?: boolean;
  /** Whether the action is visible for a given `row`. Defaults to `true` */
  visible?: (row: HvCellProps<T>["row"]) => boolean;
  url?: string;
}

export interface TableProps<T extends object = Record<string, unknown>> {
  columns: HvTableColumnConfig<T>[];
  data: T[] | undefined;
  recordCount?: number;
  isLoading?: boolean;
  initialState?: Partial<HvTableState<T>>;
  actions?: TableAction<T>[];
  maxVisibleActions?: number;
  showBulkActions?: boolean;
  showPagination?: boolean;
  hideSelectors?: boolean;
  labels?: {
    loading?: string;
    empty?: string;
    selectAllPages?: string;
  };
  onAction?: (
    event: React.SyntheticEvent,
    action: TableAction<T>,
    row: HvRowInstance<T>,
  ) => void;
  onBulkAction?: (
    event: React.SyntheticEvent,
    action: HvActionGeneric,
    selectedRows: HvTableInstance<T>["selectedFlatRows"],
  ) => void;
  onUpdate?: (tableParams: Partial<HvTableState<T>>) => void;
  options?: HvTableOptions<T>;
}

/**
 * A simple generic server-side `HvTable` wrapper.
 * Includes optional single/bulk selection, sort, pagination, actions, and loading state.
 */
export const TableComplete = <T extends object>(props: TableProps<T>) => {
  const {
    columns: columnsProp,
    data,
    recordCount,
    isLoading = false,
    initialState,
    actions,
    maxVisibleActions = 1,
    showBulkActions,
    showPagination,
    hideSelectors,
    labels = {
      loading: "",
      empty: "No data",
      selectAllPages: "Select all pages",
    },
    onAction,
    onBulkAction,
    onUpdate,
    options,
  } = props;
  const [pageCount, setPageCount] = useState(getPageCount(recordCount));
  const [pending, startTransition] = useTransition();
  const isPending = useDebounce(pending, 50);

  const columns = useMemo(() => {
    if (!actions?.length) return columnsProp;

    const actionsColumn: (typeof columnsProp)[number] = {
      id: "_actions",
      variant: "actions",
      style: { overflow: "hidden" },
      Cell: ({ row }: { row: HvRowInstance<T> }) => (
        <HvActionsGeneric
          actions={actions}
          disabled={actions.every((a) => a.disabled)}
          maxVisibleActions={0}
          onAction={(evt, action) => onAction?.(evt, action, row)}
        />
      ),
    };

    return [...columnsProp, actionsColumn];
  }, [actions, columnsProp, onAction]);

  const bulkActions = useMemo(
    () => actions?.filter((a) => !!a.isBulk).map(({ isBulk, ...rest }) => rest),
    [actions],
  );

  const table = useHvTable<T>(
    {
      columns,
      data,
      pageCount,
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      disableMultiSort: true,
      stickyHeader: true,
      stateReducer: (newState, action) => {
        if (action.type === "toggleSortBy") {
          // Go back to first page when sorting columns
          return { ...newState, pageIndex: 0 };
        }

        return newState;
      },
      initialState: {
        ...(hideSelectors && { hiddenColumns: ["_hv_selection"] }),
        ...initialState,
      },
      ...options,
    },
    useHvTableSticky,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions,
  );

  const { pageIndex, pageSize, sortBy } = table.state;

  // Handle pageCount local calculation
  useEffect(() => {
    if (!recordCount) return;
    setPageCount(getPageCount(recordCount, pageSize));
  }, [pageSize, recordCount]);

  useEffect(() => {
    startTransition(() => {
      onUpdate?.({ pageIndex, pageSize, sortBy });
    });
  }, [onUpdate, pageIndex, pageSize, sortBy]);

  const renderTableRow = (i: number) => {
    const row = table.page[i];

    if (!row) {
      // render EmptyRow only when there are multiple pages
      const showEmptyRows = pageCount > 1;
      return showEmptyRows ? <EmptyRow key={`empty-${i}`} /> : null;
    }

    table.prepareRow(row);
    const { key, ...rowProps } = row.getRowProps({ "aria-rowindex": i + 1 });

    return (
      <HvTableRow key={key} {...rowProps}>
        {row.cells.map((cell) => (
          <HvTableCell {...cell.getCellProps()} key={cell.getCellProps().key}>
            {cell.render("Cell")}
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  };

  return (
    <HvTableSection>
      {showBulkActions && table.page.length > 0 && (
        <HvBulkActions
          maxVisibleActions={maxVisibleActions}
          actions={bulkActions}
          selectAllPagesLabel={labels.selectAllPages}
          onAction={(evt, action) => {
            onBulkAction?.(evt, action, table.selectedFlatRows);
          }}
          {...table.getHvBulkActionsProps?.()}
        />
      )}
      <HvLoadingContainer
        hidden={!(isPending || isLoading)}
        label={labels.loading}
      >
        <HvTableContainer className={classes.container}>
          <HvTable {...table.getTableProps()}>
            <HvTableHead {...table.getTableHeadProps?.()}>
              {table.headerGroups.map((headerGroup) => (
                <HvTableRow
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroup.getHeaderGroupProps().key}
                >
                  {headerGroup.headers.map((col) => (
                    <HvTableHeader
                      {...col.getHeaderProps()}
                      key={col.getHeaderProps().key}
                    >
                      {col.render("Header")}
                    </HvTableHeader>
                  ))}
                </HvTableRow>
              ))}
            </HvTableHead>
            <HvTableBody {...table.getTableBodyProps()}>
              {!data || data.length === 0 ? (
                <NoDataRow message={labels.empty} />
              ) : (
                [...Array(pageSize).keys()].map(renderTableRow)
              )}
            </HvTableBody>
          </HvTable>
        </HvTableContainer>
      </HvLoadingContainer>
      {showPagination && table.page.length > 0 && (
        <HvPagination {...table.getHvPaginationProps?.()} />
      )}
    </HvTableSection>
  );
};
