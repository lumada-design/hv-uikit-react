import { useMemo } from "react";
import { StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
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

import { AlternativeLayout } from "./AlternativeLayout";
import AlternativeLayoutRaw from "./AlternativeLayout?raw";
import { ColumnResize } from "./ColumnResize";
import ColumnResizeRaw from "./ColumnResize?raw";
import { UseHvBulkActions } from "./UseHvBulkActions";
import UseHvBulkActionsRaw from "./UseHvBulkActions?raw";
import { UseHvFilters } from "./UseHvFilters";
import UseHvFiltersRaw from "./UseHvFilters?raw";
import { UseHvGroupBy } from "./UseHvGroupBy";
import UseHvGroupByRaw from "./UseHvGroupBy?raw";
import { UseHvHeaderGroups } from "./UseHvHeaderGroups";
import UseHvHeaderGroupsRaw from "./UseHvHeaderGroups?raw";
import { UseHvHooks } from "./UseHvHooks";
import UseHvHooksRaw from "./UseHvHooks?raw";
import { UseHvPagination } from "./UseHvPagination";
import UseHvPaginationRaw from "./UseHvPagination?raw";
import { UseHvRowExpand } from "./UseHvRowExpand";
import UseHvRowExpandRaw from "./UseHvRowExpand?raw";
import { UseHvSelection } from "./UseHvRowSelection";
import UseHvSelectionRaw from "./UseHvRowSelection?raw";
import { UseHvSelectionControlled } from "./UseHvRowSelectionControlled";
import UseHvSelectionControlledRaw from "./UseHvRowSelectionControlled?raw";
import { LockedSelection } from "./UseHvRowSelectionLocked";
import LockedSelectionRaw from "./UseHvRowSelectionLocked?raw";
import { UseHvRowState } from "./UseHvRowState";
import UseHvRowStateRaw from "./UseHvRowState?raw";
import { UseHvSortBy } from "./UseHvSortBy";
import UseHvSortByRaw from "./UseHvSortBy?raw";
import { UseHvTableSticky } from "./UseHvTableSticky";
import UseHvTableStickyRaw from "./UseHvTableSticky?raw";

export default {
  title: "Visualizations/Table/Table Hooks",
};

export const UseHvHooksStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvHooksRaw } } },
  render: () => <UseHvHooks />,
};

export const AlternativeLayoutStory: StoryObj = {
  parameters: {
    docs: { source: { code: AlternativeLayoutRaw } },
  },
  render: () => <AlternativeLayout />,
};

export const ColumnResizeStory: StoryObj = {
  parameters: {
    docs: { source: { code: ColumnResizeRaw } },
  },
  render: () => <ColumnResize />,
};

export const UseHvPaginationStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvPaginationRaw } } },
  render: () => <UseHvPagination />,
};

export const UseHvSelectionStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvSelectionRaw } } },
  render: () => <UseHvSelection />,
};

export const UseHvSelectionControlledStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvSelectionControlledRaw } } },
  render: () => <UseHvSelectionControlled />,
};

export const LockedSelectionStory: StoryObj = {
  parameters: {
    docs: { source: { code: LockedSelectionRaw } },
  },
  render: () => <LockedSelection />,
};

export const UseHvFiltersStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvFiltersRaw } } },
  render: () => <UseHvFilters />,
};

export const UseHvBulkActionsStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvBulkActionsRaw } } },
  render: () => <UseHvBulkActions />,
};

export const UseHvSortByStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvSortByRaw } } },
  render: () => <UseHvSortBy />,
};

export const UseHvRowExpandStory: StoryObj = {
  parameters: {
    docs: { source: { code: UseHvRowExpandRaw } },
  },
  // For a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button", { name: /expand/i })[0];
    await userEvent.click(button);
    await expect(
      canvas.getByText("Expanded content for: Event 1"),
    ).toBeInTheDocument();
  },
  render: () => <UseHvRowExpand />,
};

export const UseHvGroupByStory: StoryObj = {
  parameters: {
    docs: { source: { code: UseHvGroupByRaw } },
  },
  // For a11y
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button", { name: /collapse/i })[0];
    await userEvent.click(button);
    await expect(canvas.getByText("Event 2")).toBeInTheDocument();
  },
  render: () => <UseHvGroupBy />,
};

export const UseHvTableStickyStory: StoryObj = {
  parameters: {
    docs: { source: { code: UseHvTableStickyRaw } },
  },
  render: () => <UseHvTableSticky />,
};

export const UseHvHeaderGroupsStory: StoryObj = {
  parameters: {
    docs: { source: { code: UseHvHeaderGroupsRaw } },
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
  render: () => <UseHvHeaderGroups />,
};

export const UseHvRowStateStory: StoryObj = {
  parameters: { docs: { source: { code: UseHvRowStateRaw } } },
  render: () => <UseHvRowState />,
};

/** This was created to test grouped headers with sticky columns */
export const TestHeaders: StoryObj = {
  parameters: {
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
  render: () => {
    const data = useMemo(
      () => [
        { name: "Paul", email: "a@a.com", v1: "123", v2: "123", test: "123" },
        { name: "Chris", email: "a@a.com", v1: "123", v2: "123", test: "123" },
        { name: "Marta", email: "a@a.com", v1: "123", v2: "123", test: "123" },
        { name: "Sarah", email: "a@a.com", v1: "123", v2: "123", test: "123" },
      ],
      [],
    );

    type Data = (typeof data)[number];

    const columns = useMemo<HvTableColumnConfig<Data>[]>(
      () => [
        { accessor: "name", Header: "Name", sticky: "left" },
        { accessor: "email", Header: "Email", sticky: "left" },
        {
          Header: "Group",
          columns: [
            { accessor: "v1", Header: "Var 1" },
            { accessor: "v2", Header: "Var 2" },
          ],
        },
        { accessor: "test", Header: "Test", sticky: "right" },
      ],
      [],
    );

    const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
      useHvTable<Data>(
        {
          columns,
          data,
        },
        useHvHeaderGroups,
        useHvTableSticky,
      );

    return (
      <HvTableSection>
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
              {rows.map((row) => {
                prepareRow(row);
                const { key, ...rowProps } = row.getRowProps();

                return (
                  <HvTableRow key={key} {...rowProps}>
                    {row.cells.map((cell) => (
                      <HvTableCell
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
  },
};
