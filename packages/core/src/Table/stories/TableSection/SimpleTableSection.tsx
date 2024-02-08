import { useState, useMemo } from "react";
import range from "lodash/range";
import {
  HvTableContainer,
  HvTable,
  HvTableBody,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  HvTableSection,
  useHvPagination,
  useHvRowSelection,
  useHvBulkActions,
  useHvData,
  useHvSortBy,
} from "@hitachivantara/uikit-react-core";

import { AssetEvent, getColumns, makeData } from "../storiesUtils";

const EmptyRow = () => (
  <HvTableRow>
    <HvTableCell colSpan={100} />
  </HvTableRow>
);

export const SimpleTableSection = () => {
  const columns = useMemo(() => getColumns(), []);
  const [data] = useState(makeData(5));

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    state: { pageSize },
  } = useHvData<AssetEvent, string>(
    { columns, data, initialState: { pageSize: 5 } },
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const renderTableRow = (i: number) => {
    const row = page[i];

    if (!row) return <EmptyRow key={i} />;

    prepareRow(row);

    return (
      <HvTableRow {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <HvTableCell {...cell.getCellProps()}>
            {cell.render("Cell")}
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  };

  return (
    <HvTableSection>
      <HvTableContainer tabIndex={0}>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            {headerGroups.map((headerGroup) => (
              <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((col) => (
                  <HvTableHeader {...col.getHeaderProps()}>
                    {col.render("Header")}
                  </HvTableHeader>
                ))}
              </HvTableRow>
            ))}
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {pageSize && range(pageSize).map(renderTableRow)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    </HvTableSection>
  );
};
