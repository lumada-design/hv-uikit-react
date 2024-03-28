import { useMemo } from "react";
import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvData,
  useHvSortBy,
} from "@hitachivantara/uikit-react-core";

import { AssetEvent, getColumns, makeData } from "../storiesUtils";

export const UseHvSortBy = () => {
  const colSort = useMemo(() => {
    const levels = ["minor", "average", "major", "critical"];

    return (rowA, rowB, columnId) => {
      const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
      const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

      return a === b ? 0 : a > b ? 1 : -1;
    };
  }, []);

  const columns = useMemo(() => {
    const cols = getColumns();
    cols[2].disableSortBy = true;
    cols[5].sortType = colSort;
    return cols;
  }, [colSort]);

  const data = useMemo(() => makeData(5), []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useHvData<AssetEvent, string>({ columns, data }, useHvSortBy);

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
