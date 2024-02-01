import React, { useMemo, useState } from "react";
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
  HvTypography,
  hvExpandColumn,
  hvTextColumn,
  theme,
  useHvData,
  useHvPagination,
  useHvRowExpand,
} from "@hitachivantara/uikit-react-core";

import { EmptyRow, NewRendererEntry, makeRenderersData } from "../storiesUtils";

export const ExpandColumnRenderer = () => {
  const getColumns = () => [
    hvTextColumn<NewRendererEntry, string>({
      Header: "Event Type",
      accessor: "eventType",
      style: { maxWidth: 160 },
    }),
    hvExpandColumn<NewRendererEntry, string>(
      { Header: "Title", accessor: "name", style: { maxWidth: 100 } },
      "expand",
      "collapse",
      (row) => row.original.eventType !== undefined
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
      disableCreateExpandButton: true,
    },
    useHvRowExpand,
    useHvPagination
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <React.Fragment key={row.id}>
          <HvTableRow
            {...row.getRowProps({
              "aria-rowindex": index + 1,
            })}
          >
            {row.cells.map((cell) => (
              <HvTableCell {...cell.getCellProps()}>
                {cell.render("Cell")}
              </HvTableCell>
            ))}
          </HvTableRow>
          <HvTableRow style={{ display: row.isExpanded ? undefined : "none" }}>
            <HvTableCell
              style={{
                paddingBottom: 0,
                paddingTop: 0,
                textAlign: "center",
                height: 100,
                backgroundColor: theme.colors.atmo2,
                borderTop: `solid 1px ${theme.colors.atmo4}`,
              }}
              // @ts-ignore
              colSpan="100%"
            >
              <HvTypography>
                Expanded content for: {row.values.name}
              </HvTypography>
            </HvTableCell>
          </HvTableRow>
        </React.Fragment>
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
            width: 300,
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
            {page.length === 0 ? <EmptyRow /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};
