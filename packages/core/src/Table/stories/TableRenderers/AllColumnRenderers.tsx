import { Fragment, useState } from "react";
import {
  hvDateColumn,
  hvDropdownColumn,
  HvEmptyState,
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
  HvTableSection,
  hvTagColumn,
  hvTextColumn,
  HvTypography,
  theme,
  useHvPagination,
  useHvRowExpand,
  useHvTable,
} from "@hitachivantara/uikit-react-core";
import { Ban } from "@hitachivantara/uikit-react-icons";

import { makeRenderersData, NewRendererEntry } from "./utils";

const columns = [
  hvSwitchColumn<NewRendererEntry>(
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
  hvExpandColumn<NewRendererEntry>(
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
  hvDateColumn<NewRendererEntry>(
    {
      Header: "Time",
      accessor: "createdDate",
      style: { minWidth: 50 },
      id: "time-header",
    },
    "YYYY/MM/DD HH:mm",
  ),
  hvNumberColumn<NewRendererEntry>({
    Header: "Quantity",
    accessor: "eventQuantity",
    style: { minWidth: 20 },
    id: "quantity-header",
  }),
  hvTextColumn<NewRendererEntry>({
    Header: "Event Type",
    accessor: "eventType",
    style: { maxWidth: 160 },
    id: "event-type-header",
  }),
  hvTagColumn<NewRendererEntry>(
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
  hvProgressColumn<NewRendererEntry>(
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
  hvDropdownColumn<NewRendererEntry>(
    { Header: "Severity", accessor: "severity", id: "severity-header" },
    undefined,
    "Select severity...",
    "Select severity...",
    () => console.log("select me"),
  ),
];

export const AllColumnRenderers = () => {
  const [data] = useState(() => makeRenderersData(64));

  const table = useHvTable<NewRendererEntry>(
    { columns, data, disableCreateExpandButton: true },
    useHvRowExpand,
    useHvPagination,
  );

  const renderRow = (row: HvRowInstance<NewRendererEntry>, i: number) => {
    table.prepareRow(row);
    const { key, ...rowProps } = row.getRowProps({ "aria-rowindex": i + 1 });

    return (
      <Fragment key={key}>
        <HvTableRow {...rowProps}>
          {row.cells.map((cell) => (
            <HvTableCell {...cell.getCellProps()} key={cell.getCellProps().key}>
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
            <HvTypography>Expanded content for: {row.values.name}</HvTypography>
          </HvTableCell>
        </HvTableRow>
      </Fragment>
    );
  };

  return (
    <HvTableSection>
      <HvTableContainer>
        <HvTable {...table.getTableProps({ "aria-rowcount": data.length })}>
          <HvTableHead {...table.getTableHeadProps?.()}>
            <HvTableRow>
              {table.headers.map((col) => (
                <HvTableHeader
                  {...col.getHeaderProps()}
                  key={col.id}
                  id={col.id}
                >
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody {...table.getTableBodyProps()}>
            {table.page.length > 0 ? (
              table.page.map(renderRow)
            ) : (
              <HvTableRow>
                <HvTableCell colSpan={100} style={{ height: 100 }}>
                  <HvEmptyState message="No data to display" icon={<Ban />} />
                </HvTableCell>
              </HvTableRow>
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...table.getHvPaginationProps?.()} />
    </HvTableSection>
  );
};
