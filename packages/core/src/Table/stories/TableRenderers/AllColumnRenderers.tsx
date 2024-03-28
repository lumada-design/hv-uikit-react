import { Fragment, useMemo, useState } from "react";
import {
  HvCellProps,
  hvDateColumn,
  hvDropdownColumn,
  hvExpandColumn,
  hvNumberColumn,
  HvPagination,
  hvProgressColumn,
  HvRowInstance,
  hvSwitchColumn,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  hvTagColumn,
  hvTextColumn,
  HvTypography,
  theme,
  useHvData,
  useHvPagination,
  useHvRowExpand,
} from "@hitachivantara/uikit-react-core";

import { EmptyRow, makeRenderersData, NewRendererEntry } from "../storiesUtils";

export const AllColumnRenderers = () => {
  const getColumns = () => [
    hvSwitchColumn<NewRendererEntry, string>(
      {
        Header: "isDisabled",
        accessor: "isDisabled",
        style: { minWidth: 130 },
        id: "disabled-header",
      },
      "default",
      "yes",
      "no",
      {
        disabled: true,
      },
    ),
    hvExpandColumn<NewRendererEntry, string>(
      {
        Header: "Title",
        accessor: "name",
        style: { maxWidth: 100 },
        id: "title-header",
      },
      "expand",
      "collapse",
      () => true,
    ),
    hvDateColumn<NewRendererEntry, string>(
      {
        Header: "Time",
        accessor: "createdDate",
        style: { minWidth: 50 },
        id: "time-header",
      },
      "YYYY/MM/DD HH:mm",
    ),
    hvNumberColumn<NewRendererEntry, string>({
      Header: "Quantity",
      accessor: "eventQuantity",
      style: { minWidth: 20 },
      id: "quantity-header",
    }),
    hvTextColumn<NewRendererEntry, string>({
      Header: "Event Type",
      accessor: "eventType",
      style: { maxWidth: 160 },
      id: "event-type-header",
    }),
    hvTagColumn<NewRendererEntry, string, NewRendererEntry["status"]>(
      {
        Header: "Status",
        accessor: "status",
        style: { width: 20 },
        id: "status-header",
      },
      "status_name",
      "status_color",
      "status_text_color",
      undefined,
      undefined,
    ),
    hvProgressColumn<NewRendererEntry, string>(
      {
        Header: "Probability",
        accessor: "riskScore",
        style: { width: 125 },
        disableSortBy: true,
        id: "probability-header",
      },
      (row) => row.original.riskScore,
      () => 100,
      "secondary",
    ),
    hvDropdownColumn<NewRendererEntry, string>(
      { Header: "Severity", accessor: "severity", id: "severity-header" },
      undefined,
      "Select severity...",
      "Select severity...",
      () => console.log("select me"),
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
    useHvPagination,
  );

  const rowRenderer = (pages: HvRowInstance<NewRendererEntry, string>[]) => {
    return pages.map((row, index) => {
      prepareRow(row);

      return (
        <Fragment key={row.id}>
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
              colSpan={100}
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
        >
          <HvTableHead>
            <HvTableRow>
              {headers.map((col) => (
                <HvTableHeader
                  {...col.getHeaderProps()}
                  key={col.Header}
                  id={col.id}
                >
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page.length === 0 ? <EmptyRow height={100} /> : rowRenderer(page)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps?.()} />
    </>
  );
};
