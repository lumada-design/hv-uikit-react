import { useMemo } from "react";
import {
  HvPagination,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvPagination,
  useHvTable,
} from "@hitachivantara/uikit-react-core";

export function Demo() {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(32), []);

  return <MyTable data={data} columns={columns} />;
}

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

export function MyTable<T extends Record<string, any>>({
  data,
  columns,
}: {
  data: T[];
  columns: HvTableColumnConfig<T, any>[];
}) {
  const {
    getTableProps,
    getTableHeadProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    state: { pageSize },
    getHvPaginationProps,
  } = useHvTable<T, string>({ columns, data }, useHvPagination);

  const renderTableRow = (i: number) => {
    const row = page[i];

    if (!row) return <EmptyRow key={i} />;

    prepareRow(row);

    return (
      <HvTableRow {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <HvTableCell {...cell.getCellProps()} key={cell.getCellProps().key}>
            {cell.render("Cell")}
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  };

  return (
    <>
      <HvTableContainer tabIndex={0}>
        <HvTable {...getTableProps()}>
          <HvTableHead {...getTableHeadProps?.()}>
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
            {pageSize && [...Array(pageSize).keys()].map(renderTableRow)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length > 0 && <HvPagination {...getHvPaginationProps?.()} />}
    </>
  );
}

interface AssetEvent {
  id: string;
  name: string;
  createdDate: string;
  eventType: string;
  riskScore: number;
  status: string | null;
  severity: string;
  priority: string;
  link?: string;
  selected?: boolean;
}

const getColumns = (): HvTableColumnConfig<AssetEvent>[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 120 } },
  { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
  { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { minWidth: 100 } },
  {
    Header: "Probability",
    accessor: "riskScore",
    align: "right", // numeric values should be right-aligned
    Cell: ({ value }) => `${value}%`,
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
];

const getOption = (opts: string[], i: number) => opts[i % opts.length];

const makeEvent = (i: number): AssetEvent => ({
  id: `${i + 1}`,
  name: `Event ${i + 1}`,
  createdDate: new Date("2020-03-20").toISOString().slice(0, 10),
  eventType: "Anomaly detection",
  status: getOption(["Closed", "Open"], i),
  riskScore: (i % 100) + 1,
  severity: getOption(["Critical", "Major", "Average", "Minor"], i),
  priority: getOption(["High", "Medium", "Low"], i),
});

const makeData = (len = 10) => [...Array(len).keys()].map(makeEvent);
