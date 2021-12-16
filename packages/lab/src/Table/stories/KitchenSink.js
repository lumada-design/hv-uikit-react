import React, { useState, useMemo } from "react";

import { Ban, Duplicate, Delete, Lock, Preview } from "@hv/uikit-react-icons";
import { HvEmptyState, HvBulkActions, HvPagination } from "@hv/uikit-react-core";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableRow,
  HvTableHeader,
  useHvTable,
  useHvPagination,
  useHvSortBy,
  useHvRowSelection,
  useHvBulkActions,
} from "../..";

import { makeData, getColumns } from "./utils";

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 100 }}>
      <HvEmptyState message="No data to display" icon={<Ban role="presentation" />} />
    </HvTableCell>
  </HvTableRow>
);

const KitchenSink = () => {
  const columns = useMemo(() => getColumns(), []);
  const [data, setData] = useState(makeData(64));

  const instance = useHvTable(
    { columns, data, autoResetSelectedRows: false },
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    selectedFlatRows,
    getHvBulkActionsProps,
    getHvPaginationProps,
  } = instance;

  const handleAction = (evt, id, action) => {
    const selected = selectedFlatRows.map((el) => el.original);

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
          key={row.Header}
          {...row.getRowProps({
            "aria-rowindex": index,
          })}
        >
          {row.cells.map((cell) => (
            <HvTableCell key={cell.Header} {...cell.getCellProps()}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      );
    });
  };
  return (
    <>
      <HvBulkActions
        {...getHvBulkActionsProps()}
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
                <HvTableHeader key={col.Header} {...col.getHeaderProps()}>
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

      <HvPagination {...getHvPaginationProps()} />
    </>
  );
};

export default KitchenSink;
