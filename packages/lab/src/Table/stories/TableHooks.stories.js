import React, { useEffect, useMemo, useState } from "react";
import range from "lodash/range";

import { useTable, useRowSelect, usePagination, useSortBy, useExpanded } from "react-table";

import {
  Delete,
  Duplicate,
  Lock,
  Unlock,
  Preview,
  DropDownXS,
  DropRightXS,
} from "@hv/uikit-react-icons";

import { HvBulkActions, HvCheckBox, HvToggleButton, HvButton } from "@hv/uikit-react-core";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTablePagination,
  HvTableRow,
  HvTableBulkActions,
  useHvTableSticky,
} from "../..";

import { makeData, getColumns, useServerData } from "./utils";
import LoadingContainer from "./LoadingContainer";

export const Main = () => {
  const columns = getColumns();
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = useTable({
    columns,
    data,
  });

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader rtCol={col} {...col.getHeaderProps()}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow hover {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell rtCol={cell.column} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const Pagination = () => {
  const data = useMemo(() => makeData(32), []);
  const columns = useMemo(() => getColumns(), []);

  const instance = useTable({ columns, data }, usePagination);
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    state: { pageSize },
  } = instance;

  const EmptyRow = () => (
    <HvTableRow>
      <HvTableCell colSpan="100%" />
    </HvTableRow>
  );

  return (
    <>
      <HvTableContainer style={{ maxHeight: 400 }}>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {range(pageSize).map((i) => {
              const row = page[i];

              if (!row) return <EmptyRow key={i} />;

              prepareRow(row);
              return (
                <HvTableRow hover key={i} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell key={cell.Header} rtCol={cell.column} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvTablePagination rtInstance={instance} />
    </>
  );
};

export const Selection = () => {
  const data = useMemo(() => makeData(6), []);
  const columns = useMemo(
    () => [
      {
        id: "selection",
        padding: "checkbox",
        Cell: ({ row }) => <HvCheckBox {...row.getToggleRowSelectedProps()} />,
      },
      ...getColumns(),
    ],
    []
  );

  const instance = useTable({ columns, data }, useRowSelect);
  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = instance;

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <HvTableRow hover key={row.Header} selected={row.isSelected} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell key={cell.Header} rtCol={cell.column} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const BulkActions = () => {
  const [data, setData] = useState(makeData(64));
  const columns = useMemo(
    () => [
      {
        id: "selection",
        padding: "checkbox",
        Cell: ({ row }) => <HvCheckBox {...row.getToggleRowSelectedProps()} />,
      },
      ...getColumns(),
    ],
    []
  );

  const instance = useTable(
    { columns, data, autoResetSelectedRows: false },
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    selectedFlatRows,
  } = instance;

  const handleAction = (evt, id, action) => {
    const selected = selectedFlatRows.map((el) => el.original);
    console.log(id, action);

    switch (action.id) {
      case "duplicate": {
        const newEls = selected.map((el) => ({
          ...el,
          id: `${el.id}-copy`,
          name: `${el.name}-copy`,
        }));
        setData([...data, ...newEls]);
        break;
      }
      case "delete": {
        const selectedIds = selected.map((el) => el.id);
        setData(data.filter((el) => !selectedIds.includes(el.id)));
        break;
      }
      case "lock":
      case "preview":
      default:
        break;
    }
  };

  return (
    <>
      <HvTableBulkActions
        rtInstance={instance}
        maxVisibleActions={1}
        actionsCallback={handleAction}
        actions={[
          { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
          { id: "delete", label: "Delete", icon: <Delete /> },
          { id: "lock", label: "Lock", icon: <Lock /> },
          { id: "preview", label: "Preview", icon: <Preview /> },
        ]}
      />
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <HvTableRow hover key={row.Header} selected={row.isSelected} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell key={cell.Header} rtCol={cell.column} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvTablePagination rtInstance={instance} />
    </>
  );
};

export const Sortable = () => {
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
    const cols = getColumns();
    cols[5].sortType = sortSeverity;
    return cols;
  }, [sortSeverity]);

  const data = useMemo(
    () =>
      makeData(5).map((entry) => ({
        ...entry,
        // make some entries empty
        status: entry.status === "Closed" ? null : entry.status,
      })),
    []
  );

  const instance = useTable({ columns, data }, useSortBy);
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = instance;

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader
                key={col.Header}
                rtCol={col}
                {...col.getHeaderProps(col.getSortByToggleProps())}
              >
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <HvTableRow hover {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell rtCol={cell.column} {...cell.getCellProps()}>
                    {cell.value ? cell.render("Cell") : "—"}
                  </HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const Expandable = () => {
  const data = useMemo(() => makeData(6), []);
  const columns = useMemo(() => {
    const initialColumns = getColumns().map((col) => ({ ...col, isSortable: true }));
    const expandableHeaderColumn = {
      ...initialColumns[0],
      padding: "none",
      Cell: ({ row, cell }) => (
        <HvButton
          category="ghost"
          startIcon={row.isExpanded ? <DropDownXS /> : <DropRightXS />}
          aria-label={`${row.isExpanded ? "Collapse" : "Expand"} row`}
          aria-expanded={row.isExpanded}
          {...row.getToggleRowExpandedProps()}
        >
          {cell.value}
        </HvButton>
      ),
    };

    return [expandableHeaderColumn, ...initialColumns.slice(1)];
  }, []);

  const instance = useTable({ columns, data }, useExpanded);
  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = instance;

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            // expandable row
            return (
              <React.Fragment key={row.id}>
                <HvTableRow hover {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell rtCol={cell.column} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
                <HvTableRow style={{ display: row.isExpanded ? null : "none" }}>
                  <HvTableCell
                    style={{ paddingBottom: 0, paddingTop: 0, textAlign: "center" }}
                    colSpan="100%"
                  >
                    <code>{JSON.stringify(row.values, null, 2)}</code>
                  </HvTableCell>
                </HvTableRow>
              </React.Fragment>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const StickyHeadersAndColumns = () => {
  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "name", sticky: "left", width: 120 },
      { Header: "Time", accessor: "createdDate", sticky: "right", width: 100 },
      { Header: "Event Type", accessor: "eventType" },
      { Header: "Status", accessor: "status", width: 70 },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => `${value}%`,
        width: 80,
      },
      { Header: "Severity", accessor: "severity", sticky: "left", width: 100 },
      { Header: "Priority", accessor: "priority", width: 80 },
    ],
    []
  );
  const data = useMemo(() => makeData(100), []);

  const {
    getTableProps,
    getTableHeadProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
  } = useTable(
    {
      columns,
      data,
      stickyHeader: true,
    },
    useHvTableSticky
  );

  return (
    <HvTableContainer style={{ maxWidth: 640, maxHeight: 480 }}>
      <HvTable {...getTableProps()}>
        <HvTableHead {...getTableHeadProps()}>
          {headerGroups.map((headerGroup) => (
            <HvTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <HvTableHeader key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          ))}
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow hover key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell key={cell.Header} rtCol={cell.column} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const EmptyCells = () => {
  const columns = getColumns();
  const data = makeData(6).map((entry) => ({
    ...entry,
    // make some entries empty
    status: entry.status === "Closed" ? null : entry.status,
  }));

  const instance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = instance;

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                {col.render("Header")}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow hover key={row.id}>
                {row.cells.map((cell) => {
                  return (
                    <HvTableCell key={cell.column.Header} rtCol={cell.column}>
                      {cell.value ? cell.render("Cell") : "—"}
                    </HvTableCell>
                  );
                })}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const BulkActionsManual = () => {
  const [data, setData] = useState(
    makeData(64).map((el) => ({ ...el, isSelected: false, disabled: false }))
  );

  const columns = useMemo(
    () => [
      {
        id: "selection",
        padding: "checkbox",
        Cell: ({ row }) => (
          <HvCheckBox disabled={row.original.disabled} {...row.getToggleRowSelectedProps()} />
        ),
      },
      ...getColumns(),
      {
        id: "actions",
        padding: "checkbox",
        Cell: ({ row }) => {
          const { id, disabled } = row.original;

          return (
            <HvToggleButton
              aria-label="Lock"
              notSelectedIcon={<Unlock />}
              selectedIcon={<Lock />}
              selected={disabled}
              onClick={() =>
                setData(data.map((el) => (el.id !== id ? el : { ...el, disabled: !disabled })))
              }
            />
          );
        },
      },
    ],
    [data]
  );

  const instance = useTable(
    { columns, data, autoResetSelectedRows: false },
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    rows,
    selectedFlatRows,
  } = instance;

  const enabledRows = useMemo(() => rows.filter((el) => !el.original.disabled), [rows]);
  const enabledPage = useMemo(() => page.filter((el) => !el.original.disabled), [page]);

  const handleSelectAllPages = (checked = true) => {
    enabledRows.forEach((row) => {
      prepareRow(row);
      row.toggleRowSelected(checked);
    });
  };

  const handleSelectAll = () => {
    const anySelected = enabledRows.some((el) => el.isSelected);

    if (anySelected) {
      handleSelectAllPages(false);
    } else {
      enabledPage.forEach((row) => {
        prepareRow(row);
        row.toggleRowSelected(true);
      });
    }
  };

  return (
    <>
      <HvBulkActions
        style={{ marginBottom: 10 }}
        numTotal={rows.length}
        numSelected={selectedFlatRows.length}
        showSelectAllPages
        onSelectAll={handleSelectAll}
        onSelectAllPages={handleSelectAllPages}
      />
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <HvTableRow hover key={row.Header} selected={row.isSelected} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell key={cell.Header} rtCol={cell.column} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvTablePagination rtInstance={instance} />
    </>
  );
};

BulkActionsManual.parameters = {
  docs: {
    description: {
      story:
        "A paginated table with manual selectable rows and bulk actions. The Bulk Actions selection mechanism ignores disabled rows",
    },
  },
};

export const ServerSide = () => {
  const [data, columns, fetchData, loading, pageCount] = useServerData();

  const instance = useTable(
    {
      columns,
      data,
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount,
    },
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    prepareRow,
    page,
    gotoPage,
    state: { pageSize, pageIndex, sortBy },
  } = instance;

  useEffect(() => {
    gotoPage(0);
  }, [sortBy, gotoPage]);

  useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy });
  }, [sortBy, fetchData, pageIndex, pageSize]);

  const EmptyRow = () => (
    <HvTableRow>
      <HvTableCell colSpan="100%" />
    </HvTableRow>
  );

  return (
    <LoadingContainer loading={loading}>
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableCell
                  key={col.Header}
                  rtCol={col}
                  {...col.getHeaderProps(col.getSortByToggleProps())}
                >
                  {col.render("Header")}
                </HvTableCell>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps({ style: { position: "relative" } })}>
            {range(pageSize).map((i) => {
              const row = page[i];

              if (!row) return <EmptyRow key={i} />;

              prepareRow(row);
              return (
                <HvTableRow hover {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell rtCol={cell.column} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvTablePagination rtInstance={instance} />
    </LoadingContainer>
  );
};

ServerSide.parameters = {
  docs: {
    description: {
      story:
        "A table with sorting and pagination handled server-side, using React Table. Set `manualPagination` and `manualSortBy` to have manual control over pagination and sorting.",
    },
  },
};
