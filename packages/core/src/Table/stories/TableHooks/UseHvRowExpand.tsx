import { Fragment, useMemo } from "react";
import {
  HvTable,
  HvTableBody,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  HvTypography,
  useHvData,
  useHvRowExpand,
  theme,
} from "@hitachivantara/uikit-react-core";

import { makeData, getColumns, AssetEvent } from "../storiesUtils";

export const UseHvRowExpand = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(6), []);
  const i18n = useMemo(
    () => ({
      expandRowButtonAriaLabel: "Click to expand this row",
      collapseRowButtonAriaLabel: "Click to collapse this row",
    }),
    []
  );

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>(
      { columns, data, labels: i18n },
      useHvRowExpand
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
              <Fragment key={row.id}>
                <HvTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
                <HvTableRow
                  style={{
                    display: row.isExpanded ? undefined : "none",
                    background: theme.table.rowExpandBackgroundColor,
                  }}
                >
                  <HvTableCell
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      textAlign: "center",
                      height: 100,
                    }}
                    colSpan={100}
                  >
                    <HvTypography>
                      Expanded content for: {row.values.name}
                    </HvTypography>
                  </HvTableCell>
                </HvTableRow>
              </Fragment>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};
