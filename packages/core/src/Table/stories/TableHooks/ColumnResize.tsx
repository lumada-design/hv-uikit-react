import { useMemo } from "react";
import { useBlockLayout } from "react-table";
import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvData,
  useHvResizeColumns,
} from "@hitachivantara/uikit-react-core";

import { AssetEvent, makeData } from "../storiesUtils";

export const ColumnResize = () => {
  const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(
    () => [
      { Header: "Title", accessor: "name", minWidth: 120 },
      { Header: "Time", accessor: "createdDate", minWidth: 100 },
      {
        Header: "Status",
        accessor: "status",
        width: 120,
        disableResizing: true,
      },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => <>{value}%</>,
      },
      { Header: "Priority", accessor: "priority" },
    ],
    [],
  );
  const data = useMemo(() => makeData(6), []);

  const defaultColumn = useMemo(
    () => ({
      minWidth: 150,
      width: 200,
      maxWidth: 400,
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useHvData<AssetEvent, string>(
      {
        columns,
        data,
        defaultColumn,
      },
      useBlockLayout,
      useHvResizeColumns,
    );

  return (
    <HvTableContainer tabIndex={0}>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          {headerGroups.map((headerGroup) => (
            <HvTableRow
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.getHeaderGroupProps().key}
            >
              {headerGroup.headers.map((col) => (
                <HvTableHeader
                  {...col.getHeaderProps({ align: col.align })}
                  key={col.getHeaderProps().key}
                >
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          ))}
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();

            return (
              <HvTableRow hover key={key} {...rowProps}>
                {row.cells.map((cell) => (
                  <HvTableCell
                    {...cell.getCellProps({ align: cell.column.align })}
                    key={cell.getCellProps().key}
                  >
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
