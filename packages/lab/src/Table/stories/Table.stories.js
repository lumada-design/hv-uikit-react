import React, { useEffect, useMemo, useState } from "react";
import range from "lodash/range";
import { useTable, useRowSelect, usePagination, useSortBy, useExpanded } from "react-table";

import {
  Ban,
  DropDownXS,
  DropRightXS,
  Delete,
  Duplicate,
  Lock,
  Unlock,
  Preview,
} from "@hv/uikit-react-icons";
import {
  HvButton,
  HvBulkActions,
  HvCheckBox,
  HvDropDownMenu,
  HvEmptyState,
  HvToggleButton,
  HvTypography,
} from "@hv/uikit-react-core";

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

export const Expandable = () => {
  const data = useMemo(() => makeData(6), []);
  const columns = useMemo(() => {
    const initialColumns = getColumns().map((col) => ({ ...col, isSortable: true }));
    const selectionColumn = {
      id: "selection",
      padding: "checkbox",
      Cell: ({ row }) => <HvCheckBox {...row.getToggleRowSelectedProps()} />,
    };
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

    return [selectionColumn, expandableHeaderColumn, ...initialColumns.slice(1)];
  }, []);

  const instance = useTable({ columns, data }, useSortBy, useExpanded, useRowSelect);
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

            // expandable row
            return (
              <React.Fragment key={row.id}>
                <HvTableRow hover selected={row.isSelected} {...row.getRowProps()}>
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

Expandable.parameters = {
  docs: {
    description: {
      story: "A table with expandable custom rows being managed by `react-table`.",
    },
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
      story: "A paginated table with selectable rows and bulk actions managed by `react-table`.",
    },
  },
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

export const TableRowClick = () => {
  const initialData = useMemo(() => makeData(6), []);
  const data = initialData.map((row) => {
    const updatedRow = { ...row };
    updatedRow.link =
      "https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx";
    return updatedRow;
  });
  const columns = useMemo(() => getColumns(), []);
  columns.push({
    Header: "Details",
    accessor: "link",
    Cell: (props) => {
      const { row } = props;
      const { original } = row;
      const { link } = original;

      return (
        <HvTypography variant="xsInlineLink" component="a" href={link}>
          Details Page
        </HvTypography>
      );
    },
  });
  const instance = useTable({ columns, data }, useRowSelect);
  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = instance;

  const onRowClicked = (row) => {
    const win = window.open(row.original.link, "_blank");
    win.focus();
  };

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
              <HvTableRow
                hover
                key={row.Header}
                selected={row.isSelected}
                onClick={(e) => onRowClicked(row, e)}
                {...row.getRowProps({
                  style: { cursor: "pointer" },
                })}
              >
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

TableRowClick.parameters = {
  docs: {
    description: { story: "A table example where you can click on a row." },
  },
};
