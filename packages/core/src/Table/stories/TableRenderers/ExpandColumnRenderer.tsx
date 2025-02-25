import { Fragment, useMemo, useState } from "react";
import {
  hvExpandColumn,
  HvPagination,
  HvRowInstance,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  hvTextColumn,
  HvTypography,
  theme,
  useHvData,
  useHvPagination,
  useHvRowExpand,
} from "@hitachivantara/uikit-react-core";

import { EmptyRow, makeRenderersData, NewRendererEntry } from "./utils";

export const ExpandColumnRenderer = () => {
  const columns = useMemo(
    () => [
      hvTextColumn<NewRendererEntry, string>({
        Header: "Event Type",
        accessor: "eventType",
        style: { maxWidth: 160 },
      }),
      hvExpandColumn<NewRendererEntry, string>(
        { Header: "Title", accessor: "name", style: { maxWidth: 100 } },
        "expand",
        "collapse",
        (row) => row.original.eventType !== undefined,
      ),
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
      disableCreateExpandButton: true,
    },
    useHvRowExpand,
    useHvPagination,
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, i) => {
      prepareRow(row);
      const { key, ...rowProps } = row.getRowProps({ "aria-rowindex": i + 1 });

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
          <HvTableRow style={{ display: row.isExpanded ? undefined : "none" }}>
            <HvTableCell
              colSpan={100}
              style={{
                paddingBottom: 0,
                paddingTop: 0,
                textAlign: "center",
                height: 100,
                backgroundColor: theme.colors.bgPage,
                borderTop: `solid 1px ${theme.colors.border}`,
              }}
            >
              <HvTypography>
                Expanded content for: {row.values.name}
              </HvTypography>
            </HvTableCell>
          </HvTableRow>
        </Fragment>
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
            {page.length === 0 ? <EmptyRow height={50} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};
