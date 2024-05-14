import { useMemo } from "react";
import { StoryObj } from "@storybook/react";
import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableSection,
  useHvHeaderGroups,
  useHvTable,
  useHvTableSticky,
} from "@hitachivantara/uikit-react-core";

export default {
  title: "Tests/Table",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
    a11y: {
      config: {
        rules: [
          // the th cells without data are hidden to the a11y tree,
          // but axe-core doesn't correctly understand that
          { id: "th-has-data-cells", enabled: false },
        ],
      },
    },
  },
};

const data = [
  { name: "Paul", email: "a@a.com", var1: "123", var2: "123", test: "123" },
  { name: "Chris", email: "a@a.com", var1: "123", var2: "123", test: "123" },
  { name: "Marta", email: "a@a.com", var1: "123", var2: "123", test: "123" },
  { name: "Sarah", email: "a@a.com", var1: "123", var2: "123", test: "123" },
];

/** This was created to test grouped headers with sticky columns */
export const Main: StoryObj = {
  render: () => {
    const columns = useMemo<HvTableColumnConfig<any, string>[]>(
      () => [
        {
          accessor: "name",
          Header: "Name",
          sticky: "left",
        },
        {
          accessor: "email",
          Header: "Email",
          sticky: "left",
        },
        {
          accessor: "group",
          Header: "Group",
          columns: [
            {
              accessor: "var1",
              Header: "Var 1",
            },
            {
              accessor: "var2",
              Header: "Var 2",
            },
          ],
        },
        {
          accessor: "test",
          Header: "Test",
          sticky: "right",
        },
      ],
      [],
    );

    const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
      useHvTable<any, string>(
        {
          columns,
          data,
        },
        useHvHeaderGroups,
        useHvTableSticky,
      );

    const renderTableRow = (row) => {
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
              {rows.map(renderTableRow)}
            </HvTableBody>
          </HvTable>
        </HvTableContainer>
      </HvTableSection>
    );
  },
};
