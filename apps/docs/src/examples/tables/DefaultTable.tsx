import { useCallback, useMemo, useState } from "react";
import {
  HvActionGeneric,
  HvBulkActions,
  HvEmptyState,
  HvIconButton,
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
  HvTableSection,
  HvTableState,
  useHvBulkActions,
  useHvPagination,
  useHvRowSelection,
  useHvSortBy,
  useHvTable,
  useHvTableSticky,
} from "@hitachivantara/uikit-react-core";
import {
  Ban,
  Delete,
  Duplicate,
  Preview,
} from "@hitachivantara/uikit-react-icons";

import { AssetEvent, makeData } from "./makeData";

export default function Demo() {
  const [data, setData] = useState(() => makeData(128));

  const deleteRow = useCallback((row: HvRowInstance<AssetEvent>) => {
    setData((prev) => prev.filter((r) => r.id !== row.original.id));
  }, []);

  const columns = useMemo<HvTableColumnConfig<AssetEvent>[]>(
    () => [
      { Header: "Title", accessor: "name", style: { minWidth: 120 } },
      { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
      { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
      { Header: "Status", accessor: "status", style: { minWidth: 100 } },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => `${value}%`,
      },
      { Header: "Severity", accessor: "severity" },
      { Header: "Priority", accessor: "priority" },
      {
        id: "delete",
        variant: "actions",
        Cell: ({ row }) => (
          <HvIconButton title="Delete" onClick={() => deleteRow(row)}>
            <Delete />
          </HvIconButton>
        ),
      },
    ],
    [deleteRow],
  );

  return (
    <MyTable
      data={data}
      columns={columns}
      bulkActions={[
        { id: "clone", label: "Clone", icon: <Duplicate /> },
        { id: "remove", label: "Remove", icon: <Delete /> },
        { id: "preview", label: "Preview", icon: <Preview />, disabled: true },
      ]}
      onBulkAction={(evt, action, selectedRows) => {
        if (action.id === "remove") {
          selectedRows.forEach(deleteRow);
        } else if (action.id === "clone") {
          const clonedData = selectedRows.map(({ original }) => ({
            ...original,
            id: `${original.id}-copy`,
            name: `${original.name}-copy`,
          }));
          setData((prev) => prev.concat(clonedData));
        }
      }}
      options={{
        // other `useHvTable` options
        getRowId: (row) => row.id,
        initialState: {
          pageSize: 10,
        },
      }}
    />
  );
}

/**
 * A generic client-side table.
 * Includes row selection & sorting, bulk actions, pagination, sticky headers.
 */
export const MyTable = <T extends object>(props: {
  columns: HvTableColumnConfig<T>[];
  data: T[] | undefined;
  initialState?: Partial<HvTableState<T>>;
  bulkActions?: HvActionGeneric[];
  onBulkAction?: (
    event: React.SyntheticEvent,
    action: HvActionGeneric,
    selectedRows: HvTableInstance<T>["selectedFlatRows"],
  ) => void;
  options?: HvTableOptions<T>;
}) => {
  const { columns, data, bulkActions, onBulkAction, options } = props;

  const table = useHvTable<T>(
    {
      columns,
      data,
      stickyHeader: true,
      ...options,
    },
    useHvTableSticky,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions,
  );

  const renderTableRow = (i: number) => {
    const row = table.page[i];

    if (!row) {
      // render up to 16 <EmptyRow> when there are multiple pages
      const showEmptyRow = table.pageCount && table.pageCount > 1 && i < 16;
      return showEmptyRow ? (
        <HvTableRow key={`empty-${i}`}>
          <HvTableCell colSpan={100} />
        </HvTableRow>
      ) : null;
    }

    table.prepareRow(row);

    return (
      <HvTableRow {...row.getRowProps()} key={row.getRowProps().key}>
        {row.cells.map((cell) => (
          <HvTableCell
            className="text-nowrap"
            {...cell.getCellProps()}
            key={cell.getCellProps().key}
          >
            {cell.render("Cell")}
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  };

  return (
    <HvTableSection>
      {table.page.length > 0 && (
        <HvBulkActions
          actions={bulkActions}
          maxVisibleActions={1}
          onAction={(evt, action) => {
            onBulkAction?.(evt, action, table.selectedFlatRows);
          }}
          {...table.getHvBulkActionsProps?.()}
        />
      )}
      <HvTableContainer className="max-h-500px">
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
            {table.page.length > 0 ? (
              [...Array(table.state.pageSize).keys()].map(renderTableRow)
            ) : (
              <HvTableRow>
                <HvTableCell colSpan={100} style={{ height: 96 }}>
                  <HvEmptyState message="No data to display" icon={<Ban />} />
                </HvTableCell>
              </HvTableRow>
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {table.page.length > 0 && (
        <HvPagination {...table.getHvPaginationProps?.()} />
      )}
    </HvTableSection>
  );
};
