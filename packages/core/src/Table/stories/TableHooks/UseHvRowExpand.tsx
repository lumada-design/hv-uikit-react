import { Fragment, useMemo } from "react";
import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTypography,
  theme,
  useHvData,
  useHvRowExpand,
} from "@hitachivantara/uikit-react-core";

import { AssetEvent, getColumns, makeData } from "../storiesUtils";

export const UseHvRowExpand = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(6), []);
  const i18n = useMemo(
    () => ({
      expandRowButtonAriaLabel: "Click to expand this row",
      collapseRowButtonAriaLabel: "Click to collapse this row",
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>(
      { columns, data, labels: i18n },
      useHvRowExpand,
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
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();

            return (
              <Fragment key={key}>
                <HvTableRow {...rowProps}>
                  {row.cells.map((cell) => (
                    <HvTableCell
                      {...cell.getCellProps()}
                      key={cell.getCellProps().key}
                    >
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
