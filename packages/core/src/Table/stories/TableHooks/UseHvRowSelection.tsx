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
  useHvRowSelection,
} from "@hitachivantara/uikit-react-core";

import { AssetEvent, getColumns, makeData } from "../storiesUtils";

export const UseHvSelection = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>({ columns, data }, useHvRowSelection);

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
