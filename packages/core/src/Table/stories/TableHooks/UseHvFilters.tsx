import { useMemo } from "react";
import {
  HvEmptyState,
  HvGrid,
  HvInput,
  HvPagination,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvData,
  useHvFilters,
  useHvGlobalFilter,
  useHvPagination,
} from "@hitachivantara/uikit-react-core";
import { Ban } from "@hitachivantara/uikit-react-icons";

import { AssetEvent, getColumns, makeData } from "../storiesUtils";

const NoDataRow = ({
  message,
  height = 96,
}: {
  message: React.ReactNode;
  height?: number;
}) => (
  <HvTableRow>
    <HvTableCell colSpan={100} style={{ height }}>
      <HvEmptyState message={message} icon={<Ban />} />
    </HvTableCell>
  </HvTableRow>
);

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

export const UseHvFilters = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(32), []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    setFilter,
    setGlobalFilter,
    page,
    state: { pageSize },
    getHvPaginationProps,
  } = useHvData<AssetEvent, string>(
    { columns, data },
    useHvFilters,
    useHvGlobalFilter,
    useHvPagination,
  );

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
    <HvGrid container>
      <HvGrid item sm={6} md={4}>
        <HvInput
          type="search"
          placeholder="Search any column"
          onChange={(evt, val) => setGlobalFilter?.(val)}
        />
      </HvGrid>
      <HvGrid item sm={6} md={4}>
        <HvInput
          type="search"
          placeholder="Search by severity"
          onChange={(evt, val) => setFilter?.("severity", val)}
        />
      </HvGrid>
      <HvGrid item xs={12}>
        <HvTableContainer tabIndex={0}>
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
              {page.length > 0 ? (
                [...Array(pageSize ?? 0).keys()].map(renderTableRow)
              ) : (
                <NoDataRow message="No data" />
              )}
            </HvTableBody>
          </HvTable>
        </HvTableContainer>
        {page?.length ? (
          <HvPagination {...getHvPaginationProps?.()} />
        ) : undefined}
      </HvGrid>
    </HvGrid>
  );
};
