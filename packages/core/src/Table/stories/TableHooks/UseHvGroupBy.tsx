import { useMemo } from "react";
import { useGroupBy } from "react-table";
import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  theme,
  useHvData,
  useHvRowExpand,
} from "@hitachivantara/uikit-react-core";

import { AssetEvent, getGroupedRowsColumns, makeData } from "../storiesUtils";

export const UseHvGroupBy = () => {
  const columns = useMemo(() => getGroupedRowsColumns(), []);
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>(
      {
        columns,
        data,
        initialState: {
          groupBy: ["status"],
          expanded: {
            "status:Closed": true,
            "status:Open": true,
          },
        },
      },
      useGroupBy,
      useHvRowExpand,
    );

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
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
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow
                {...row.getRowProps()}
                style={{
                  backgroundColor:
                    row.subRows.length > 0
                      ? theme.colors.atmo1
                      : theme.table.rowExpandBackgroundColor,
                }}
              >
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>
                    {cell.isGrouped ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        {cell.render("Cell")} ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                      cell.render("Aggregated")
                    ) : cell.isPlaceholder ? null : (
                      // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
                      cell.render("Cell")
                    )}
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
