import React, { useEffect, useMemo, useState } from "react";
import range from "lodash/range";
import { useTable, useRowSelect, usePagination, useSortBy } from "react-table";

import { Ban, Delete, Duplicate, Lock, Preview } from "@hv/uikit-react-icons";
import { HvCheckBox, HvDropDownMenu, HvEmptyState } from "@hv/uikit-react-core";

import {
  HvTable,
  HvTableBody,
  HvTableBulkActions,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTablePagination,
  HvTableRow,
} from "../..";

import { makeData, getColumns, useToggleIndex, useServerData } from "./utils";
import LoadingContainer from "./LoadingContainer";

export default {
  title: "Lab/Table",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTable } from '@hv/uikit-react-core'",
  },
  component: HvTable,
  subcomponents: {
    HvTableBody,
    HvTableCell,
    HvTableContainer,
    HvTableHead,
    HvTablePagination,
    HvTableRow,
  },
};

export const Main = () => (
  <HvTableContainer>
    <HvTable>
      <HvTableHead>
        <HvTableRow>
          {getColumns().map((el) => (
            <HvTableCell key={el.Header}>{el.Header}</HvTableCell>
          ))}
        </HvTableRow>
      </HvTableHead>
      <HvTableBody>
        {makeData(6).map((el) => (
          <HvTableRow key={el.id} hover>
            <HvTableCell>{el.name}</HvTableCell>
            <HvTableCell>{el.createdDate}</HvTableCell>
            <HvTableCell>{el.eventType}</HvTableCell>
            <HvTableCell>{el.status}</HvTableCell>
            <HvTableCell>{el.riskScore}</HvTableCell>
            <HvTableCell>{el.severity}</HvTableCell>
            <HvTableCell>{el.priority}</HvTableCell>
          </HvTableRow>
        ))}
      </HvTableBody>
    </HvTable>
  </HvTableContainer>
);

Main.parameters = {
  docs: {
    description: { story: "A minimal table example." },
  },
};

export const Empty = () => {
  const EmptyRow = () => (
    <HvTableRow>
      <HvTableCell colSpan="100%" style={{ height: 100 }}>
        <HvEmptyState message="No data to display" icon={<Ban role="presentation" />} />
      </HvTableCell>
    </HvTableRow>
  );
  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {getColumns().map((el) => (
              <HvTableCell key={el.Header}>{el.Header}</HvTableCell>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          <EmptyRow />
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const EmptyCells = () => {
  const data = makeData(6).map((entry) => ({
    ...entry,
    // make some entries empty
    status: entry.status === "Closed" ? null : entry.status,
  }));
  const columns = getColumns();

  const instance = useTable({ columns, data }, useRowSelect);
  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = instance;

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableCell
                key={col.Header}
                rtCol={col}
                {...col.getHeaderProps({ style: { width: col.width } })}
              >
                {col.render("Header")}
              </HvTableCell>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow key={row.id}>
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

EmptyCells.parameters = {
  docs: {
    description: {
      story: "Table cells with null or empty values should instead display an em-dash (—).",
    },
  },
};

export const SelectableSimple = () => {
  const [checkedIdx, toggleChecked] = useToggleIndex(0);
  const data = useMemo(() => makeData(6), []);
  const actions = useMemo(() => range(3).map((i) => ({ label: `Option ${i + 1}` })), []);

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            <HvTableCell padding="checkbox" />
            {getColumns().map((el) => (
              <HvTableCell key={el.Header}>{el.Header}</HvTableCell>
            ))}
            <HvTableCell padding="checkbox" />
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el, idx) => (
            <HvTableRow key={el.id} hover selected={checkedIdx === idx}>
              <HvTableCell padding="checkbox">
                <HvCheckBox checked={checkedIdx === idx} onClick={toggleChecked(idx)} />
              </HvTableCell>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
              <HvTableCell padding="checkbox">
                <HvDropDownMenu keepOpened={false} placement="left" dataList={actions} />
              </HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

SelectableSimple.parameters = {
  docs: {
    description: { story: "A table with checkboxes being managed by a simple hook." },
  },
};

export const Selectable = () => {
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
              <HvTableCell key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                {col.render("Header")}
              </HvTableCell>
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

Selectable.parameters = {
  docs: {
    description: {
      story: "A table with selectable rows being managed by `react-table`.",
    },
  },
};

export const Sortable = () => {
  const data = useMemo(
    () =>
      makeData(5).map((entry) => ({
        ...entry,
        // make some entries empty
        status: entry.status === "Closed" ? null : entry.status,
      })),
    []
  );
  const columns = useMemo(() => getColumns().map((col) => ({ ...col, isSortable: true })), []);

  const instance = useTable({ columns, data }, useSortBy, useRowSelect);
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = instance;

  return (
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

Sortable.parameters = {
  docs: {
    description: { story: "A table with multi column sorting, managed by `react-table`." },
  },
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
        <HvTable stickyHeader {...getTableProps()}>
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableCell key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                  {col.render("Header")}
                </HvTableCell>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {range(pageSize).map((i) => {
              const row = page[i];

              if (!row) return <EmptyRow key={i} />;

              prepareRow(row);
              return (
                <HvTableRow key={i} {...row.getRowProps()}>
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

Pagination.parameters = {
  docs: {
    description: {
      story:
        "A table with a sticky header and pagination managed by `react-table`. " +
        "The `HvTableContainer` has a maximum height and the header rows are sticky, " +
        "preventing the table to grow excessively when there are many rows per page.",
    },
  },
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

  const instance = useTable({ columns, data }, usePagination, useRowSelect);
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
    console.log(evt, id, action);

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
                <HvTableCell key={col.Header} rtCol={col} {...col.getHeaderProps()}>
                  {col.render("Header")}
                </HvTableCell>
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

BulkActions.parameters = {
  docs: {
    description: {
      story: "A paginated table with selectable rows and bulk actions.",
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
