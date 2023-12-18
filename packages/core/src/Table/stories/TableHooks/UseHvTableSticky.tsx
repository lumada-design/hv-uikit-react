import { useMemo } from "react";
import {
  HvTable,
  HvTableBody,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  useHvData,
  useHvTableSticky,
  HvTableColumnConfig,
} from "@hitachivantara/uikit-react-core";

import { makeData, AssetEvent } from "../storiesUtils";

export const UseHvTableSticky = () => {
  const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(
    () => [
      { Header: "Title", accessor: "name", sticky: "left", width: 120 },
      {
        Header: "Time",
        accessor: "createdDate",
        sticky: "right",
        width: 120,
      },
      { Header: "Event Type", accessor: "eventType" },
      { Header: "Status", accessor: "status", width: 70 },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => <>{value}%</>,
        width: 80,
      },
      {
        Header: "Severity",
        accessor: "severity",
        sticky: "left",
        width: 100,
      },
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
  } = useHvData<AssetEvent, string>(
    {
      columns,
      data,
      stickyHeader: true,
    },
    useHvTableSticky
  );

  return (
    <HvTableContainer style={{ maxHeight: 480 }}>
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
        <HvTableBody tabIndex={0} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>
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
