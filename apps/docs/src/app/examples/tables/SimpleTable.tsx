import { useMemo, useState } from "react";
import {
  HvIconButton,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableSection,
  useHvTable,
} from "@hitachivantara/uikit-react-core";
import { Delete } from "@hitachivantara/uikit-react-icons";

import { makeData, type AssetEvent } from "./makeData";

export default function Demo() {
  const [data] = useState(() => makeData(8));
  const columns = useMemo<HvTableColumnConfig<AssetEvent>[]>(
    () => [
      { Header: "Title", accessor: "name", style: { minWidth: 120 } },
      { Header: "Time", accessor: "createdDate", style: { minWidth: 100 } },
      { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
      { Header: "Status", accessor: "status", style: { minWidth: 100 } },
      {
        Header: "Probability",
        accessor: "riskScore",
        align: "right",
        Cell: ({ value }) => `${value}%`,
      },
      { Header: "Severity", accessor: "severity" },
      { Header: "Priority", accessor: "priority" },
      {
        id: "delete",
        variant: "actions",
        Cell: () => (
          <HvIconButton title="Delete">
            <Delete />
          </HvIconButton>
        ),
      },
    ],
    [],
  );

  return <MyTable data={data} columns={columns} />;
}

/** A simple generic client-side table. */
export const MyTable = <T extends object>(props: {
  columns: HvTableColumnConfig<T>[];
  data: T[] | undefined;
}) => {
  const { columns, data } = props;

  const table = useHvTable<T>({ columns, data });

  return (
    <HvTableSection>
      <HvTableContainer className="max-h-500px">
        <HvTable {...table.getTableProps()}>
          <HvTableHead {...table.getTableHeadProps?.()}>
            {table.headerGroups.map((headerGroup) => (
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
          <HvTableBody {...table.getTableBodyProps()}>
            {table.rows.map((row) => {
              table.prepareRow(row);
              return (
                <HvTableRow {...row.getRowProps()} key={row.getRowProps().key}>
                  {row.cells.map((cell) => (
                    <HvTableCell
                      className="text-nowrap"
                      {...cell.getCellProps()}
                      key={cell.getCellProps().key}
                    >
                      {cell.render("Cell")}
                    </HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    </HvTableSection>
  );
};
