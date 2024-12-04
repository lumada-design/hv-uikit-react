import { useMemo } from "react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import {
  HvPagination,
  HvPaginationProps,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
} from "@hitachivantara/uikit-react-core";

export function Demo() {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(32), []);

  return <MyTable data={data} columns={columns} />;
}

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height: 33 }} />
  </HvTableRow>
);

export function MyTable<T extends Record<string, any>>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnDef<T, any>[];
}) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const renderTableRow = (i: number) => {
    const row = table.getRowModel().rows[i];

    if (!row) return <EmptyRow key={i} />;

    return (
      <HvTableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <HvTableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  };

  return (
    <>
      <HvTableContainer tabIndex={0}>
        <HvTable>
          <HvTableHead>
            {...table.getHeaderGroups().map((headerGroup) => (
              <HvTableRow key={headerGroup.id}>
                {headerGroup.headers.map((col) => (
                  <HvTableHeader
                    key={col.id}
                    colSpan={col.colSpan}
                    onClick={col.column.getToggleSortingHandler()}
                  >
                    {flexRender(col.column.columnDef.header, col.getContext())}
                  </HvTableHeader>
                ))}
              </HvTableRow>
            ))}
          </HvTableHead>
          <HvTableBody>
            {[...Array(table.getState().pagination.pageSize).keys()].map(
              renderTableRow,
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      <HvPagination {...getHvPaginationProps(table)} />
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

const columnHelper = createColumnHelper<AssetEvent>();

const getColumns = (): ColumnDef<AssetEvent, any>[] => [
  { header: "Title", accessorKey: "name", minSize: 120 },
  { header: "Time", accessorKey: "createdDate", minSize: 100 },
  { header: "Event Type", accessorKey: "eventType", minSize: 100 },
  { header: "Status", accessorKey: "status", minSize: 100 },
  columnHelper.accessor("riskScore", {
    header: "Probability",
    cell: ({ getValue }) => `${getValue()}%`,
  }),

  { header: "Severity", accessorKey: "severity" },
  { header: "Priority", accessorKey: "priority" },
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

function getHvPaginationProps(table: Table<any>): HvPaginationProps {
  const { pageIndex, pageSize } = table.getState().pagination;
  return {
    canPrevious: table.getCanPreviousPage(),
    canNext: table.getCanNextPage(),
    pageSize: pageSize,
    page: pageIndex,
    pages: table.getPageCount(),
    onPageChange: (newPage) => table.setPageIndex(newPage),
    onPageSizeChange: (newPageSize) => table.setPageSize(newPageSize),
  };
}
