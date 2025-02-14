import { useMemo, useState } from "react";
import {
  hvNumberColumn,
  HvPagination,
  HvRowInstance,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvData,
  useHvPagination,
} from "@hitachivantara/uikit-react-core";

import { EmptyRow, makeRenderersData, NewRendererEntry } from "./utils";

export const NumberColumnRenderer = () => {
  const columns = useMemo(
    () => [
      hvNumberColumn<NewRendererEntry, string>({
        Header: "Quantity",
        accessor: "eventQuantity",
        style: { maxWidth: 100 },
      }),
    ],
    [],
  );

  const [data] = useState(() => makeRenderersData(64));

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    page,
    getHvPaginationProps,
  } = useHvData<NewRendererEntry, string>(
    {
      columns,
      data,
    },
    useHvPagination,
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, i) => {
      prepareRow(row);
      const { key, ...rowProps } = row.getRowProps({ "aria-rowindex": i + 1 });

      return (
        <HvTableRow key={key} {...rowProps}>
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()} key={cell.getCellProps().key}>
              {cell.render("Cell")}
            </HvTableCell>
          ))}
        </HvTableRow>
      );
    });
  };

  return (
    <>
      <HvTableContainer>
        <HvTable
          {...getTableProps({
            "aria-rowcount": data.length,
          })}
          style={{
            width: 50,
          }}
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader {...col.getHeaderProps()} key={col.Header}>
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={50} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};
