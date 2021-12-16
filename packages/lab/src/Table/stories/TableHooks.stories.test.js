import React, { useMemo, useState, useCallback } from "react";

import { useFilters, useGlobalFilter } from "react-table";

import {
  HvBulkActions,
  HvCheckBox,
  HvDropdown,
  HvEmptyState,
  HvGrid,
  HvInput,
  HvPagination,
} from "@hv/uikit-react-core";
import { Ban, Delete } from "@hv/uikit-react-icons";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvTable,
  useHvSortBy,
  useHvBulkActions,
  useHvPagination,
  useHvRowSelection,
} from "../..";

import { makeData, getLongNameColumns, getColumns } from "./utils";

export default {
  title: "Tests/TableHooks",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

export const SortFixedLayout = () => {
  const sortSeverity = useMemo(() => {
    const levels = ["minor", "average", "major", "critical"];

    return (rowA, rowB, columnId) => {
      const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
      const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

      // eslint-disable-next-line no-nested-ternary
      return a === b ? 0 : a > b ? 1 : -1;
    };
  }, []);

  const columns = useMemo(() => {
    const cols = getLongNameColumns();
    cols[5].sortType = sortSeverity;
    return cols;
  }, [sortSeverity]);

  const data = useMemo(() => makeData(5), []);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useHvTable(
    { columns, data },
    useHvSortBy
  );

  return (
    <HvTableContainer>
      <HvTable style={{ tableLayout: "fixed" }} {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

SortFixedLayout.parameters = {
  docs: {
    description: {
      story:
        "A table with sorting and pagination handled server-side, using React Table. Set `manualPagination` and `manualSortBy` to have manual control over pagination and sorting.",
    },
  },
};

export const SortFixedLayoutSmall = () => {
  const sortSeverity = useMemo(() => {
    const levels = ["minor", "average", "major", "critical"];

    return (rowA, rowB, columnId) => {
      const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
      const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

      // eslint-disable-next-line no-nested-ternary
      return a === b ? 0 : a > b ? 1 : -1;
    };
  }, []);

  const columns = useMemo(() => {
    const cols = getLongNameColumns();
    cols[5].sortType = sortSeverity;
    return cols;
  }, [sortSeverity]);

  const data = useMemo(() => makeData(5), []);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useHvTable(
    { columns, data },
    useHvSortBy
  );

  return (
    <HvTableContainer style={{ width: "728px" }}>
      <HvTable style={{ tableLayout: "fixed" }} {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

SortFixedLayoutSmall.parameters = {
  docs: {
    description: {
      story:
        "A table with sorting and pagination handled server-side, using React Table. Set `manualPagination` and `manualSortBy` to have manual control over pagination and sorting.",
    },
  },
};

const statusDropdownValues = [{ label: "Closed" }, { label: "Open" }];

const getRowId = (v) => v.id.toString();

const EmptyStateRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 96 }}>
      <HvEmptyState message="No data to display." icon={<Ban role="presentation" />} />
    </HvTableCell>
  </HvTableRow>
);

export const BulkActionsInFilteredTable = () => {
  const [
    applyToggleAllRowsSelectedToPrefilteredRows,
    setapplyToggleAllRowsSelectedToPrefilteredRows,
  ] = useState(true);

  const filterStatus = useCallback(
    (rows, col, filterValue) =>
      filterValue != null && filterValue.length > 0
        ? rows.filter((row) => filterValue.indexOf(row.original[col[0]]) !== -1)
        : rows,
    []
  );

  const columns = useMemo(() => {
    const cols = getColumns();
    cols[3].filter = filterStatus;
    return cols;
  }, [filterStatus]);
  const [data, setData] = useState(makeData(64));

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    selectedFlatRows,
    state: { selectedRowIds },
    toggleAllRowsSelected,
    getHvBulkActionsProps,
    getHvPaginationProps,
    setGlobalFilter,
    setFilter,
  } = useHvTable(
    {
      columns,
      getRowId,
      data,
      applyToggleAllRowsSelectedToPrefilteredRows,
    },
    useFilters,
    useGlobalFilter,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const handleAction = useCallback(
    (_evt, id, action) => {
      const selected = applyToggleAllRowsSelectedToPrefilteredRows
        ? Object.keys(selectedRowIds)
        : selectedFlatRows.map((el) => el.id);

      switch (action.id) {
        case "delete": {
          toggleAllRowsSelected(false);
          setData(data.filter((el) => !selected.includes(el.id)));
          break;
        }
        default:
          break;
      }
    },
    [
      applyToggleAllRowsSelectedToPrefilteredRows,
      data,
      selectedFlatRows,
      selectedRowIds,
      toggleAllRowsSelected,
    ]
  );

  return (
    <>
      <HvGrid container alignItems="flex-end" style={{ paddingBottom: 20 }}>
        <HvGrid item xs={4}>
          <HvInput
            label="Global search"
            type="search"
            onEnter={(e, value) => {
              setGlobalFilter(value);
            }}
          />
        </HvGrid>
        <HvGrid item xs={4}>
          <HvDropdown
            label="Status"
            multiSelect
            values={statusDropdownValues}
            onChange={(value) => {
              setFilter(
                "status",
                value.map((v) => v.label)
              );
            }}
          />
        </HvGrid>
        <HvGrid item xs={4}>
          <HvCheckBox
            label="Apply bulk selection to prefiltered data"
            checked={applyToggleAllRowsSelectedToPrefilteredRows}
            onChange={(e, v) => setapplyToggleAllRowsSelectedToPrefilteredRows(v)}
          />
        </HvGrid>
      </HvGrid>
      <HvBulkActions
        {...getHvBulkActionsProps()}
        maxVisibleActions={1}
        actionsCallback={handleAction}
        actions={[{ id: "delete", label: "Delete", icon: <Delete /> }]}
      />
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page?.length ? (
              page.map((row) => {
                prepareRow(row);

                return (
                  <HvTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                    ))}
                  </HvTableRow>
                );
              })
            ) : (
              <EmptyStateRow />
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? <HvPagination {...getHvPaginationProps()} /> : undefined}
    </>
  );
};

BulkActionsInFilteredTable.parameters = {
  eyes: {
    // excluded due to dynamic data
    include: false,
  },
};
