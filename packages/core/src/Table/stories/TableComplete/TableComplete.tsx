import { ReactNode, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { css } from "@emotion/css";
import { Ban } from "@hitachivantara/uikit-react-icons";
import {
  HvActionGeneric,
  HvActionsGeneric,
  HvBulkActions,
  HvCellProps,
  HvEmptyState,
  HvPagination,
  HvRowInstance,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableInstance,
  HvTableOptions,
  HvTableRow,
  HvTableState,
  theme,
  useHvBulkActions,
  useHvPagination,
  useHvRowSelection,
  useHvSortBy,
  useHvTable,
  useHvTableSticky,
} from "@hitachivantara/uikit-react-core";

import { LoadingContainer } from "../TableSamples/LoadingContainer";

const classes = {
  root: css({}),
  container: css({
    paddingBottom: 0,
    maxHeight: 600,
  }),
  loadingContainer: css({
    height: "inherit",
  }),
  pagination: css({
    zIndex: "unset",
  }),
  selectAllPages: css({
    color: theme.colors.primary,
    marginLeft: theme.spacing(["xs"]),
  }),
};

const EM_DASH = "—";

const DEFAULT_PAGE_SIZE = 10;

const getPageCount = (totalRecords = 0, pageSize = DEFAULT_PAGE_SIZE) =>
  Math.max(Math.ceil(totalRecords / pageSize), 1);

const NoDataRow = ({
  message,
  height = 96,
}: {
  message: ReactNode;
  height?: number;
}) => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height }}>
      <HvEmptyState message={message} icon={<Ban role="none" />} />
    </HvTableCell>
  </HvTableRow>
);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell style={{ borderBottom: 0 }} colSpan={100}>
      &nbsp;
    </HvTableCell>
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
  columns: HvTableColumnConfig<T, any>[];
  data: T[] | undefined;
  recordCount?: number;
  loading?: boolean;
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
    event: SyntheticEvent,
    action: TableAction<T>,
    row: HvRowInstance<T>
  ) => void;
  onSelection?: (selectedRowIds: HvTableState<T>["selectedRowIds"]) => void;
  onBulkAction?: (
    event: SyntheticEvent,
    action: HvActionGeneric,
    selectedRows: HvTableInstance<T>["selectedFlatRows"]
  ) => void;
  onUpdate?: (tableParams: HvTableState<T>) => void;
  onData?: (data: TableProps<T>["data"]) => void;
  options?: HvTableOptions<T>;
}

/**
 * A simple generic server-side `HvTable` wrapper.
 * Includes optional single/bulk selection, sort, pagination, actions, and loading state.
 */
export const TableComplete = <T extends object>(props: TableProps<T>) => {
  const {
    columns: columnsProp,
    data: dataProp,
    recordCount,
    loading = false,
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
    onSelection,
    onUpdate,
    onData,
    options,
  } = props;
  const [pageCount, setPageCount] = useState(getPageCount(recordCount));
  const [data, setData] = useState(dataProp);

  const columns = useMemo(() => {
    if (!actions?.length) return columnsProp;

    const actionsColumn: (typeof columnsProp)[number] = {
      id: "_actions",
      variant: "actions",
      style: { overflow: "hidden" },
      Cell: ({ row }) => (
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
    [actions]
  );

  const {
    getTableProps,
    getTableHeadProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    selectedFlatRows,
    getHvBulkActionsProps,
    getHvPaginationProps,
    state: { pageSize },
  } = useHvTable<T, any>(
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
      stateReducer: (newState, action, prevState, instance) => {
        if (action.type === "toggleSortBy") {
          // Go back to first page when sorting columns
          instance?.gotoPage?.(0);
        }

        switch (action.type) {
          // events that trigger a data fetch
          case "init":
          case "toggleSortBy":
          case "gotoPage":
          case "setPageSize":
            onUpdate?.(newState);
            break;
          case "toggleRowSelected":
          case "toggleAllRowsSelected":
          case "toggleAllPageRowsSelected":
            onSelection?.(newState.selectedRowIds);
            break;
          default:
            break;
        }

        return newState;
      },
      defaultColumn: { Cell: ({ value }: HvCellProps<T>) => value ?? EM_DASH },
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
    useHvBulkActions
  );

  useEffect(() => {
    if (loading) return; // keep old data while page is loading

    setData(dataProp);
    onData?.(dataProp);
  }, [onData, dataProp, loading]);

  // Handle pageCount local calculation
  useEffect(() => {
    if (!recordCount) return;
    setPageCount(getPageCount(recordCount, pageSize));
  }, [pageSize, recordCount]);

  const renderTableRow = (i: number) => {
    const row = page[i];

    if (!row) {
      // render EmptyRow only when there are multiple pages
      const showEmptyRows = pageCount > 1;
      return showEmptyRows ? <EmptyRow key={`empty-${i}`} /> : null;
    }

    prepareRow(row);

    return (
      <HvTableRow {...row.getRowProps({ "aria-rowindex": i + 1 })}>
        {row.cells.map((cell) => (
          <HvTableCell {...cell.getCellProps()}>
            {cell.render("Cell")}
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  };

  return (
    <>
      {showBulkActions && page.length > 0 && (
        <HvBulkActions
          maxVisibleActions={maxVisibleActions}
          actions={bulkActions}
          classes={{ selectAllPages: classes.selectAllPages }}
          selectAllPagesLabel={labels.selectAllPages}
          onAction={(evt, action) =>
            onBulkAction?.(evt, action, selectedFlatRows)
          }
          {...getHvBulkActionsProps?.()}
        />
      )}
      <LoadingContainer
        loading={loading}
        label={labels.loading}
        className={classes.loadingContainer}
      >
        <HvTableContainer className={classes.container}>
          <HvTable {...getTableProps()}>
            <HvTableHead {...getTableHeadProps?.()}>
              {headerGroups.map((headerGroup) => (
                <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((col) => (
                    <HvTableHeader {...col.getHeaderProps()}>
                      {col.render("Header")}
                    </HvTableHeader>
                  ))}
                </HvTableRow>
              ))}
            </HvTableHead>
            <HvTableBody {...getTableBodyProps()}>
              {!data || data.length === 0 ? (
                <NoDataRow message={labels.empty} />
              ) : (
                [...Array(pageSize).keys()].map(renderTableRow)
              )}
            </HvTableBody>
          </HvTable>
        </HvTableContainer>
      </LoadingContainer>
      {showPagination && page.length > 0 && (
        <HvPagination
          classes={{ root: classes.pagination }}
          {...getHvPaginationProps?.()}
        />
      )}
    </>
  );
};
