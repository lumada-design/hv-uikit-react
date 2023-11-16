import { useMemo, useState } from "react";
import {
  HvTable,
  HvTableBody,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  useHvData,
  useHvRowSelection,
} from "@hitachivantara/uikit-react-core";

import { getColumns, makeSelectedData, AssetEvent } from "../storiesUtils";

export const UseHvSelectionControlled = () => {
  const columns = useMemo(() => getColumns(), []);
  const initialData = useMemo(() => makeSelectedData(6), []);
  const [data, setData] = useState(initialData);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>(
      { columns, data, manualRowSelectedKey: "selected" },
      useHvRowSelection
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
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <HvTableRow
                onChange={(event) => {
                  const newData = [...data];
                  newData[index].selected = (
                    event.target as HTMLInputElement
                  ).checked;
                  setData(newData);
                }}
                {...row.getRowProps()}
              >
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
