import React, { useMemo } from "react";
import range from "lodash/range";
import {
  HvTableContainer,
  HvTable,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableBody,
  HvTableCell,
  HvPagination,
  useHvData,
  useHvSortBy,
  useHvPagination,
  useHvTableSticky,
} from "../..";

const Table = () => {
  const getData = () => [
    {
      id: 14,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection ",
      status: "Open",
    },
    {
      id: 13,
      name: "Event 2",
      createdDate: "10/14/2018",
      eventType: "Risk of failure profile",
      status: "Pending",
    },
    {
      id: 12,
      name: "Event 3",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed",
    },
    {
      id: 11,
      name: "Event 4",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
    },
    {
      id: 10,
      name: "Event 5",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Pending",
    },
    {
      id: 8,
      name: "Event 6",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed",
    },
    {
      id: 7,
      name: "Event 7",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
    },
    {
      id: 6,
      name: "Event 8",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Pending",
    },
    {
      id: 5,
      name: "Event 9",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
    },
    {
      id: 4,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed",
    },
    {
      id: 3,
      name: "Event 10",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
    },
  ];

  const getColumns = () => [
    {
      Header: "Title",
      accessor: "name",
      sticky: "left",
      width: 150,
    },
    {
      Header: "Time",
      accessor: "createdDate",
    },
    {
      Header: "Event Type",
      accessor: "eventType",
      style: { textTransform: "capitalize" },
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  const data = useMemo(() => getData(), []);
  const columns = useMemo(() => getColumns(), []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    state: { pageSize },
    getHvPaginationProps,
  } = useHvData(
    { columns, data, stickyHeader: true },
    useHvSortBy,
    useHvPagination,
    useHvTableSticky
  );

  const EmptyRow = () =>
    useMemo(() => {
      return (
        <HvTableRow>
          <HvTableCell colSpan={100} />
        </HvTableRow>
      );
    }, []);

  return (
    <div style={{ padding: "10px" }}>
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            {headerGroups.map((headerGroup) => (
              <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((col) => (
                  <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
                ))}
              </HvTableRow>
            ))}
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {range(pageSize).map((i) => {
              const row = page[i];

              if (!row) return <EmptyRow key={i} />;

              prepareRow(row);

              return (
                <HvTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? <HvPagination {...getHvPaginationProps()} /> : undefined}
    </div>
  );
};

export default Table;
