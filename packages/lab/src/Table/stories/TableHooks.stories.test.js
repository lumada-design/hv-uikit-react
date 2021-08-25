import React, { useMemo } from "react";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvTable,
  useHvSortBy,
} from "../..";

import { makeData, getLongNameColumns } from "./utils";

export default {
  title: "Tests/TableHooks",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

export const SortFixedLayout = () => {
  const sortSeverity = useMemo(() => {
    const levels = ["minor", "average", "major", "critical"];

    return (rowA, rowB, columnId) => {
      const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
      const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

      // eslint-disable-next-line no-nested-ternary
      return a === b ? 0 : a > b ? 1 : -1;
    };
  }, []);

  const columns = useMemo(() => {
    const cols = getLongNameColumns();
    cols[5].sortType = sortSeverity;
    return cols;
  }, [sortSeverity]);

  const data = useMemo(() => makeData(5), []);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useHvTable(
    { columns, data },
    useHvSortBy
  );

  return (
    <HvTableContainer>
      <HvTable style={{ tableLayout: "fixed" }} {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
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
  );
};

SortFixedLayout.parameters = {
  docs: {
    description: {
      story:
        "A table with sorting and pagination handled server-side, using React Table. Set `manualPagination` and `manualSortBy` to have manual control over pagination and sorting.",
    },
  },
};

export const SortFixedLayoutSmall = () => {
  const sortSeverity = useMemo(() => {
    const levels = ["minor", "average", "major", "critical"];

    return (rowA, rowB, columnId) => {
      const a = levels.indexOf(rowA.values[columnId]?.toLowerCase());
      const b = levels.indexOf(rowB.values[columnId]?.toLowerCase());

      // eslint-disable-next-line no-nested-ternary
      return a === b ? 0 : a > b ? 1 : -1;
    };
  }, []);

  const columns = useMemo(() => {
    const cols = getLongNameColumns();
    cols[5].sortType = sortSeverity;
    return cols;
  }, [sortSeverity]);

  const data = useMemo(() => makeData(5), []);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useHvTable(
    { columns, data },
    useHvSortBy
  );

  return (
    <HvTableContainer style={{ width: "728px" }}>
      <HvTable style={{ tableLayout: "fixed" }} {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
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
  );
};

SortFixedLayoutSmall.parameters = {
  docs: {
    description: {
      story:
        "A table with sorting and pagination handled server-side, using React Table. Set `manualPagination` and `manualSortBy` to have manual control over pagination and sorting.",
    },
  },
};
