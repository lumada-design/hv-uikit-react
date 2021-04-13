import React, { useState, useMemo } from "react";

import { Ban, Duplicate, Delete, Lock, Preview } from "@hv/uikit-react-icons";
import { HvCheckBox, HvEmptyState } from "@hv/uikit-react-core";
import { useTable, useRowSelect, usePagination, useSortBy } from "react-table";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTablePagination,
  HvTableRow,
  HvTableBulkActions,
  HvTableHeader,
} from "../..";

import { makeData, getColumns } from "./utils";

const KitchenSink = () => {
  const [data, setData] = useState(makeData(64));
  const columns = useMemo(
    () => [
      {
        id: "selection",
        padding: "checkbox",
        /* eslint-disable-next-line react/prop-types */
        Cell: ({ row }) => <HvCheckBox {...row.getToggleRowSelectedProps()} />,
      },
      ...getColumns().map((col) => ({ ...col, isSortable: true })),
    ],
    []
  );

  const EmptyRow = () => (
    <HvTableRow>
      <HvTableCell colSpan="100%" style={{ height: 100 }}>
        <HvEmptyState message="No data to display" icon={<Ban role="presentation" />} />
      </HvTableCell>
    </HvTableRow>
  );

  const instance = useTable(
    { columns, data, autoResetSelectedRows: false },
    useSortBy,
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
    // eslint-disable-next-line no-console
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

  const rowRenderer = (pages) => {
    return pages.map((row, index) => {
      prepareRow(row);
      return (
        <HvTableRow
          hover
          key={row.Header}
          selected={row.isSelected}
          {...row.getRowProps({
            "aria-rowindex": index,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell key={cell.Header} rtCol={cell.column} {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      );
    });
  };
  return (
    <>
      <HvTableBulkActions
        rtInstance={instance}
        maxVisibleActions={1}
        actionsCallback={handleAction}
        actions={[
          { id: "delete", label: "Delete", icon: <Delete /> },
          { id: "duplicate", label: "Duplicate", icon: <Duplicate /> },
          { id: "lock", label: "Lock", icon: <Lock /> },
          { id: "preview", label: "Preview", icon: <Preview /> },
        ]}
      />

      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
            caption: "Table Caption",
          })}
        >
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
            {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvTablePagination rtInstance={instance} />
    </>
  );
};

export default KitchenSink;
