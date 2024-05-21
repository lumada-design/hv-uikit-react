import { useMemo, useState } from "react";
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

import { AssetEvent, getColumns, makeSelectedData } from "../storiesUtils";

export const UseHvSelectionControlled = () => {
  const columns = useMemo(() => getColumns(), []);
  const initialData = useMemo(() => makeSelectedData(6), []);
  const [data, setData] = useState(initialData);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>(
      { columns, data, manualRowSelectedKey: "selected" },
      useHvRowSelection,
    );

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          {headerGroups.map((headerGroup) => (
            <HvTableRow
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.getHeaderGroupProps().key}
            >
              {headerGroup.headers.map((col) => (
                <HvTableHeader
                  {...col.getHeaderProps()}
                  key={col.getHeaderProps().key}
                >
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          ))}
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();

            return (
              <HvTableRow
                key={key}
                onChange={(event) => {
                  const newData = [...data];
                  newData[index].selected = (
                    event.target as HTMLInputElement
                  ).checked;
                  setData(newData);
                }}
                {...rowProps}
              >
                {row.cells.map((cell) => (
                  <HvTableCell
                    {...cell.getCellProps()}
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
