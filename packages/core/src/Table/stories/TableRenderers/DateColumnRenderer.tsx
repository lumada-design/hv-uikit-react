import { useMemo, useState } from "react";
import {
  HvCellProps,
  HvPagination,
  HvRowInstance,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  hvDateColumn,
  useHvData,
  useHvPagination,
} from "@hitachivantara/uikit-react-core";

import { EmptyRow, NewRendererEntry, makeRenderersData } from "../storiesUtils";

export const DateColumnRenderer = () => {
  const getColumns = () => [
    hvDateColumn<NewRendererEntry, string>(
      { Header: "Time", accessor: "createdDate", style: { minWidth: 80 } },
      "DD/MM/YYYY"
    ),
  ];

  const columns = useMemo(() => {
    return getColumns();
  }, []);

  const initialData = useMemo(() => makeRenderersData(64), []);

  const [data] = useState(initialData);

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
      defaultColumn: {
        Cell: ({ value }: HvCellProps<NewRendererEntry, string>) =>
          value ?? "—",
      },
    },
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <HvTableRow {...row.getRowProps({ "aria-rowindex": index + 1 })}>
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()}>
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
            width: 100,
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
